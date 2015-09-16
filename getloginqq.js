var $ = window.$ || {};

$.suportActive = function() {
  var a = true;
  try {
    if (window.ActiveXObject || window.ActiveXObject.prototype) {
      a = true;
      if (window.ActiveXObject.prototype && !window.ActiveXObject) {
      }
    } else {
      a = false
    }
  } catch (b) {
    a = false
  }
  return a
};

$.getLoginQQNum = function() {
  try {
    var f = 0;
    if ($.suportActive()) {
      $.plugin_isd_flag = "flag1=7808&flag2=1&flag3=20";
      $.report.setBasePoint($.plugin_isd_flag, new Date());
      var l = new ActiveXObject("SSOAxCtrlForPTLogin.SSOForPTLogin2");
      $.activetxsso = l;
      var b = l.CreateTXSSOData();
      l.InitSSOFPTCtrl(0, b);
      var a = l.DoOperation(2, b);
      var d = a.GetArray("PTALIST");
      f = d.GetSize();
      try {
        var c = l.QuerySSOInfo(1);
        $.sso_ver = c.GetInt("nSSOVersion")
      } catch (g) {
        $.sso_ver = 0
      }
    } else {
      if (navigator.mimeTypes["application/nptxsso"]) {
        $.plugin_isd_flag = "flag1=7808&flag2=1&flag3=21";
        $.report.setBasePoint($.plugin_isd_flag, (new Date()).getTime());
        if (!$.nptxsso) {
          $.nptxsso = document.createElement("embed");
          $.nptxsso.type = "application/nptxsso";
          $.nptxsso.style.width = "0px";
          $.nptxsso.style.height = "0px";
          document.body.appendChild($.nptxsso)
        }
        if (typeof $.nptxsso.InitPVANoST != "function") {
          $.sso_loadComplete = false;
          $.report.nlog("没有找到插件的InitPVANoST方法", 269929)
        } else {
          var j = $.nptxsso.InitPVANoST();
          if (j) {
            f = $.nptxsso.GetPVACount();
            $.sso_loadComplete = true
          }
          try {
            $.sso_ver = $.nptxsso.GetSSOVersion()
          } catch (g) {
            $.sso_ver = 0
          }
        }
      } else {
        $.report.nlog("插件没有注册成功", 263744);
        $.sso_state = 2
      }
    }
  } catch (g) {
    var k = null;
    try {
      k = $.http.getXHR()
    } catch (g) {
      return 0
    }
    var h = g.message || g;
    if (/^pt_windows_sso/.test(h)) {
      if (/^pt_windows_sso_\d+_3/.test(h)) {
        $.report.nlog("QQ插件不支持该url" + g.message, 326044)
      } else {
        $.report.nlog("QQ插件抛出内部错误" + g.message, 325361)
      }
      $.sso_state = 1
    } else {
      if (k) {
        $.report.nlog("可能没有安装QQ" + g.message, 322340);
        $.sso_state = 2
      } else {
        $.report.nlog("获取登录QQ号码出错" + g.message, 263745);
        if (window.ActiveXObject) {
          $.sso_state = 1
        }
      }
    }
    return 0
  }
  $.loginQQnum = f;
  return f
};