// Revenue Execution docs: menu behavior, the home demo (tabs and its working model), card videos, section links, step badges, and "On this page".
// First-party only; the pages read fine without it.
(function () {
  'use strict';

  var menu = document.querySelector('details.menu');
  if (menu) {
    menu.addEventListener('click', function (event) {
      if (event.target.closest('a')) menu.open = false;
    });
    document.addEventListener('click', function (event) {
      if (menu.open && !menu.contains(event.target)) menu.open = false;
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') menu.open = false;
    });
  }

  // Home cards: a Watch button opens the card's video in a dialog; closing it pauses the video.
  Array.prototype.forEach.call(document.querySelectorAll('dialog[data-card]'), function (dialog) {
    var link = document.querySelector('.views li a[href$="#' + dialog.getAttribute('data-card') + '"]');
    var video = dialog.querySelector('video');
    if (!link || !video || typeof dialog.showModal !== 'function') return;
    var button = document.createElement('button');
    var length = document.createElement('span');
    button.type = 'button';
    button.className = 'watch';
    button.textContent = 'Watch';
    button.setAttribute('aria-label', 'Watch: ' + dialog.getAttribute('aria-label'));
    length.textContent = dialog.getAttribute('data-length');
    button.appendChild(length);
    button.addEventListener('click', function () {
      dialog.showModal();
      var playing = video.play();
      if (playing && playing.catch) playing.catch(function () {});
    });
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });
    dialog.addEventListener('close', function () { video.pause(); });
    link.parentNode.appendChild(button);
  });

  // Home demo: the tabs switch between the five dashboards (arrow keys, Home and End move between tabs).
  var demo = document.querySelector('[data-demo]');
  if (demo) {
    var tabs = Array.prototype.slice.call(demo.querySelectorAll('[role="tab"]'));
    var select = function (tab, focus) {
      tabs.forEach(function (each) {
        var on = each === tab;
        each.setAttribute('aria-selected', on ? 'true' : 'false');
        each.tabIndex = on ? 0 : -1;
        document.getElementById(each.getAttribute('aria-controls')).hidden = !on;
      });
      if (focus) tab.focus();
    };
    tabs.forEach(function (tab, index) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (event) {
        var next = { ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: tabs.length - 1 }[event.key];
        if (next === undefined) return;
        event.preventDefault();
        select(tabs[(next + tabs.length) % tabs.length], true);
      });
    });

    // The working model: View and Period swap in figures computed ahead of time from fictional data.
    // As in the app, Leadership and Executive show what Team shows for this viewer; Pipeline Schedule
    // keeps its own Period, which narrows open deals by close date.
    var source = document.getElementById('demo-data');
    var model = null;
    try { model = source ? JSON.parse(source.textContent) : null; } catch (error) { model = null; }
    if (model) {
      var all = function (selector) { return Array.prototype.slice.call(demo.querySelectorAll(selector)); };
      var views = { MY: 'My results', TEAM: 'Team', LEADERSHIP: 'Leadership', EXECUTIVE: 'Executive' };
      var periods = { CQ: 'Current quarter', YTD: 'Year to date', L12M: 'Last 12 months' };
      var state = { view: 'TEAM', period: 'L12M', pipeline: 'ALL' };

      var fill = function (el, value) {
        el.classList.toggle('m-off', value === null);
        if (value === null) return;
        if (Array.isArray(value)) {
          value.forEach(function (key) {
            var row = el.querySelector(':scope > [data-key="' + key + '"]');
            if (row) el.appendChild(row);
          });
          return;
        }
        var o = typeof value === 'object' ? value : { t: value };
        if ('t' in o) el.textContent = o.t;
        if ('w' in o) el.style.width = o.w + '%';
        if ('h' in o) el.style.height = o.h + '%';
        if ('l' in o) el.style.left = o.l + '%';
        if ('title' in o) el.title = o.title;
        if ('tone' in o) el.setAttribute('data-tone', o.tone);
        Object.keys(o.vars || {}).forEach(function (name) { el.style.setProperty(name, o.vars[name]); });
      };

      var render = function () {
        all('[data-model]').forEach(function (panel) {
          var id = panel.getAttribute('data-model');
          var data = model[id];
          var values = data[state.view === 'MY' ? 'MY' : 'TEAM'][id === 'pipeline' ? state.pipeline : state.period];
          var index = {};
          data.keys.forEach(function (key, i) { index[key] = values[i]; });
          Array.prototype.forEach.call(panel.querySelectorAll('[data-k]'), function (el) {
            var key = el.getAttribute('data-k');
            if (key in index) fill(el, index[key]);
          });
          var context = panel.querySelector('[data-ctx]');
          if (context) {
            context.textContent = views[state.view] + ' · ' + (id === 'pipeline'
              ? 'Open deals' + (state.pipeline === 'ALL' ? '' : ' · ' + periods[state.pipeline])
              : periods[state.period]);
          }
        });
        all('[data-view]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-view') === state.view)); });
        all('[data-period]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-period') === state.period)); });
        all('[data-pipeline-period]').forEach(function (button) { button.setAttribute('aria-pressed', String(button.getAttribute('data-pipeline-period') === state.pipeline)); });
      };

      // A row's children show while it and every row above it are open.
      var showChildren = function (scope, key, show) {
        Array.prototype.forEach.call(scope.querySelectorAll('[data-parent="' + key + '"]'), function (child) {
          child.hidden = !show;
          var toggle = child.querySelector('[data-toggle]');
          if (toggle) showChildren(scope, child.getAttribute('data-key'), show && toggle.getAttribute('aria-expanded') === 'true');
        });
      };

      demo.addEventListener('click', function (event) {
        var target = event.target.closest('button');
        if (!target || !demo.contains(target)) return;
        var panel = target.closest('[data-model]');
        if (target.hasAttribute('data-view')) {
          state.view = target.getAttribute('data-view');
        } else if (target.hasAttribute('data-period')) {
          state.period = target.getAttribute('data-period');
        } else if (target.hasAttribute('data-pipeline-period')) {
          // Choosing the selected period again clears it, back to every open deal.
          var period = target.getAttribute('data-pipeline-period');
          state.pipeline = state.pipeline === period ? 'ALL' : period;
        } else if (target.hasAttribute('data-section')) {
          var section = target.getAttribute('data-section');
          Array.prototype.forEach.call(panel.querySelectorAll('[data-section]'), function (button) {
            button.setAttribute('aria-pressed', String(button === target));
          });
          Array.prototype.forEach.call(panel.querySelectorAll('[data-section-panel]'), function (block) {
            block.hidden = block.getAttribute('data-section-panel') !== section;
          });
          return;
        } else if (target.hasAttribute('data-toggle')) {
          var open = target.getAttribute('aria-expanded') !== 'true';
          target.setAttribute('aria-expanded', String(open));
          showChildren(panel, target.getAttribute('data-toggle'), open);
          return;
        } else if (target.hasAttribute('data-goto')) {
          select(document.getElementById(target.getAttribute('data-goto')), true);
          return;
        } else {
          return;
        }
        render();
      });
      render();
    }
  }

  var article = document.querySelector('.prose');
  if (!article) return;
  var headings = Array.prototype.slice.call(article.querySelectorAll('h2[id], h3[id]'));
  var labels = headings.map(function (heading) { return heading.textContent.trim(); });

  headings.forEach(function (heading, index) {
    var first = heading.firstChild;
    var step = heading.tagName === 'H2' && first && first.nodeType === 3 && first.nodeValue.match(/^(\d+)\.\s+/);
    if (step) {
      first.nodeValue = first.nodeValue.slice(step[0].length);
      var badge = document.createElement('span');
      badge.className = 'step-badge';
      badge.textContent = step[1];
      heading.insertBefore(badge, first);
    }
    var anchor = document.createElement('a');
    anchor.className = 'anchor';
    anchor.href = '#' + heading.id;
    anchor.textContent = '#';
    anchor.setAttribute('aria-label', 'Link to ' + labels[index]);
    heading.appendChild(anchor);
  });

  var toc = document.getElementById('toc');
  var sections = headings.filter(function (heading) { return heading.tagName === 'H2'; });
  if (!toc || sections.length < 2) {
    if (toc) toc.parentNode.hidden = true;
    return;
  }

  function link(heading, index) {
    var anchor = document.createElement('a');
    anchor.href = '#' + heading.id;
    anchor.textContent = labels[index];
    return anchor;
  }

  var list = document.createElement('ol');
  var entries = [];
  var parent = null;
  var children = null;
  headings.forEach(function (heading, index) {
    var item = document.createElement('li');
    var anchor = link(heading, index);
    item.appendChild(anchor);
    if (heading.tagName === 'H2') {
      list.appendChild(item);
      parent = item;
      children = null;
    } else if (parent) {
      if (!children) {
        children = document.createElement('ol');
        parent.appendChild(children);
      }
      children.appendChild(item);
    } else {
      return;
    }
    entries.push({ heading: heading, anchor: anchor, section: heading.tagName === 'H2' ? item : parent });
  });

  var title = document.createElement('p');
  title.className = 'toc-title';
  title.textContent = 'On this page';
  var top = document.createElement('a');
  top.className = 'toc-top';
  top.href = '#top';
  top.textContent = 'Back to top';
  toc.appendChild(title);
  toc.appendChild(list);
  toc.appendChild(top);

  // Narrow screens: a collapsed copy of the sections, unless the page opens with its own contents list.
  var firstList = article.querySelector('ul, ol');
  var listLinks = firstList ? Array.prototype.slice.call(firstList.querySelectorAll('a')) : [];
  var hasContents = listLinks.length > 2 && listLinks.every(function (anchor) {
    return (anchor.getAttribute('href') || '').charAt(0) === '#';
  });
  var h1 = article.querySelector('h1');
  if (!hasContents && h1) {
    var details = document.createElement('details');
    details.className = 'toc-inline';
    var summary = document.createElement('summary');
    summary.textContent = 'On this page';
    var inline = document.createElement('ol');
    sections.forEach(function (heading) {
      var item = document.createElement('li');
      item.appendChild(link(heading, headings.indexOf(heading)));
      inline.appendChild(item);
    });
    details.appendChild(summary);
    details.appendChild(inline);
    details.addEventListener('click', function (event) {
      if (event.target.closest('a')) details.open = false;
    });
    h1.insertAdjacentElement('afterend', details);
  }

  var current = null;
  var queued = false;
  function update() {
    queued = false;
    var line = window.scrollY + 120;
    var active = entries[0];
    for (var i = 0; i < entries.length; i += 1) {
      if (entries[i].heading.getBoundingClientRect().top + window.scrollY <= line) active = entries[i];
      else break;
    }
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) active = entries[entries.length - 1];
    if (active === current) return;
    if (current) {
      current.anchor.classList.remove('active');
      current.section.classList.remove('open');
    }
    active.anchor.classList.add('active');
    active.section.classList.add('open');
    current = active;
  }
  window.addEventListener('scroll', function () {
    if (!queued) {
      queued = true;
      window.requestAnimationFrame(update);
    }
  }, { passive: true });
  window.addEventListener('hashchange', update);
  update();
})();
