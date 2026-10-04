// Revenue Execution docs: menu behavior, section links, step badges, and "On this page".
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
