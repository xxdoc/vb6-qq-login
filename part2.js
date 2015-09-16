function pluginBegin() {
  if (!$.sso_loadComplete) {
    try {
      $.checkNPPlugin()
    } catch (a) {}
  }
  $.sso_loadComplete = true;
  $.report.setSpeedPoint($.plugin_isd_flag, 1, (new Date()).getTime());
  window.setTimeout(function(b) {
    $.report.isdSpeed($.plugin_isd_flag, 0.05)
  }, 2000)
}(function() {
  var a = "nohost_guid";
  var b = "/nohost_htdocs/js/SwitchHost.js";
  if ($.cookie.get(a) != "") {
    $.http.loadScript(b, function() {
      var c = window.SwitchHost && window.SwitchHost.init;
      c && c()
    })
  }
})();

setTimeout(function() {
  var a = "flag1=7808&flag2=1&flag3=9";
  $.report.setBasePoint(a, 0);
  if (typeof window.postMessage != "undefined") {
    $.report.setSpeedPoint(a, 1, 2000)
  } else {
    $.report.setSpeedPoint(a, 1, 1000)
  }
  $.report.isdSpeed(a, 0.01)
}, 500);