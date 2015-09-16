pt.setHeader = function(b) {
  for (var c in b) {
    if (c != "") {
      var a = $("img_" + c);
      if (a) {
        if (b[c] && b[c].indexOf("sys.getface.qq.com") > -1) {
          a.src = pt.plogin.dftImg
        } else {
          a.src = b[c] || pt.plogin.dftImg
        }
      } else {
        if (b[c] && b[c].indexOf("sys.getface.qq.com") > -1) {
          $("auth_face").src = pt.plogin.dftImg
        } else {
          $("auth_face").src = b[c] || pt.plogin.dftImg
        }
      }
    }
  }
};
pt.qlogin = function() {
  var R = {
    "17": 2,
    "19": 3,
    "20": 2,
    "21": 3,
    "22": 3,
    "23": 3,
    "25": 3,
    "32": 3,
    "33": 3,
    "34": 3
  };
  var x = {
    "17": 240,
    "19": 300,
    "20": 240,
    "21": 360,
    "22": 360,
    "23": 300,
    "25": 300,
    "32": 360,
    "33": 300,
    "34": 300
  };
  var l = 1,
    z = 2,
    C = 3,
    j = 4;
  var I = [];
  var u = [];
  var J = 9;
  var X = '<a hidefocus=true draggable=false href="javascript:void(0);" tabindex="#tabindex#" uin="#uin#" type="#type#" onclick="pt.qlogin.imgClick(this);return false;" onfocus="pt.qlogin.imgFocus(this);" onblur="pt.qlogin.imgBlur(this);" onmouseover="pt.qlogin.imgMouseover(this);" onmousedown="pt.qlogin.imgMouseDowm(this)" onmouseup="pt.qlogin.imgMouseUp(this)" onmouseout="pt.qlogin.imgMouseUp(this)" class="face"  >          <img  id="img_#uin#" uin="#uin#" type="#type#" src="#src#"    onerror="pt.qlogin.imgErr(this);" />           <span id="mengban_#uin#"></span>          <span class="uin_menban"></span>          <span class="uin">#uin#</span>          <span id="img_out_#uin#" uin="#uin#" type="#type#"  class="img_out"  ></span>          <span id="nick_#uin#" class="#nick_class#">#nick#</span>          <span  class="#vip_logo#"></span>      </a>';
  var N = false;
  var o = 1;
  var G = R[pt.ptui.style];
  var B = x[pt.ptui.style];
  var y = 1;
  var S = 5;
  var g = null;
  var Q = true;
  var w = 0;
  var d = 0;
  var q = [4300, 4302, 4304, 4306, 4308],
    D = [4301, 4303, 4305, 4307, 4309];
  var r = 0;
  var a = function(af) {
    if ((af == 1 && y <= 1) || (af == 2 && y >= o)) {
      return
    }
    var ab = 0;
    var ae = 1;
    var ad = $("qlogin_show").offsetWidth || B;
    var Y = 10;
    var ac = Math.ceil(ad / Y);
    var aa = 0;
    if (af == 1) {
      y--;
      if (y <= 1) {
        $.css.hide($("prePage"));
        $.css.show($("nextPage"))
      } else {
        $.css.show($("nextPage"));
        $.css.show($("prePage"))
      }
    } else {
      y++;
      if (y >= o) {
        $.css.hide($("nextPage"));
        $.css.show($("prePage"))
      } else {
        $.css.show($("nextPage"));
        $.css.show($("prePage"))
      }
    }

    function Z() {
      if (af == 1) {
        $("qlogin_list").style.left = (aa * Y - y * ad) + "px"
      } else {
        $("qlogin_list").style.left = ((2 - y) * ad - aa * Y) + "px"
      }
      aa++;
      if (aa > ac) {
        window.clearInterval(ab)
      }
    }
    ab = window.setInterval(Z, ae)
  };
  var T = function() {
    u.length = 0;
    if ($.suportActive()) {
      try {
        var au = $.activetxsso;
        var ac = au.CreateTXSSOData();
        au.InitSSOFPTCtrl(0, ac);
        var aq = au.DoOperation(1, ac);
        if (null == aq) {
          return
        }
        var ao = aq.GetArray("PTALIST");
        var aw = ao.GetSize();
        for (var ax = 0; ax < aw; ax++) {
          var ab = ao.GetData(ax);
          var at = ab.GetDWord("dwSSO_Account_dwAccountUin");
          var ak = ab.GetDWord("dwSSO_Account_dwAccountUin");
          var af = "";
          var aj = ab.GetByte("cSSO_Account_cAccountType");
          var av = at;
          if (aj == 1) {
            try {
              af = ab.GetArray("SSO_Account_AccountValueList");
              av = af.GetStr(0)
            } catch (ar) {}
          }
          var am = 0;
          try {
            am = ab.GetWord("wSSO_Account_wFaceIndex")
          } catch (ar) {
            am = 0
          }
          var an = "";
          try {
            an = ab.GetStr("strSSO_Account_strNickName")
          } catch (ar) {
            an = ""
          }
          var ad = ab.GetBuf("bufST_PTLOGIN");
          var ai = "";
          var Y = ad.GetSize();
          for (var ap = 0; ap < Y; ap++) {
            var Z = ad.GetAt(ap).toString("16");
            if (Z.length == 1) {
              Z = "0" + Z
            }
            ai += Z
          }
          var al = ab.GetDWord("dwSSO_Account_dwUinFlag");
          var ah = {
            uin: at,
            name: av,
            uinString: ak,
            type: aj,
            face: am,
            nick: an,
            flag: al,
            key: ai,
            loginType: z
          };
          u.push(ah)
        }
      } catch (ar) {
        P();
        $.report.nlog("IE获取快速登录信息失败：" + ar.message, "391626", 0.05)
      }
    } else {
      try {
        var aa = $.nptxsso;
        var ag = aa.InitPVA();
        if (ag != false) {
          var ae = aa.GetPVACount();
          for (var ap = 0; ap < ae; ap++) {
            var ah = {
              uin: aa.GetUin(ap),
              name: aa.GetAccountName(ap),
              uinString: aa.GetUinString(ap),
              type: 0,
              face: aa.GetFaceIndex(ap),
              nick: aa.GetNickname(ap) || aa.GetUinString(ap),
              flag: aa.GetUinFlag(ap),
              key: aa.GetST(ap),
              loginType: z
            };
            u.push(ah)
          }
          if (typeof(aa.GetKeyIndex) == "function") {
            J = aa.GetKeyIndex()
          }
        }
      } catch (ar) {
        if (navigator.userAgent.match(/mac.*?safari/i)) {
          !window.chrome && pt.plogin.showAssistant(4)
        } else {
          P()
        }
        $.report.nlog("非IE获取快速登录信息失败：" + (ar.message || ar), "391627", 0.05)
      }
    }
  };
  var p = function(aa) {
    for (var Z = 0, Y = u.length; Z < Y; Z++) {
      var ab = u[Z];
      if (ab.uinString == aa) {
        return ab
      }
    }
    return null
  };
  var P = function() {
    if (pt.ptui.enable_qlogin == 0) {
      return
    }
    if (!$.cookie.get("pt_local_token")) {
      $.cookie.set("pt_local_token", Math.random(), "ptlogin2." + pt.ptui.domain);
      if (!$.cookie.get("pt_local_token")) {
        return
      }
    }
    var ab = pt.ptui.isHttps ? D : q,
      Z = pt.ptui.isHttps ? 80 : 50;
    var Y = "http" + (pt.ptui.isHttps ? "s" : "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_uins?callback=ptui_getuins_CB&r=" + Math.random() + "&pt_local_tk=" + $.cookie.get("pt_local_token");
    var aa = 0;
    pt.qlogin.__getuinsClock = setTimeout(function() {
      var af = window.localStorage && localStorage.getItem("newQQ");
      if (af) {
        return
      }
      var ac = navigator.userAgent.toLocaleLowerCase();
      if (ac.indexOf("windows nt") == -1) {
        return
      }
      if (ac.indexOf("touch") > 0) {
        return
      }
      var ae = ["tencent.com", "3366.com", "51buy.com", "ejinshang.com", "imqq.com", "myapp.com", "paipai.com", "pengyou.com", "qcloud.com", "qq.com", "qzone.com", "tenpay.com", "wanggou.com", "weiyun.com", "yixun.com"];
      for (var ad in ae) {
        if (ae[ad] == pt.ptui.domain) {
          return pt.plogin.showAssistant(3)
        }
      }
    }, Z * 20);
    $.http.loadScript(Y.replace("[port]", ab[aa++]));
    r = setInterval(function() {
      if (window.ptui_getuins_CB && ptui_getuins_CB.called) {
        clearTimeout(pt.qlogin.__getuinsClock)
      }
      if (aa >= ab.length || (window.ptui_getuins_CB && ptui_getuins_CB.called)) {
        clearInterval(r)
      } else {
        $.http.loadScript(Y.replace("[port]", ab[aa++]))
      }
    }, Z)
  };
  var V = function(Y) {
    if (!Y) {
      return
    }
    pt.plogin.showLoading();
    var ac = $.cookie.get("pt_local_token");
    var Z = "http" + (pt.ptui.isHttps ? "s" : "") + "://localhost.ptlogin2." + pt.ptui.domain + ":[port]/pt_get_st?clientuin=" + Y + "&callback=ptui_getst_CB&r=" + Math.random() + "&pt_local_tk=" + ac;
    var ad = pt.ptui.isHttps ? D : q,
      aa = pt.ptui.isHttps ? 80 : 50;
    var ab = 0;
    ptui_getst_CB.submitUrl = k({
      uin: Y,
      pt_local_tk: "{{hash_clientkey}}"
    });
    $.http.loadScript(Z.replace("[port]", ad[ab++]));
    r = setInterval(function() {
      if (ab >= ad.length || (window.ptui_getst_CB && ptui_getst_CB.called)) {
        clearInterval(r)
      } else {
        $.http.loadScript(Z.replace("[port]", ad[ab++]))
      }
      if (ab >= ad.length) {
        pt.qlogin.__getstClock = setTimeout(function() {
          pt.plogin.hideLoading();
          ptui_qlogin_CB("-1234", "", "快速登录失败，请检查QQ客户端是否打开")
        }, 3000)
      }
    }, aa)
  };
  var K = function(Y) {
    if (Y) {
      u = [].concat(Y)
    } else {
      T()
    }
    var ad = [];
    var ab = u.length;
    if (pt.plogin.isNewQr) {
      var ac = {};
      ac.loginType = C;
      ad.push(ac)
    }
    if (pt.plogin.authUin && pt.ptui.auth_mode == "0") {
      var ac = {};
      ac.name = pt.plogin.authUin;
      ac.uinString = pt.plogin.authUin;
      ac.nick = $.str.utf8ToUincode($.cookie.get("ptnick_" + pt.plogin.authUin)) || pt.plogin.authUin;
      ac.loginType = l;
      ad.push(ac)
    }
    for (var Z = 0; Z < ab; Z++) {
      var aa = u[Z];
      if (pt.plogin.authUin && (pt.plogin.authUin == aa.name || pt.plogin.authUin == aa.uinString)) {
        continue
      } else {
        ad.push(aa)
      }
      if (ad.length == 5) {
        break
      }
    }
    I = ad;
    return ad
  };
  var U = function(al) {
    var aj = "";
    var ai = K(al);
    var am = $("qlogin_list");
    if (null == am) {
      return
    }
    if (al) {
      var ad = $("qr_area");
      if (ad) {
        am.removeChild(ad)
      }
      am.innerHTML = "";
      ad && am.appendChild(ad)
    }
    var af = ai.length > S ? S : ai.length;
    if (af == 0) {
      pt.plogin.switchpage(1, true);
      return
    }
    if (pt.plogin.isNewQr) {
      if (af == 1 && pt.plogin.isNewQr) {
        $("qlogin_tips") && $.css.hide($("qlogin_tips"));
        $("qlogin_show").style.top = "25px"
      } else {
        $("qlogin_tips") && $.css.show($("qlogin_tips"));
        $("qlogin_show").style.top = ""
      }
    }
    o = Math.ceil(af / G);
    if (o >= 2) {
      $.css.show($("nextPage"))
    }
    for (var ac = 0; ac < af; ac++) {
      var ae = ai[ac];
      var ab = $.str.encodeHtml(ae.uinString + "");
      var Z = $.str.encodeHtml(ae.nick);
      if ($.str.trim(ae.nick) == "") {
        Z = ab
      }
      var ak = ae.flag;
      var ah = ((ak & 4) == 4);
      var Y = pt.plogin.dftImg;
      if (ae.loginType == C) {
        var ad = $("qr_area");
        if (af == 1) {
          if (ad) {
            $("qr_area").className = "qr_0"
          }
          if (pt.ptui.lang == "1033") {
            $("qlogin_show").style.height = ($("qlogin_show").offsetHeight + 10) + "px"
          }
        } else {
          if (ad) {
            $("qr_area").className = "qr_1"
          }
        }
      } else {
        aj += X.replace(/#uin#/g, ab).replace(/#nick#/g, function() {
          return Z
        }).replace(/#nick_class#/, ah ? "nick red" : "nick").replace(/#vip_logo#/, ah ? "vip_logo" : "").replace(/#type#/g, ae.loginType).replace(/#src#/g, Y).replace(/#tabindex#/, ac + 1).replace(/#class#/g, ae.loginType == l ? "auth" : "hide")
      }
    }
    aj = am.innerHTML + aj;
    am.innerHTML = aj;
    var ag = $("qlogin_show").offsetWidth || B;
    var aa = (o == 1 ? ag : ag / G * af);
    am.style.width = aa + "px";
    if (pt.plogin.isNewQr) {
      am.style.width = (aa + 4) + "px"
    }
    if (r <= 0) {
      pt.qlogin.hasBuildQlogin = true
    }
    W();
    M()
  };
  var A = function(Z) {
    if (Z) {
      T();
      var Y = p(Z);
      if (Y == null) {
        pt.plogin.show_err(pt.str.qlogin_expire);
        $.report.monitor(231544, 1)
      } else {
        var aa = k(Y);
        if (Q) {
          $.http.loadScript(aa)
        } else {
          pt.plogin.redirect(pt.ptui.target, aa)
        }
        pt.plogin.showLoading();
        window.clearTimeout(pt.qlogin.__getstClock);
        pt.qlogin.__getstClock = window.setTimeout("pt.plogin.hideLoading();pt.plogin.showAssistant(0);", 10000)
      }
    }
  };
  var s = function(aa, Z, ab) {
    var ac = aa.split("#");
    var Y = ac[0].indexOf("?") > 0 ? "&" : "?";
    if (ac[0].substr(ac[0].length - 1, 1) == "?") {
      Y = ""
    }
    if (ac[1]) {
      ac[1] = "#" + ac[1]
    } else {
      ac[1] = ""
    }
    return ac[0] + Y + Z + "=" + ab + ac[1]
  };
  var O = function(Z) {
    var Y = pt.ptui.s_url;
    if (pt.ptui.low_login == 1 && pt.plogin.low_login_enable && pt.plogin.isMailLogin) {
      Y = s(Y, "ss", 1)
    }
    if (pt.plogin.isMailLogin && Z) {
      Y = s(Y, "account", encodeURIComponent(Z))
    }
    return Y
  };
  var k = function(Y) {
    var Z = pt.ptui.isHttps ? "https://ssl.ptlogin2." : "http://ptlogin2.";
    var aa = Z + pt.ptui.domain + "/" + (pt.ptui.jumpname || "jump") + "?";
    if (pt.ptui.regmaster == 2) {
      aa = "http://ptlogin2.function.qq.com/jump?regmaster=2&"
    } else {
      if (pt.ptui.regmaster == 3) {
        aa = "http://ptlogin2.crm2.qq.com/jump?regmaster=3&"
      } else {
        if (pt.ptui.regmaster == 4) {
          aa = "https://ssl.ptlogin2.mail.qq.com/jump?regmaster=4&"
        } else {
          if (pt.ptui.regmaster == 5) {
            aa = Z + "mp.qq.com/jump?regmaster=5&"
          }
        }
      }
    }
    aa += "clientuin=" + Y.uin + "&keyindex=" + J + "&pt_aid=" + pt.ptui.appid + (pt.ptui.daid ? "&daid=" + pt.ptui.daid : "") + "&u1=" + encodeURIComponent(O());
    if (typeof Y.key != "undefined") {
      aa += "&clientkey=" + Y.key
    } else {
      aa += "&pt_local_tk=" + Y.pt_local_tk
    }
    if (pt.ptui.low_login == 1 && pt.plogin.low_login_enable && !pt.plogin.isMailLogin) {
      aa += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour
    }
    if (pt.ptui.csimc != "0" && pt.ptui.csimc) {
      aa += "&csimc=" + pt.ptui.csimc + "&csnum=" + pt.ptui.csnum + "&authid=" + pt.ptui.authid
    }
    if (pt.ptui.pt_qzone_sig == "1") {
      aa += "&pt_qzone_sig=1"
    }
    if (pt.ptui.pt_light == "1") {
      aa += "&pt_light=1"
    }
    if (pt.ptui.pt_3rd_aid) {
      aa += "&pt_3rd_aid=" + pt.ptui.pt_3rd_aid
    }
    if (Q) {
      aa += "&ptopt=1"
    }
    return aa
  };
  var F = function() {
    var Y = t();
    pt.plogin.redirect(pt.ptui.target, Y);
    pt.plogin.showLoading()
  };
  var t = function() {
    var Y = pt.plogin.authSubmitUrl;
    Y += "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(O());
    if (pt.ptui.low_login == 1 && pt.plogin.low_login_enable) {
      Y += "&low_login_enable=1&low_login_hour=" + pt.plogin.low_login_hour
    }
    if (pt.ptui.pt_light == "1") {
      Y += "&pt_light=1"
    }
    return Y
  };
  var n = function(Y) {
    Y.onerror = null;
    if (Y.src != pt.plogin.dftImg) {
      Y.src = pt.plogin.dftImg
    }
    return false
  };
  var b = function(Y) {
    var aa = parseInt(Y.getAttribute("type"));
    var Z = Y.getAttribute("uin");
    switch (aa) {
      case l:
        F();
        break;
      case z:
        A(Z);
        break;
      case j:
        V(Z);
        break
    }
  };
  var h = function(Y) {
    if (!Y) {
      return
    }
    var Z = Y.getAttribute("uin");
    if (Z) {
      $("img_out_" + Z).className = "img_out_focus"
    }
  };
  var E = function(Y) {
    if (!Y) {
      return
    }
    var Z = Y.getAttribute("uin");
    if (Z) {
      $("img_out_" + Z).className = "img_out"
    }
  };
  var L = function(Y) {
    if (!Y) {
      return
    }
    if (g != Y) {
      E(g);
      g = Y
    }
    h(Y)
  };
  var f = function(Y) {
    if (!Y) {
      return
    }
    var Z = Y.getAttribute("uin");
    var aa = $("mengban_" + Z);
    aa && (aa.className = "face_mengban")
  };
  var v = function(Y) {
    if (!Y) {
      return
    }
    var Z = Y.getAttribute("uin");
    var aa = $("mengban_" + Z);
    aa && (aa.className = "")
  };
  var W = function() {
    var Z = $("qlogin_list");
    var Y = Z.getElementsByTagName("a");
    if (Y.length > 0) {
      g = Y[0]
    }
  };
  var M = function() {
    try {
      g.focus()
    } catch (Y) {}
  };
  var H = function() {
    var Z = $("prePage");
    var Y = $("nextPage");
    if (Z) {
      $.e.add(Z, "click", function(aa) {
        a(1)
      })
    }
    if (Y) {
      $.e.add(Y, "click", function(aa) {
        a(2)
      })
    }
  };
  var c = function() {
    var Z = I.length;
    for (var Y = 0; Y < Z; Y++) {
      if (I[Y].uinString) {
        $.http.loadScript((pt.ptui.isHttps ? "https://ssl.ptlogin2." : "http://ptlogin2.") + pt.ptui.domain + "/getface?appid=" + pt.ptui.appid + "&imgtype=3&encrytype=0&devtype=0&keytpye=0&uin=" + I[Y].uinString + "&r=" + Math.random())
      }
    }
  };
  var m = function() {
    H();
    setTimeout(function() {
      $.report.monitor(492804, 0.05)
    }, 0)
  };
  m();
  return {
    qloginInit: m,
    hasBuildQlogin: N,
    buildQloginList: U,
    imgClick: b,
    imgFocus: h,
    imgBlur: E,
    imgMouseover: L,
    imgMouseDowm: f,
    imgMouseUp: v,
    imgErr: n,
    focusHeader: M,
    initFace: c,
    authLoginSubmit: F,
    __getstClock: w,
    __getuinsClock: d,
    getSurl: O,
    PCSvrQlogin: j
  }
}();

function ptui_qlogin_CB(b, a, c) {
  window.clearTimeout(pt.qlogin.__getstClock);
  ptui_qlogin_CB.called = true;
  switch (b) {
    case "0":
      pt.plogin.redirect(pt.ptui.target, a);
      break;
    case "10006":
      pt.plogin.force_qrlogin();
      pt.plogin.show_err(c, true);
      break;
    default:
      pt.plogin.switchpage(1);
      pt.plogin.show_err(c, true)
  }
}

function ptui_getuins_CB(b) {
  clearTimeout(pt.qlogin.__getuinsClock);
  if (!b || ptui_getuins_CB.called) {
    return
  }
  ptui_getuins_CB.called = true;
  pt.plogin.hide_err();
  var a = [];
  for (var c = 0; c < b.length; c++) {
    var d = b[c];
    a.push({
      uin: d.uin,
      name: d.account,
      uinString: d.uin,
      type: 0,
      face: d.face_index,
      nick: d.nickname,
      flag: d.uin_flag,
      loginType: pt.qlogin.PCSvrQlogin
    })
  }
  pt.plogin.initQlogin("", a);
  pt.qlogin.initFace();
  $.report.monitor(508158, 1);
  window.localStorage && localStorage.setItem("newQQ", true)
}

function ptui_getst_CB(a) {
  if (!a) {
    return
  }
  ptui_getst_CB.called = true;
  pt.plogin.hideLoading();
  if (ptui_getst_CB.submitUrl) {
    $.http.loadScript(ptui_getst_CB.submitUrl.replace("{{hash_clientkey}}", $.str.time33($.cookie.get("clientkey")) & 2147483647))
  }
  $.report.monitor(508159, 1)
}
pt.LoginState = {
  PLogin: 1,
  QLogin: 2
};
pt.plogin = {
  account: "",
  at_account: "",
  uin: "",
  salt: "",
  hasCheck: false,
  lastCheckAccount: "",
  needVc: false,
  vcFlag: false,
  ckNum: {},
  action: [0, 0],
  passwordErrorNum: 1,
  isIpad: /iPad/.test(navigator.userAgent),
  ios8: /iPad.*?OS 8_/i.test(navigator.userAgent),
  t_appid: 46000101,
  seller_id: 703010802,
  checkUrl: "",
  loginUrl: "",
  verifycodeUrl: "",
  newVerifycodeUrl: "",
  needShowNewVc: false,
  pt_verifysession: "",
  checkClock: 0,
  isCheckTimeout: false,
  cntCheckTimeout: 0,
  errclock: 0,
  loginClock: 0,
  login_param: pt.ptui.href.substring(pt.ptui.href.indexOf("?") + 1),
  err_m: $("err_m"),
  low_login_enable: true,
  low_login_hour: 720,
  low_login_isshow: false,
  list_index: [-1, 2],
  keyCode: {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39,
    ENTER: 13,
    TAB: 9,
    BACK: 8,
    DEL: 46,
    F5: 116
  },
  knownEmail: ["qq.com", "foxmail.com", "gmail.com", "hotmail.com", "yahoo.com", "sina.com", "163.com", "126.com", "vip.qq.com", "vip.sina.com", "sina.cn", "sohu.com", "yahoo.cn", "yahoo.com.cn", "139.com", "wo.com.cn", "189.cn", "live.com", "msn.com", "live.hk", "live.cn", "hotmail.com.cn", "hinet.net", "msa.hinet.net", "cm1.hinet.net", "umail.hinet.net", "xuite.net", "yam.com", "pchome.com.tw", "netvigator.com", "seed.net.tw", "anet.net.tw"],
  qrlogin_clock: 0,
  qrlogin_timeout: 0,
  qrlogin_timeout_time: 100000,
  isQrLogin: false,
  qr_uin: "",
  qr_nick: "",
  dftImg: "",
  need_hide_operate_tips: true,
  js_type: 1,
  xuiState: 1,
  delayTime: 5000,
  delayMonitorId: "294059",
  hasSubmit: false,
  authUin: "",
  authSubmitUrl: "",
  loginState: pt.LoginState.PLogin,
  checkRet: -1,
  cap_cd: 0,
  checkErr: {
    "2052": "网络繁忙，请稍后重试。",
    "1028": "網絡繁忙，請稍後重試。",
    "1033": "The network is busy, please try again later."
  },
  isUIStyle: pt.ptui.fromStyle == 17,
  domFocus: function(b) {
    try {
      window.setTimeout(function() {
        b.focus()
      }, 0)
    } catch (a) {}
  },
  formFocus: function() {
    var b = document.loginform;
    try {
      var a = b.u;
      var d = b.p;
      var f = b.verifycode;
      if (a.value == "") {
        a.focus();
        return
      }
      if (d.value == "") {
        d.focus();
        return
      }
      if (f.value == "") {
        f.focus()
      }
    } catch (c) {}
  },
  getAuthUrl: function() {
    var b = (pt.ptui.isHttps ? "https://ssl." : "http://") + "ptlogin2." + pt.ptui.domain + "/pt4_auth?daid=" + pt.ptui.daid + "&appid=" + pt.ptui.appid + "&auth_token=" + $.str.time33($.cookie.get("supertoken"));
    var a = pt.ptui.s_url;
    if (/^https/.test(a)) {
      b += "&pt4_shttps=1"
    }
    if (pt.ptui.pt_qzone_sig == "1") {
      b += "&pt_qzone_sig=1"
    }
    return b
  },
  auth: function() {
    pt.ptui.isHttps = $.check.isHttps();
    var a = pt.plogin.getAuthUrl();
    var b = $.cookie.get("superuin");
    if (pt.ptui.daid && pt.ptui.noAuth != "1" && b != "" && pt.ptui.regmaster != 4 && pt.ptui.regmaster != 5) {
      $.http.loadScript(a)
    } else {
      pt.plogin.init()
    }
  },
  initQlogin: function(c, b) {
    c = c || pt.plogin.initQlogin.url;
    pt.plogin.initQlogin.url = c;
    var d = 0;
    var a = false;
    if (c && pt.ptui.auth_mode == 0) {
      a = true
    }
    if (!b && pt.ptui.enable_qlogin != 0 && $.cookie.get("pt_qlogincode") != 5) {
      d = $.getLoginQQNum()
    }
    d += a ? 1 : 0;
    d += b ? b.length : 0;
    if (d > 0) {
      pt.plogin.switchpage(pt.LoginState.QLogin)
    } else {
      pt.plogin.switchpage(pt.LoginState.PLogin, true);
      if ($("u").value && pt.ptui.auth_mode == 0) {
        pt.plogin.check()
      }
    }
    if (pt.ptui.enable_qlogin != 0 && !pt.qlogin.hasBuildQlogin) {
      pt.qlogin.buildQloginList(b)
    }
  },
  switchpage: function(a, b) {
    pt.plogin.loginState = a;
    if (!b) {
      pt.plogin.hide_err()
    }
    switch (a) {
      case 1:
        $.css.hide($("qloginTips"));
        $.css.hide($("qlogin"));
        $.css.show($("plogin"));
        $.css.show($("ploginTips"));
        $("fgtpwdbox").style.display = "inline";
        $("q_low_login_box") && $.css.hide($("q_low_login_box"));
        if (b) {
          $("login_switcher_box").className = "login_switcher_no_qlogin"
        } else {
          $("login_switcher_box").className = "login_switcher_plogin"
        }
        window.setTimeout(function() {
          pt.plogin.formFocus()
        }, 0);
        break;
      case 2:
        $.css.hide($("ploginTips"));
        $.css.hide($("plogin"));
        $.css.show($("qlogin"));
        $.css.show($("qloginTips"));
        $.css.hide($("fgtpwdbox"));
        $("q_low_login_box") && $.css.show($("q_low_login_box"));
        $("login_switcher_box").className = "login_switcher_qlogin";
        pt.qlogin.focusHeader();
        break
    }
    pt.plogin.ptui_notifySize("login")
  },
  detectCapsLock: function(c) {
    var b = c.keyCode || c.which;
    var a = c.shiftKey || (b == 16) || false;
    if (((b >= 65 && b <= 90) && !a) || ((b >= 97 && b <= 122) && a)) {
      return true
    } else {
      return false
    }
  },
  generateEmailTips: function(f) {
    var k = f.indexOf("@");
    var h = "";
    if (k == -1) {
      h = f
    } else {
      h = f.substring(0, k)
    }
    var b = [];
    for (var d = 0, a = pt.plogin.knownEmail.length; d < a; d++) {
      b.push(h + "@" + pt.plogin.knownEmail[d])
    }
    var g = [];
    for (var c = 0, a = b.length; c < a; c++) {
      if (b[c].indexOf(f) > -1) {
        g.push($.str.encodeHtml(b[c]))
      }
    }
    return g
  },
  createEmailTips: function(f) {
    var a = pt.plogin.generateEmailTips(f);
    var h = a.length;
    var g = [];
    var d = "";
    var c = 4;
    h = Math.min(h, c);
    if (h == 0) {
      pt.plogin.list_index[0] = -1;
      pt.plogin.hideEmailTips();
      return
    }
    for (var b = 0; b < h; b++) {
      if (f == a[b]) {
        pt.plogin.hideEmailTips();
        return
      }
      d = "emailTips_" + b;
      if (0 == b) {
        g.push("<li id=" + d + " class='hover' >" + a[b] + "</li>")
      } else {
        g.push("<li id=" + d + ">" + a[b] + "</li>")
      }
    }
    $("email_list").innerHTML = g.join(" ");
    pt.plogin.list_index[0] = 0
  },
  showEmailTips: function() {
    $.css.show($("email_list"));
    pt.plogin.__isShowEmailTips = true
  },
  hideEmailTips: function() {
    $.css.hide($("email_list"));
    pt.plogin.__isShowEmailTips = false
  },
  setUrl: function() {
    var c = pt.ptui.domain;
    var d = $.check.isHttps() && $.check.isSsl();
    pt.plogin.checkUrl = (pt.ptui.isHttps ? "https://ssl." : "http://check.") + "ptlogin2." + c + "/check";
    pt.plogin.loginUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "ptlogin2." + c + "/";
    pt.plogin.verifycodeUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha." + c + "/getimage";
    pt.plogin.newVerifycodeUrl = (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha.qq.com/cap_union_show?clientype=2";
    if (d && c != "qq.com" && c != "tenpay.com") {
      pt.plogin.verifycodeUrl = "https://ssl.ptlogin2." + c + "/ptgetimage"
    }
    var b = pt.ptui.isHttps ? "https://ssl." : "http://";
    var a = pt.ptui.isHttps ? "https://ssl." : "http://check.";
    if (pt.ptui.regmaster == 2) {
      pt.plogin.checkUrl = "http://check.ptlogin2.function.qq.com/check";
      pt.plogin.loginUrl = "http://ptlogin2.function.qq.com/"
    } else {
      if (pt.ptui.regmaster == 3) {
        pt.plogin.checkUrl = a + "ptlogin2.crm2.qq.com/check";
        pt.plogin.loginUrl = b + "ptlogin2.crm2.qq.com/"
      } else {
        if (pt.ptui.regmaster == 4) {
          pt.plogin.checkUrl = "https://ssl.ptlogin2.mail.qq.com/check";
          pt.plogin.loginUrl = "https://ssl.ptlogin2.mail.qq.com/"
        } else {
          if (pt.ptui.regmaster == 5) {
            pt.plogin.checkUrl = a + "ptlogin2.mp.qq.com/check";
            pt.plogin.loginUrl = b + "ptlogin2.mp.qq.com/"
          }
        }
      }
    }
    pt.plogin.dftImg = pt.ptui.isHttps ? "https://ui.ptlogin2.qq.com/style/0/images/1.gif" : "http://imgcache.qq.com/ptlogin/v4/style/0/images/1.gif"
  },
  init: function(a) {
    pt.ptui.login_sig = pt.ptui.login_sig || $.cookie.get("pt_login_sig");
    pt.ptui.isHttps = $.check.isHttps();
    pt.plogin.setUrl();
    pt.plogin.bindEvent();
    $("login_button") && ($("login_button").disabled = false);
    pt.plogin.set_default_uin(pt.ptui.defaultUin);
    if ($.check.is_weibo_appid(pt.ptui.appid)) {
      $("u") && ($("u").style.imeMode = "auto")
    }
    if (pt.ptui.isHttps) {
      pt.plogin.delayTime = 7000;
      pt.plogin.delayMonitorId = "294060"
    }
    if (pt.ptui.lockuin) {
      pt.plogin.doLockuin()
    } else {
      pt.plogin.initQlogin(a)
    }
    window.setTimeout(function() {
      pt.plogin.domLoad()
    }, 100)
  },
  aq_patch: function() {
    if (Math.random() < 0.05 && !pt.ptui.isHttps) {
      $.http.loadScript("http://mat1.gtimg.com/www/js/common_v2.js", function() {
        if (typeof checkNonTxDomain == "function") {
          try {
            checkNonTxDomain(1, 5)
          } catch (a) {}
        }
      })
    }
  },
  set_default_uin: function(a) {
    if (a == "0") {
      return
    }
    if (a) {} else {
      a = unescape($.cookie.getOrigin("ptui_loginuin"));
      if (pt.ptui.appid != pt.plogin.t_appid && ($.check.isNick(a) || $.check.isName(a))) {
        a = $.cookie.get("pt2gguin").replace(/^o/, "") - 0;
        a = a == 0 ? "" : a
      }
    }
    $("u").value = a;
    if (a) {
      $.css.hide($("uin_tips"));
      $.css.show($("uin_del"));
      pt.plogin.set_account()
    }
  },
  doLockuin: function() {
    $("u").readOnly = true;
    var b = $("uinArea");
    if (!$.css.hasClass(b, "lockuin")) {
      $.css.addClass(b, "lockuin")
    }
    var a = $("uin_del");
    a && a.parentNode.removeChild(a);
    $("p").focus()
  },
  set_account: function() {
    var a = $.str.trim($("u").value);
    var b = pt.ptui.appid;
    pt.plogin.account = a;
    pt.plogin.at_account = a;
    if ($.check.is_weibo_appid(b)) {
      if ($.check.isQQ(a) || $.check.isMail(a)) {
        return true
      } else {
        if ($.check.isNick(a) || $.check.isName(a)) {
          pt.plogin.at_account = "@" + a;
          return true
        } else {
          if ($.check.isPhone(a)) {
            pt.plogin.at_account = "@" + a.replace(/^(86|886)/, "");
            return true
          } else {
            if ($.check.isSeaPhone(a)) {
              pt.plogin.at_account = "@00" + a.replace(/^(00)/, "");
              if (/^(@0088609)/.test(pt.plogin.at_account)) {
                pt.plogin.at_account = pt.plogin.at_account.replace(/^(@0088609)/, "@008869")
              }
              return true
            }
          }
        }
      }
    } else {
      if ($.check.isQQ(a) || $.check.isMail(a)) {
        return true
      }
      if ($.check.isPhone(a)) {
        pt.plogin.at_account = "@" + a.replace(/^(86|886)/, "");
        return true
      }
      if ($.check.isNick(a)) {
        $("u").value = a + "@qq.com";
        pt.plogin.account = a + "@qq.com";
        pt.plogin.at_account = a + "@qq.com";
        return true
      }
    }
    if ($.check.isForeignPhone(a)) {
      pt.plogin.at_account = "@" + a
    }
    return true
  },
  show_err: function(b, a) {
    pt.plogin.hideLoading();
    $.css.show($("error_tips"));
    pt.plogin.err_m.innerHTML = b;
    clearTimeout(pt.plogin.errclock);
    if (!a) {
      pt.plogin.errclock = setTimeout("pt.plogin.hide_err()", 5000)
    }
  },
  hide_err: function() {
    $.css.hide($("error_tips"));
    pt.plogin.err_m.innerHTML = ""
  },
  showAssistant: function(a) {
    if (pt.ptui.lang != "2052") {
      return
    }
    pt.plogin.hideLoading();
    $.css.show($("error_tips"));
    var b = "";
    switch (a) {
      case 0:
        b = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复";
        $.report.monitor("315785");
        break;
      case 1:
        b = "快速登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复";
        $.report.monitor("315786");
        break;
      case 2:
        b = "登录异常，试试 {/assistant/troubleshooter.html,登录助手,} 修复";
        $.report.monitor("315787");
        break;
      case 3:
        b = "快速登录异常，试试 {http://im.qq.com/qq/2013/,升级QQ,onclick='$.report.monitor(326049);'} 修复";
        $.report.monitor("326046");
        break;
      case 4:
        b = "快速登录异常，试试 {http://im.qq.com/macqq/index.shtml#im.qqformac.plusdown,安装插件,}";
        break
    }
    pt.plogin.err_m.innerHTML = b.replace(/{([^,]+?),([^,]+?),(.*?)}/, "<a class='tips_link' style='color: #29B1F1' href='$1' target='_blank' $3>$2</a>")
  },
  showGuanjiaTips: function() {
    $.initGuanjiaPlugin();
    if ($.guanjiaPlugin) {
      $.guanjiaPlugin.QMStartUp(16, '/traytip=3 /tipProblemid=1401 /tipSource=18 /tipType=0 /tipIdParam=0 /tipIconUrl="http://dldir2.qq.com/invc/xfspeed/qqpcmgr/clinic/image/tipsicon_qq.png" /tipTitle="QQ快速登录异常?" /tipDesc="不能用已登录的QQ号快速登录，只能手动输入账号密码，建议用电脑诊所一键修复。"');
      $.report.monitor("316548")
    } else {
      $.report.monitor("316549")
    }
  },
  showLoading: function(a) {
    if (pt.plogin.loginState == pt.LoginState.QLogin) {
      a = 35
    } else {
      a = 20
    }
    pt.plogin.hide_err();
    $("loading_tips").style.top = a + "px";
    $.css.show($("loading_tips"))
  },
  hideLoading: function() {
    $.css.hide($("loading_tips"))
  },
  showLowList: function() {
    var a = $("combox_list");
    if (a) {
      $.css.show(a);
      pt.plogin.low_login_isshow = true
    }
  },
  hideLowList: function() {
    var a = $("combox_list");
    if (a) {
      $.css.hide(a);
      pt.plogin.low_login_isshow = false
    }
  },
  u_focus: function() {
    if ($("u").value == "") {
      $.css.show($("uin_tips"));
      $("uin_tips").className = "input_tips_focus"
    }
    $("u").parentNode.className = "inputOuter_focus"
  },
  u_blur: function() {
    if (pt.plogin.__isShowEmailTips) {
      return
    }
    if (/^\+/.test(this.value)) {
      this.value = this.value.replace(/^\+/, "");
      if (!/^00/.test(this.value)) {
        this.value = "00" + this.value
      }
    }
    if ($("u").value == "") {
      $.css.show($("uin_tips"));
      $("uin_tips").className = "input_tips"
    } else {
      pt.plogin.set_account();
      pt.plogin.check()
    }
    $("u").parentNode.className = "inputOuter"
  },
  u_mouseover: function() {
    var a = $("u").parentNode;
    if (a.className == "inputOuter_focus") {} else {
      $("u").parentNode.className = "inputOuter_hover"
    }
  },
  u_mouseout: function() {
    var a = $("u").parentNode;
    if (a.className == "inputOuter_focus") {} else {
      $("u").parentNode.className = "inputOuter"
    }
  },
  window_blur: function() {
    pt.plogin.lastCheckAccount = ""
  },
  u_change: function() {
    pt.plogin.set_account();
    pt.plogin.passwordErrorNum = 1;
    pt.plogin.hasCheck = false;
    pt.plogin.hasSubmit = false
  },
  list_keydown: function(j, g) {
    var f = $("email_list");
    var d = $("u");
    if (g == 1) {
      var f = $("combox_list")
    }
    var h = f.getElementsByTagName("li");
    var b = h.length;
    var a = j.keyCode;
    switch (a) {
      case pt.plogin.keyCode.UP:
        h[pt.plogin.list_index[g]].className = "";
        pt.plogin.list_index[g] = (pt.plogin.list_index[g] - 1 + b) % b;
        h[pt.plogin.list_index[g]].className = "hover";
        break;
      case pt.plogin.keyCode.DOWN:
        h[pt.plogin.list_index[g]].className = "";
        pt.plogin.list_index[g] = (pt.plogin.list_index[g] + 1) % b;
        h[pt.plogin.list_index[g]].className = "hover";
        break;
      case pt.plogin.keyCode.ENTER:
        var c = h[pt.plogin.list_index[g]].innerHTML;
        if (g == 0) {
          $("u").value = $.str.decodeHtml(c)
        }
        pt.plogin.hideEmailTips();
        pt.plogin.hideLowList();
        j.preventDefault();
        break;
      case pt.plogin.keyCode.TAB:
        pt.plogin.hideEmailTips();
        pt.plogin.hideLowList();
        break;
      default:
        break
    }
    if (g == 1) {
      $("combox_box").innerHTML = h[pt.plogin.list_index[g]].innerHTML;
      $("low_login_hour").value = h[pt.plogin.list_index[g]].getAttribute("value")
    }
  },
  u_keydown: function(a) {
    $.css.hide($("uin_tips"));
    if (pt.plogin.list_index[0] == -1) {
      return
    }
    pt.plogin.list_keydown(a, 0)
  },
  u_keyup: function(b) {
    var c = this.value;
    if (c == "") {
      $.css.show($("uin_tips"));
      $("uin_tips").className = "input_tips_focus";
      $.css.hide($("uin_del"))
    } else {
      $.css.show($("uin_del"))
    }
    var a = b.keyCode;
    if (a != pt.plogin.keyCode.UP && a != pt.plogin.keyCode.DOWN && a != pt.plogin.keyCode.ENTER && a != pt.plogin.keyCode.TAB && a != pt.plogin.keyCode.F5) {
      if ($("u").value.indexOf("@") > -1) {
        pt.plogin.showEmailTips();
        pt.plogin.createEmailTips($("u").value)
      } else {
        pt.plogin.hideEmailTips()
      }
    }
  },
  email_mousemove: function(c) {
    var b = c.target;
    if (b.tagName.toLowerCase() != "li") {
      return
    }
    var a = $("emailTips_" + pt.plogin.list_index[0]);
    if (a) {
      a.className = ""
    }
    b.className = "hover";
    pt.plogin.list_index[0] = parseInt(b.getAttribute("id").substring(10));
    c.stopPropagation()
  },
  email_click: function(c) {
    var b = c.target;
    if (b.tagName.toLowerCase() != "li") {
      return
    }
    var a = $("emailTips_" + pt.plogin.list_index[0]);
    if (a) {
      $("u").value = $.str.decodeHtml(a.innerHTML);
      pt.plogin.set_account();
      pt.plogin.check()
    }
    pt.plogin.hideEmailTips();
    c.stopPropagation()
  },
  p_focus: function() {
    if (this.value == "") {
      $.css.show($("pwd_tips"));
      $("pwd_tips").className = "input_tips_focus"
    }
    this.parentNode.className = "inputOuter_focus";
    pt.plogin.check()
  },
  p_blur: function() {
    if (this.value == "") {
      $.css.show($("pwd_tips"));
      $("pwd_tips").className = "input_tips"
    }
    $.css.hide($("caps_lock_tips"));
    this.parentNode.className = "inputOuter"
  },
  p_mouseover: function() {
    var a = $("p").parentNode;
    if (a.className == "inputOuter_focus") {} else {
      $("p").parentNode.className = "inputOuter_hover"
    }
  },
  p_mouseout: function() {
    var a = $("p").parentNode;
    if (a.className == "inputOuter_focus") {} else {
      $("p").parentNode.className = "inputOuter"
    }
  },
  p_keydown: function(a) {
    $.css.hide($("pwd_tips"))
  },
  p_keyup: function() {
    if (this.value == "") {
      $.css.show($("pwd_tips"))
    }
  },
  p_keypress: function(a) {
    if (pt.plogin.detectCapsLock(a)) {
      $.css.show($("caps_lock_tips"))
    } else {
      $.css.hide($("caps_lock_tips"))
    }
  },
  vc_focus: function() {
    if (this.value == "") {
      $.css.show($("vc_tips"));
      $("vc_tips").className = "input_tips_focus"
    }
    this.parentNode.className = "inputOuter_focus"
  },
  vc_blur: function() {
    if (this.value == "") {
      $.css.show($("vc_tips"));
      $("vc_tips").className = "input_tips"
    }
    this.parentNode.className = "inputOuter"
  },
  vc_keydown: function() {
    $.css.hide($("vc_tips"))
  },
  vc_keyup: function() {
    if (this.value == "") {
      $.css.show($("vc_tips"))
    }
  },
  document_click: function() {
    pt.plogin.action[0]++;
    pt.plogin.hideEmailTips();
    pt.plogin.hideLowList()
  },
  document_keydown: function() {
    pt.plogin.action[1]++
  },
  checkbox_click: function() {
    if (!pt.plogin.low_login_enable) {
      $("q_low_login_enable").className = "checked";
      $("p_low_login_enable").className = "checked"
    } else {
      $("q_low_login_enable").className = "uncheck";
      $("p_low_login_enable").className = "uncheck"
    }
    pt.plogin.low_login_enable = !pt.plogin.low_login_enable
  },
  feedback: function(d) {
    var c = d ? d.target : null;
    var a = c ? c.id + "-" : "";
    var b = "http://support.qq.com/write.shtml?guest=1&fid=713&SSTAG=hailunna-" + a + $.str.encodeHtml(pt.plogin.account);
    window.open(b)
  },
  bind_account: function() {
    $.css.hide($("operate_tips"));
    pt.plogin.need_hide_operate_tips = true;
    window.open("http://id.qq.com/index.html#account");
    $.report.monitor("234964")
  },
  combox_click: function(a) {
    if (pt.plogin.low_login_isshow) {
      pt.plogin.hideLowList()
    } else {
      pt.plogin.showLowList()
    }
    a.stopPropagation()
  },
  delUin: function(a) {
    a && $.css.hide(a.target);
    $("u").value = "";
    pt.plogin.domFocus($("u"));
    pt.plogin.hasCheck = false
  },
  check_cdn_img: function() {
    if (!window.g_cdn_js_fail || pt.ptui.isHttps) {
      return
    }
    var a = new Image();
    a.onload = function() {
      a.onload = a.onerror = null
    };
    a.onerror = function() {
      a.onload = a.onerror = null;
      var d = $("main_css").innerHTML;
      var b = "http://imgcache.qq.com/ptlogin/v4/style/";
      var c = "http://ui.ptlogin2.qq.com/style/";
      d = d.replace(new RegExp(b, "g"), c);
      pt.plogin.insertInlineCss(d);
      $.report.monitor(312520)
    };
    a.src = "http://imgcache.qq.com/ptlogin/v4/style/11/images/icon_3.png"
  },
  insertInlineCss: function(a) {
    if (document.createStyleSheet) {
      var c = document.createStyleSheet("");
      c.cssText = a
    } else {
      var b = document.createElement("style");
      b.type = "text/css";
      b.textContent = a;
      document.getElementsByTagName("head")[0].appendChild(b)
    }
  },
  createLink: function(a) {
    var b = document.createElement("link");
    b.setAttribute("type", "text/css");
    b.setAttribute("rel", "stylesheet");
    b.setAttribute("href", a);
    document.getElementsByTagName("head")[0].appendChild(b)
  },
  domLoad: function(b) {
    if (pt.plogin.hasDomLoad) {
      return
    } else {
      pt.plogin.hasDomLoad = true
    }
    pt.plogin.begin_qrlogin();
    pt.qlogin.initFace();
    pt.plogin.loadQrTipsPic(pt.ptui.lang);
    var a = $("loading_img");
    if (a) {
      a.setAttribute("src", a.getAttribute("place_src"))
    }
    pt.plogin.check_cdn_img();
    setTimeout(function() {
      pt.plogin.ptui_notifySize("login")
    }, 0);
    $.report.monitor("373507&union=256042", 0.05);
    pt.plogin.webLoginReport();
    pt.plogin.monitorQQNum();
    pt.plogin.aq_patch();
    pt.plogin.gzipReport()
  },
  gzipReport: function() {
    if (pt.ptui.gzipEnable == "1" || pt.ptui.isHttps || pt.plogin.isUIStyle) {
      return
    } else {
      $.report.monitor("455847");
      var b = $.http.getXHR();
      if (b) {
        var c = "get";
        var a = "/cgi-bin/xver?t=" + Math.random();
        b.open(c, a);
        b.onreadystatechange = function() {
          if (b.readyState == 4) {
            if ((b.status >= 200 && b.status < 300) || b.status === 304 || b.status === 1223 || b.status === 0) {
              var d = document.createElement("script");
              d.innerHTML = b.responseText;
              document.getElementsByTagName("head")[0].appendChild(d);
              if (!window._gz) {
                $.report.nlog("gzip探测异常，返回内容：" + b.responseText + "返回码：" + b.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
              } else {}
            } else {
              $.report.nlog("gzip探测异常，返回内容：" + b.responseText + "返回码：" + b.status + "uin=" + $.cookie.get("pt2gguin"), "462348")
            }
          }
        };
        b.send()
      }
    }
  },
  monitorQQNum: function() {
    var a = $.loginQQnum;
    switch (a) {
      case 0:
        $.report.monitor("330314", 0.05);
        break;
      case 1:
        $.report.monitor("330315", 0.05);
        break;
      case 2:
        $.report.monitor("330316", 0.05);
        break;
      case 3:
        $.report.monitor("330317", 0.05);
        break;
      case 4:
        $.report.monitor("330318", 0.05);
        break;
      default:
        $.report.monitor("330319", 0.05);
        break
    }
  },
  noscript_err: function() {
    $.report.nlog("noscript_err", 316648);
    $("noscript_area").style.display = "none"
  },
  bindEvent: function() {
    var domU = $("u");
    var domP = $("p");
    var domVerifycode = $("verifycode");
    var domVC = $("verifyimgArea");
    var domBtn = $("login_button");
    var domCheckBox_p = $("p_low_login_box");
    var domCheckBox_q = $("q_low_login_box");
    var domEmailList = $("email_list");
    var domFeedback_web = $("feedback_web");
    var domFeedback_qr = $("feedback_qr");
    var domFeedback_qlogin = $("feedback_qlogin");
    var domClose = $("close");
    var domQloginSwitch = $("switcher_qlogin");
    var domLoginSwitch = $("switcher_plogin");
    var domDelUin = $("uin_del");
    var domBindAccount = $("bind_account");
    var domCancleAuth = $("cancleAuth");
    var domAuthClose = $("authClose");
    var domAuthArea = $("auth_area");
    var domAuthCheckBox = $("auth_low_login_enable");
    var domQr_invalid = $("qr_invalid");
    var domGoback = $("goBack");
    var domQr_img_box = $("qr_img_box");
    var domQr_img = $("qr_img");
    var domQr_info_link = $("qr_info_link");
    var domAgreeMent = $("userAgree_checkbox");
    if (domAgreeMent) {
      $.e.add(domAgreeMent, "click", function(e) {
        alert("亲爱的玩家，您如果不同意用户协议，是不能登录的哦")
      })
    }
    if (domQr_info_link) {
      $.e.add(domQr_img, "click", function(e) {
        $.report.monitor("331287", 0.05)
      })
    }
    if (domQr_img) {
      $.e.add(domQr_img, "load", pt.plogin.qr_load);
      $.e.add(domQr_img, "error", pt.plogin.qr_error)
    }
    if (domQr_img_box) {
      $.e.add(domQr_img_box, "mouseover", pt.plogin.showQrTips);
      $.e.add(domQr_img_box, "mouseout", pt.plogin.hideQrTips)
    }
    if (domGoback) {
      $.e.add(domGoback, "click", function(e) {
        e.preventDefault();
        pt.plogin.go_qrlogin_step(1);
        $.report.monitor("331288", 0.05)
      })
    }
    if (domQr_invalid) {
      $.e.add(domQr_invalid, "click", pt.plogin.begin_qrlogin)
    }
    if (domAuthArea) {
      $.e.add(domAuthArea, "click", pt.plogin.authLogin);
      $.e.add(domAuthArea, "mousedown", pt.plogin.authMouseDowm);
      $.e.add(domAuthArea, "mouseup", pt.plogin.authMouseUp)
    }
    if (domCancleAuth) {}
    if (domAuthClose) {
      $.e.add(domAuthClose, "click", pt.plogin.ptui_notifyClose)
    }
    if (domQloginSwitch) {
      $.e.add(domQloginSwitch, "click", function(e) {
        pt.plogin.switchpage(pt.LoginState.QLogin);
        $.report.monitor("331284", 0.05);
        e.preventDefault()
      })
    }
    if (domLoginSwitch) {
      $.e.add(domLoginSwitch, "click", function(e) {
        e.preventDefault();
        pt.plogin.switchpage(pt.LoginState.PLogin);
        $.report.monitor("331285", 0.05)
      })
    }
    if (domBindAccount) {
      $.e.add(domBindAccount, "click", pt.plogin.bind_account);
      $.e.add(domBindAccount, "mouseover", function(e) {
        pt.plogin.need_hide_operate_tips = false
      });
      $.e.add(domBindAccount, "mouseout", function(e) {
        pt.plogin.need_hide_operate_tips = true
      })
    }
    if (domClose) {
      $.e.add(domClose, "click", pt.plogin.ptui_notifyClose)
    }
    if (pt.ptui.low_login == 1 && domCheckBox_p && domCheckBox_q) {
      $.e.add(domCheckBox_p, "click", pt.plogin.checkbox_click);
      $.e.add(domCheckBox_q, "click", pt.plogin.checkbox_click)
    }
    if (pt.ptui.low_login == 1 && domAuthCheckBox) {
      $.e.add(domAuthCheckBox, "click", pt.plogin.checkbox_click);
      $.e.add(domAuthCheckBox, "click", pt.plogin.checkbox_click)
    }
    if (pt.plogin.ios8) {
      domP.focus = domU.focus = function() {}
    }
    $.e.add(domU, "focus", pt.plogin.u_focus);
    $.e.add(domU, "blur", pt.plogin.u_blur);
    $.e.add(domU, "change", pt.plogin.u_change);
    $.e.add(domU, "keydown", pt.plogin.u_keydown);
    $.e.add(domU, "keyup", pt.plogin.u_keyup);
    $.e.add(domU.parentNode, "mouseover", pt.plogin.u_mouseover);
    $.e.add(domU.parentNode, "mouseout", pt.plogin.u_mouseout);
    $.e.add(domDelUin, "click", pt.plogin.delUin);
    $.e.add(domP, "focus", pt.plogin.p_focus);
    $.e.add(domP, "blur", pt.plogin.p_blur);
    $.e.add(domP, "keydown", pt.plogin.p_keydown);
    $.e.add(domP, "keyup", pt.plogin.p_keyup);
    $.e.add(domP, "keypress", pt.plogin.p_keypress);
    $.e.add(domP.parentNode, "mouseover", pt.plogin.p_mouseover);
    $.e.add(domP.parentNode, "mouseout", pt.plogin.p_mouseout);
    $.e.add(domBtn, "click", function(e) {
      e && e.preventDefault();
      if (pt.plogin.needShowNewVc == true) {
        pt.plogin.showVC()
      } else {
        pt.plogin.submit(e)
      }
    });
    $.e.add(domVC, "click", pt.plogin.changeVC);
    $.e.add(domEmailList, "mousemove", pt.plogin.email_mousemove);
    $.e.add(domEmailList, "click", pt.plogin.email_click);
    $.e.add(document, "click", pt.plogin.document_click);
    $.e.add(document, "keydown", pt.plogin.document_keydown);
    $.e.add(domVerifycode, "focus", pt.plogin.vc_focus);
    $.e.add(domVerifycode, "blur", pt.plogin.vc_blur);
    $.e.add(domVerifycode, "keydown", pt.plogin.vc_keydown);
    $.e.add(domVerifycode, "keyup", pt.plogin.vc_keyup);
    $.e.add(window, "load", pt.plogin.domLoad);
    $.e.add(window, "message", function(e) {
      var origin = e.origin;
      if (origin == (pt.ptui.isHttps ? "https://ssl." : "http://") + "captcha.qq.com") {
        var data = e.data;
        if (window.JSON) {
          data = JSON.parse(data)
        } else {
          data = eval("(" + data + ")")
        }
        msgCB(data)
      }
    });
    navigator.captcha_callback = msgCB;

    function msgCB(data) {
      var type = data.type;
      switch (type + "") {
        case "1":
          pt.plogin.vcodeMessage(data);
          break;
        case "2":
          pt.plogin.hideVC();
          break
      }
    }
    var noscript_img = $("noscript_img");
    if (noscript_img) {
      $.e.add(noscript_img, "load", pt.plogin.noscript_err);
      $.e.add(noscript_img, "error", pt.plogin.noscript_err)
    }
  },
  vcodeMessage: function(a) {
    if (!a.randstr || !a.sig) {
      $.report.nlog("vcode postMessage error：" + e.data)
    }
    $("verifycode").value = a.randstr;
    pt.plogin.pt_verifysession = a.sig;
    pt.plogin.hideVC();
    pt.plogin.submit()
  },
  showNewVC: function() {
    var a = pt.plogin.getNewVCUrl();
    var b = $("newVcodeArea");
    b.style.cssText = "background: none #FFFFFF; position: absolute; top: 20px; width: 100%; z-index:9999;";
    b.style.height = ($("login").offsetHeight - b.offsetTop - 2) + "px";
    b.innerHTML = '<iframe name="vcode" allowtransparency="true" scrolling="no" frameborder="0" width="100%" height="100%" src="' + a + '">';
    $.css.show(b)
  },
  hideNewVC: function() {
    $("newVcodeArea") && $.css.hide($("newVcodeArea"))
  },
  changeNewVC: function() {
    pt.plogin.showNewVC()
  },
  showVC: function() {
    pt.plogin.vcFlag = true;
    if (pt.ptui.pt_vcode_v1 == "1") {
      pt.plogin.showNewVC()
    } else {
      $.css.show($("verifyArea"));
      $("verifycode").value = "";
      $("verifyimg").src = pt.plogin.getVCUrl()
    }
    pt.plogin.ptui_notifySize("login")
  },
  hideVC: function() {
    pt.plogin.vcFlag = false;
    if (pt.ptui.pt_vcode_v1 == "1") {
      pt.plogin.hideNewVC()
    } else {
      $.css.hide($("verifyArea"))
    }
    pt.plogin.ptui_notifySize("login")
  },
  changeVC: function(a) {
    a && a.preventDefault();
    if (pt.ptui.pt_vcode_v1 == "1") {
      pt.plogin.changeNewVC()
    } else {
      $("verifyimg").src = pt.plogin.getVCUrl()
    }
    a && $.report.monitor("330322", 0.05)
  },
  getVCUrl: function() {
    var d = pt.plogin.at_account;
    var c = pt.ptui.domain;
    var b = pt.ptui.appid;
    var a = pt.plogin.verifycodeUrl + "?uin=" + d + "&aid=" + b + "&cap_cd=" + pt.plogin.cap_cd + "&" + Math.random();
    return a
  },
  getNewVCUrl: function() {
    var d = pt.plogin.at_account;
    var c = pt.ptui.domain;
    var b = pt.ptui.appid;
    var a = pt.plogin.newVerifycodeUrl + "&uin=" + d + "&aid=" + b + "&cap_cd=" + pt.plogin.cap_cd + "&" + Math.random();
    return a
  },
  checkValidate: function(b) {
    try {
      var a = b.u;
      var d = b.p;
      var f = b.verifycode;
      if ($.str.trim(a.value) == "") {
        pt.plogin.show_err(pt.str.no_uin);
        pt.plogin.domFocus(a);
        return false
      }
      if ($.check.isNullQQ(a.value)) {
        pt.plogin.show_err(pt.str.inv_uin);
        pt.plogin.domFocus(a);
        return false
      }
      if (d.value == "") {
        pt.plogin.show_err(pt.str.no_pwd);
        pt.plogin.domFocus(d);
        return false
      }
      if (f.value == "") {
        if (!pt.plogin.needVc && !pt.plogin.vcFlag) {
          pt.plogin.checkResultReport(14);
          clearTimeout(pt.plogin.checkClock);
          pt.plogin.showVC()
        } else {
          pt.plogin.show_err(pt.str.no_vcode);
          pt.plogin.domFocus(f)
        }
        return false
      }
      if (f.value.length < 4) {
        pt.plogin.show_err(pt.str.inv_vcode);
        pt.plogin.domFocus(f);
        f.select();
        return false
      }
    } catch (c) {}
    return true
  },
  checkTimeout: function() {
    var a = $.str.trim($("u").value);
    if ($.check.isQQ(a) || $.check.isQQMail(a)) {
      pt.plogin.cap_cd = 0;
      pt.plogin.salt = $.str.uin2hex(a.replace("@qq.com", ""));
      pt.plogin.needVc = true;
      if (pt.ptui.pt_vcode_v1 == "1") {
        pt.plogin.needShowNewVc = true
      } else {
        pt.plogin.showVC()
      }
      pt.plogin.isCheckTimeout = true;
      pt.plogin.checkRet = 1;
      pt.plogin.cntCheckTimeout++
    }
    $.report.monitor(216082)
  },
  loginTimeout: function() {
    pt.plogin.showAssistant(2)
  },
  check: function(b) {
    if (!pt.plogin.account) {
      pt.plogin.set_account()
    }
    if ($.check.isNullQQ(pt.plogin.account)) {
      pt.plogin.show_err(pt.str.inv_uin);
      return false
    }
    if (pt.plogin.account == pt.plogin.lastCheckAccount || pt.plogin.account == "") {
      return
    }
    pt.plogin.lastCheckAccount = pt.plogin.account;
    var c = pt.ptui.appid;
    var a = pt.plogin.getCheckUrl(pt.plogin.at_account, c);
    pt.plogin.isCheckTimeout = false;
    clearTimeout(pt.plogin.checkClock);
    pt.plogin.checkClock = setTimeout("pt.plogin.checkTimeout();", 5000);
    $.http.loadScript(a);
    pt.plogin.check.cb = b
  },
  getCheckUrl: function(b, c) {
    var a = pt.plogin.checkUrl + "?regmaster=" + pt.ptui.regmaster + "&pt_tea=1&pt_vcode=" + pt.ptui.pt_vcode_v1 + "&";
    a += "uin=" + b + "&appid=" + c + "&js_ver=" + pt.ptui.ptui_version + "&js_type=" + pt.plogin.js_type + "&login_sig=" + pt.ptui.login_sig + "&u1=" + encodeURIComponent(pt.ptui.s_url) + "&r=" + Math.random();
    return a
  },
  getSubmitUrl: function(b) {
    var a = pt.plogin.loginUrl + b + "?";
    var d = {};
    if (b == "login") {
      d.u = encodeURIComponent(pt.plogin.at_account);
      d.verifycode = $("verifycode").value;
      if (pt.plogin.needShowNewVc) {
        d.pt_vcode_v1 = 1
      } else {
        d.pt_vcode_v1 = 0
      }
      d.pt_verifysession_v1 = pt.plogin.pt_verifysession || $.cookie.get("verifysession");
      d.p = $.Encryption.getEncryption($("p").value, pt.plogin.salt, d.verifycode);
      d.pt_randsalt = pt.plogin.isRandSalt || 0
    }
    d.ptredirect = pt.ptui.target;
    d.u1 = encodeURIComponent(pt.ptui.s_url);
    d.h = 1;
    d.t = 1;
    d.g = 1;
    d.from_ui = 1;
    d.ptlang = pt.ptui.lang;
    d.action = pt.plogin.action.join("-") + "-" + (new Date() - 0);
    d.js_ver = pt.ptui.ptui_version;
    d.js_type = pt.plogin.js_type;
    d.login_sig = pt.ptui.login_sig;
    d.pt_uistyle = pt.ptui.style;
    if (pt.ptui.low_login == 1 && pt.plogin.low_login_enable) {
      d.low_login_enable = 1;
      d.low_login_hour = pt.plogin.low_login_hour
    }
    if (pt.ptui.csimc != "0") {
      d.csimc = pt.ptui.csimc;
      d.csnum = pt.ptui.csnum;
      d.authid = pt.ptui.authid
    }
    d.aid = pt.ptui.appid;
    if (pt.ptui.daid) {
      d.daid = pt.ptui.daid
    }
    if (pt.ptui.pt_3rd_aid != "0") {
      d.pt_3rd_aid = pt.ptui.pt_3rd_aid
    }
    if (pt.ptui.regmaster) {
      d.regmaster = pt.ptui.regmaster
    }
    if (pt.ptui.mibao_css) {
      d.mibao_css = pt.ptui.mibao_css
    }
    if (pt.ptui.pt_qzone_sig == "1") {
      d.pt_qzone_sig = 1
    }
    if (pt.ptui.pt_light == "1") {
      d.pt_light = 1
    }
    for (var c in d) {
      a += (c + "=" + d[c] + "&")
    }
    return a
  },
  submit: function(a) {
    if (pt.plogin.cntCheckTimeout >= 2) {
      pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]);
      pt.plogin.needVc = false;
      pt.plogin.needShowNewVc = false;
      return
    }
    a && a.preventDefault();
    if (pt.plogin.lastCheckAccount != pt.plogin.account && !pt.plogin.hasCheck) {
      pt.plogin.check(arguments.callee);
      return
    }
    if (!pt.plogin.ptui_onLogin(document.loginform)) {
      return false
    } else {
      $.cookie.set("ptui_loginuin", escape(document.loginform.u.value), pt.ptui.domain, "/", 24 * 30)
    }
    if (pt.plogin.checkRet == -1 || pt.plogin.checkRet == 3) {
      pt.plogin.show_err(pt.plogin.checkErr[pt.ptui.lang]);
      pt.plogin.lastCheckAccount = "";
      pt.plogin.domFocus($("p"));
      return
    }
    clearTimeout(pt.plogin.loginClock);
    pt.plogin.loginClock = setTimeout("pt.plogin.loginTimeout();", 5000);
    var b = pt.plogin.getSubmitUrl("login");
    $.winName.set("login_href", encodeURIComponent(pt.ptui.href));
    pt.plogin.showLoading();
    $.http.loadScript(b);
    return false
  },
  webLoginReport: function() {
    window.setTimeout(function() {
      try {
        var d = ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"];
        var g = {};
        var c = window.performance ? window.performance.timing : null;
        if (c) {
          var h = c[d[0]];
          for (var b = 1, a = d.length; b < a; b++) {
            if (c[d[b]]) {
              g[b] = c[d[b]] - h
            }
          }
          if (loadJs && loadJs.onloadTime) {
            g[b++] = loadJs.onloadTime - h
          }
          if ((c.domContentLoadedEventEnd - c.navigationStart > pt.plogin.delayTime) && c.navigationStart > 0) {
            $.report.nlog("访问ui延时超过" + pt.plogin.delayTime / 1000 + "s:delay=" + (c.domContentLoadedEventEnd - c.navigationStart) + ";domContentLoadedEventEnd=" + c.domContentLoadedEventEnd + ";navigationStart=" + c.navigationStart + ";clientip=" + pt.ptui.clientip + ";serverip=" + pt.ptui.serverip, pt.plogin.delayMonitorId, 1)
          }
          if (c.connectStart <= c.connectEnd && c.responseStart <= c.responseEnd) {
            pt.plogin.ptui_speedReport(g)
          }
        }
      } catch (f) {}
    }, 1000)
  },
  ptui_speedReport: function(d) {
    if ($.browser("type") != "msie" && $.browser("type") != "webkit") {
      return
    }
    var b = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=1";
    if (pt.ptui.isHttps) {
      if (Math.random() > 1) {
        return
      }
      if ($.browser("type") == "msie") {
        if ($.check.isSsl()) {
          b = "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=3"
        } else {
          b = "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=2"
        }
      } else {
        if ($.check.isSsl()) {
          b = "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=6"
        } else {
          b = "https://login.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=5"
        }
      }
    } else {
      if (Math.random() > 0.2) {
        return
      }
      if ($.browser("type") == "msie") {
        b = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=1"
      } else {
        b = "http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7808&flag2=4&flag3=4"
      }
    }
    for (var c in d) {
      if (d[c] > 15000 || d[c] < 0) {
        continue
      }
      b += "&" + c + "=" + d[c] || 1
    }
    var a = new Image();
    a.src = b
  },
  resultReport: function(b, a, f) {
    var d = "http://isdspeed.qq.com/cgi-bin/v.cgi?flag1=" + b + "&flag2=" + a + "&flag3=" + f;
    var c = new Image();
    c.src = d
  },
  crossMessage: function(b) {
    if (pt.plogin.isUIStyle) {
      pt.plogin.uistyleCM(b)
    }
    if (typeof window.postMessage != "undefined") {
      window.parent.postMessage($.str.json2str(b), "*")
    } else {
      if (!pt.ptui.proxy_url) {
        try {
          navigator.ptlogin_callback($.str.json2str(b))
        } catch (c) {
          $.report.nlog("ptlogin_callback " + c.message)
        }
      } else {
        var d = pt.ptui.proxy_url + "#";
        for (var a in b) {
          d += (a + "=" + b[a] + "&")
        }
        $("proxy") && ($("proxy").innerHTML = '<iframe src="' + encodeURI(d) + '"></iframe>')
      }
    }
  },
  uistyleCM: function(c) {
    var f = /^https:\/\/ssl./.test(location.href);
    var d = encodeURIComponent($.str.json2str(c));
    var a = document.location.protocol + "//" + (f ? "ssl." : "") + "ui.ptlogin2." + pt.ptui.domain + "/cross_proxy.html#" + d;
    var b = $("proxy");
    if (b) {
      b.innerHTML = '<iframe  allowtransparency="true" scrolling="no" frameborder="0" width="1" height="1" src="' + a + '">'
    }
  },
  ptui_notifyClose: function(a) {
    a && a.preventDefault();
    var b = {};
    b.action = "close";
    pt.plogin.crossMessage(b);
    pt.plogin.set_qrlogin_invalid()
  },
  ptui_notifySize: function(c) {
    var b = $(c);
    var a = {};
    a.action = "resize";
    a.width = b.offsetWidth || 1;
    a.height = b.offsetHeight || 1;
    pt.__cache = pt.__cache || {
      resize: {
        w: 0,
        h: 0
      }
    };
    if (pt.__cache.resize.w == a.width && pt.__cache.resize.h == a.height) {
      return
    }
    pt.__cache.resize = {
      w: a.width,
      h: a.height
    };
    pt.plogin.crossMessage(a)
  },
  ptui_onLogin: function(b) {
    var a = true;
    a = pt.plogin.checkValidate(b);
    return a
  },
  ptui_uin: function(a) {},
  is_mibao: function(a) {
    return /^http(s)?:\/\/(ssl\.)?ui.ptlogin2.(\S)+\/cgi-bin\/mibao_vry/.test(a)
  },
  get_qrlogin_pic: function() {
    var c = "ptqrshow";
    var b = pt.ptui.isHttps ? "https://ssl." : "http://";
    var a = b + "ptlogin2." + pt.ptui.domain + "/" + c + "?";
    if (pt.ptui.regmaster == 2) {
      a = "http://ptlogin2.function.qq.com/" + c + "?regmaster=2&"
    } else {
      if (pt.ptui.regmaster == 3) {
        a = "http://ptlogin2.crm2.qq.com/" + c + "?regmaster=3&"
      } else {
        if (pt.ptui.regmaster == 4) {
          a = "https://ssl.ptlogin2.mail.qq.com/" + c + "?regmaster=4&"
        } else {
          if (pt.ptui.regmaster == 5) {
            a = b + "ptlogin2.mp.qq.com/" + c + "?regmaster=5&"
          }
        }
      }
    }
    a += "appid=" + pt.ptui.appid + "&e=2&l=M&s=4&d=72&v=4&t=" + Math.random();
    if (pt.ptui.daid) {
      a += "&daid=" + pt.ptui.daid
    }
    return a
  },
  go_qrlogin_step: function(a) {
    switch (a) {
      case 1:
        pt.plogin.begin_qrlogin();
        $.css.hide($("qrlogin_step2"));
        if (pt.plogin.loginState == pt.LoginState.PLogin) {
          $("q_low_login_box") && $.css.hide($("q_low_login_box"))
        } else {
          $("q_low_login_box") && $.css.show($("q_low_login_box"))
        }
        break;
      case 2:
        $("qrlogin_step2").style.height = ($("login").offsetHeight - 10) + "px";
        $.css.show($("qrlogin_step2"));
        $("q_low_login_box") && $.css.hide($("q_low_login_box"));
        break;
      default:
        break
    }
  },
  begin_qrlogin: function() {
    pt.plogin.cancle_qrlogin();
    $.css.hide($("qr_invalid"));
    $("qr_img").src = pt.plogin.get_qrlogin_pic();
    pt.plogin.qrlogin_clock = window.setInterval("pt.plogin.qrlogin_submit();", 3000);
    pt.plogin.qrlogin_timeout = window.setTimeout(function() {
      pt.plogin.set_qrlogin_invalid()
    }, pt.plogin.qrlogin_timeout_time)
  },
  cancle_qrlogin: function() {
    window.clearInterval(pt.plogin.qrlogin_clock);
    window.clearTimeout(pt.plogin.qrlogin_timeout)
  },
  set_qrlogin_invalid: function() {
    pt.plogin.cancle_qrlogin();
    $.css.show($("qr_invalid"))
  },
  loadQrTipsPic: function(b) {
    var a = $("qr_tips_pic");
    var d = "chs";
    switch (b + "") {
      case "2052":
        d = "chs";
        break;
      case "1033":
        d = "en";
        break;
      case "1028":
        d = "cht";
        break
    }
    $.css.addClass(a, "qr_tips_pic_" + d)
  },
  showQrTips: function() {
    $.css.show($("qr_tips"));
    $("qr_tips_pic").style.opacity = 0;
    $("qr_tips_pic").style.filter = "alpha(opacity=0)";
    $("qr_tips_menban").className = "qr_tips_menban";
    $.animate.fade("qr_tips_pic", 100, 2, 20);
    pt.plogin.hideQrTipsClock = window.setTimeout("pt.plogin.hideQrTips()", 5000);
    $.report.monitor("331286", 0.05)
  },
  hideQrTips: function() {
    window.clearTimeout(pt.plogin.hideQrTipsClock);
    $("qr_tips_menban").className = "";
    $.animate.fade("qr_tips_pic", 0, 5, 20, function() {
      $.css.hide($("qr_tips"))
    })
  },
  qr_load: function(a) {},
  qr_error: function(a) {
    pt.plogin.set_qrlogin_invalid()
  },
  qrlogin_submit: function() {
    var a = pt.plogin.getSubmitUrl("ptqrlogin");
    $.winName.set("login_href", encodeURIComponent(pt.ptui.href));
    $.http.loadScript(a);
    return
  },
  force_qrlogin: function() {},
  no_force_qrlogin: function() {},
  redirect: function(b, a) {
    switch (b + "") {
      case "0":
        location.href = a;
        break;
      case "1":
        top.location.href = a;
        break;
      case "2":
        parent.location.href = a;
        break;
      default:
        top.location.href = a
    }
  }
};
pt.plogin.auth();

function ptuiCB(h, k, b, g, d, a) {
  var j = pt.plogin.at_account && $("p").value;
  clearTimeout(pt.plogin.loginClock);

  function f() {
    if (pt.plogin.is_mibao(b)) {
      b += ("&style=" + pt.ptui.style + "&proxy_url=" + encodeURIComponent(pt.ptui.proxy_url));
      b += "#login_href=" + encodeURIComponent(pt.ptui.href)
    }
    pt.plogin.redirect(g, b)
  }
  if (j) {
    pt.plogin.lastCheckAccount = ""
  }
  pt.plogin.hasSubmit = true;
  var c = false;
  switch (h) {
    case "0":
      if (!j && !pt.plogin.is_mibao(b)) {
        window.clearInterval(pt.plogin.qrlogin_clock);
        f()
      } else {
        f()
      }
      break;
    case "3":
      $("p").value = "";
      pt.plogin.domFocus($("p"));
      pt.plogin.passwordErrorNum++;
      if (k == "101" || k == "102" || k == "103") {
        pt.plogin.showVC()
      }
      pt.plogin.check();
      break;
    case "4":
      pt.plogin.check();
      break;
    case "65":
      pt.plogin.set_qrlogin_invalid();
      return;
    case "66":
      return;
    case "67":
      pt.plogin.go_qrlogin_step(2);
      return;
    case "10005":
      pt.plogin.force_qrlogin();
    case "12":
    case "51":
      c = true;
      break;
    default:
      if (pt.plogin.needVc && !pt.plogin.needShowNewVc) {
        pt.plogin.changeVC()
      } else {
        pt.plogin.check()
      }
      break
  }
  if (h != 0 && j) {
    pt.plogin.show_err(d, c)
  }
  if (!pt.plogin.hasCheck && j) {
    if (!pt.plogin.needShowNewVc) {
      pt.plogin.showVC()
    }
    $("verifycode").focus();
    $("verifycode").select()
  }
}

function ptui_checkVC(a, d, b, f, c) {
  clearTimeout(pt.plogin.checkClock);
  pt.plogin.isRandSalt = c;
  pt.plogin.salt = b;
  pt.plogin.checkRet = a;
  if (a == "2") {
    (pt.plogin.loginState == pt.LoginState.PLogin) && pt.plogin.show_err(pt.str.inv_uin)
  } else {
    if (a == "3") {} else {
      if (!pt.plogin.hasSubmit) {}
    }
  }
  switch (a + "") {
    case "0":
    case "2":
    case "3":
      pt.plogin.hideVC();
      if (pt.ptui.pt_vcode_v1 == "1") {
        pt.plogin.needShowNewVc = false
      }
      $("verifycode").value = d || "abcd";
      pt.plogin.needVc = false;
      $.report.monitor("330321", 0.05);
      break;
    case "1":
      pt.plogin.cap_cd = d;
      if (pt.ptui.pt_vcode_v1 == "1") {
        pt.plogin.needShowNewVc = true
      } else {
        pt.plogin.showVC();
        $.css.show($("vc_tips"))
      }
      pt.plogin.needVc = true;
      $.report.monitor("330320", 0.05);
      break;
    default:
      break
  }
  pt.plogin.pt_verifysession = f;
  pt.plogin.domFocus($("p"));
  pt.plogin.hasCheck = true;
  pt.plogin.check.cb && pt.plogin.check.cb()
}

function ptui_auth_CB(c, b) {
  switch (parseInt(c)) {
    case 0:
      pt.plogin.authUin = $.cookie.get("superuin").replace(/^o0*/, "");
      pt.plogin.authSubmitUrl = b;
      pt.plogin.init(b);
      break;
    case 1:
      pt.plogin.init();
      break;
    case 2:
      var a = b + "&regmaster=" + pt.ptui.regmaster + "&aid=" + pt.ptui.appid + "&s_url=" + encodeURIComponent(pt.ptui.s_url);
      if (pt.ptui.pt_light == "1") {
        a += "&pt_light=1"
      }
      pt.plogin.redirect(pt.ptui.target, a);
      break;
    default:
      pt.preload.init()
  }
}; /*  |xGv00|59d8b714e5d17b31ee31bcc621fae22a */