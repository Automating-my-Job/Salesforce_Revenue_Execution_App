# Revenue Execution setup video

Admin / Setup's **Get started**, one chapter per step. Each chapter links its section of the [Admin guide](admin-guide.md); the [Quick start](quick-start.md) has the same steps in writing.

<!-- setup-video -->
{% include video.html id="revenue-execution-setup" preload="metadata" %}
<ol class="chapters">
<li><a href="#before-you-start">Before you start</a> <span>0:00</span></li>
<li><a href="#get-started">Get started</a> <span>0:33</span></li>
<li><a href="#check-core-fields">Check core fields</a> <span>0:48</span></li>
<li><a href="#assign-viewers">Assign Viewers</a> <span>1:09</span></li>
<li><a href="#give-viewers-field-access">Give Viewers field access</a> <span>1:34</span></li>
<li><a href="#fix-remaining-issues">Fix remaining issues</a> <span>1:51</span></li>
<li><a href="#see-it-on-a-dashboard">See it on a dashboard</a> <span>2:07</span></li>
<li><a href="#deal-alerts">Deal Alerts</a> <span>2:22</span></li>
</ol>
<script>
(function () {
  var times = {"before-you-start":0,"get-started":33,"check-core-fields":48,"assign-viewers":69,"give-viewers-field-access":94,"fix-remaining-issues":111,"see-it-on-a-dashboard":127,"deal-alerts":142};
  var video = document.getElementById('video-revenue-execution-setup');
  function seek() {
    var id = window.location.hash.slice(1);
    if (!Object.prototype.hasOwnProperty.call(times, id)) return;
    video.currentTime = times[id];
    video.scrollIntoView({ block: 'center' });
  }
  window.addEventListener('hashchange', seek);
  if (video.readyState > 0) seek(); else video.addEventListener('loadedmetadata', seek);
})();
</script>
<!-- /setup-video -->

<!-- chapter-times: before-you-start=0 get-started=33 check-core-fields=48 assign-viewers=69 give-viewers-field-access=94 fix-remaining-issues=111 see-it-on-a-dashboard=127 deal-alerts=142 -->

## Before you start

After you install, assign yourself two permission sets, Revenue Execution Configuration Health and Revenue Execution Viewer, then open **Admin / Setup** from the App Launcher. See [Grant access](admin-guide.md#grant-access).

## Get started

Admin / Setup opens on Get started: four steps, in order. **Next** marks the one to do now. See [Get started and Health](admin-guide.md#get-started-and-health).

## Check core fields

The defaults use Amount and Close Date. To report on another field, pick it in **Configure Fields**, **Preview**, then **Save**: every dashboard uses it. See [Map your fields](admin-guide.md#map-your-fields).

## Assign Viewers

Assign Revenue Execution Viewer to everyone who uses the dashboards: **Copy** the Setup path, add them in Setup, come back, and **Recheck**. See [Grant access](admin-guide.md#grant-access).

## Give Viewers field access

Get started lists the fields Viewers can't read yet. Grant Read on them in a permission set your company owns, assign it to your Viewers, and **Recheck**.

## Fix remaining issues

Anything else Health finds shows up here, with the fix on the row. See [Troubleshooting](admin-guide.md#troubleshooting).

## See it on a dashboard

Every dashboard follows your settings. Product Overview shows what's selling, and its product mix flags what needs help. See the [User guide](user-guide.md).

## Deal Alerts

Optional: Deal Alerts emails owners about past-due deals. It stays off until you turn it on. See [Deal Alerts](admin-guide.md#deal-alerts).
