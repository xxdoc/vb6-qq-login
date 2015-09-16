!window.console && (window.console = {
  log: function() {},
  warn: function() {},
  error: function() {}
});
var $ = window.Simple = function(a) {
  return typeof(a) == "string" ? document.getElementById(a) : a
};
$.cookie = {
  get: function(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    return !a ? "" : decodeURIComponent(a[2])
  },
  getOrigin: function(b) {
    var a = document.cookie.match(new RegExp("(^| )" + b + "=([^;]*)(;|$)"));
    return !a ? "" : (a[2])
  },
  set: function(c, f, d, g, a) {
    var b = new Date();
    if (a) {
      b.setTime(b.getTime() + 3600000 * a);
      document.cookie = c + "=" + f + "; expires=" + b.toGMTString() + "; path=" + (g ? g : "/") + "; " + (d ? ("domain=" + d + ";") : "")
    } else {
      document.cookie = c + "=" + f + "; path=" + (g ? g : "/") + "; " + (d ? ("domain=" + d + ";") : "")
    }
  },
  del: function(a, b, c) {
    document.cookie = a + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; path=" + (c ? c : "/") + "; " + (b ? ("domain=" + b + ";") : "")
  },
  uin: function() {
    var a = $.cookie.get("uin");
    return !a ? null : parseInt(a.substring(1, a.length), 10)
  }
};
$.http = {
  getXHR: function() {
    return window.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest()
  },
  ajax: function(url, para, cb, method, type) {
    var xhr = $.http.getXHR();
    xhr.open(method, url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304 || xhr.status === 1223 || xhr.status === 0) {
          if (typeof(type) == "undefined" && xhr.responseText) {
            cb(eval("(" + xhr.responseText + ")"))
          } else {
            cb(xhr.responseText);
            if ((!xhr.responseText) && $.badjs._smid) {
              $.badjs("HTTP Empty[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)
            }
          }
        } else {
          if ($.badjs._smid) {
            $.badjs("HTTP Error[xhr.status]:" + xhr.status, url, 0, $.badjs._smid)
          }
        }
        xhr = null
      }
    };
    xhr.send(para);
    return xhr
  },
  post: function(c, b, a, g) {
    var f = "";
    for (var d in b) {
      f += "&" + d + "=" + b[d]
    }
    return $.http.ajax(c, f, a, "POST", g)
  },
  get: function(c, b, a, f) {
    var g = [];
    for (var d in b) {
      g.push(d + "=" + b[d])
    }
    if (c.indexOf("?") == -1) {
      c += "?"
    }
    c += g.join("&");
    return $.http.ajax(c, null, a, "GET", f)
  },
  jsonp: function(a) {
    var b = document.createElement("script");
    b.src = a;
    document.getElementsByTagName("head")[0].appendChild(b)
  },
  loadScript: function(c, d, b) {
    var a = document.createElement("script");
    a.onload = a.onreadystatechange = function() {
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        if (typeof d == "function") {
          d()
        }
        a.onload = a.onreadystatechange = null;
        if (a.parentNode) {
          a.parentNode.removeChild(a)
        }
      }
    };
    a.src = c;
    document.getElementsByTagName("head")[0].appendChild(a)
  },
  preload: function(a) {
    var b = document.createElement("img");
    b.src = a;
    b = null
  }
};
$.get = $.http.get;
$.post = $.http.post;
$.jsonp = $.http.jsonp;
$.browser = function(b) {
  if (typeof $.browser.info == "undefined") {
    var a = {
      type: ""
    };
    var c = navigator.userAgent.toLowerCase();
    if (/webkit/.test(c)) {
      a = {
        type: "webkit",
        version: /webkit[\/ ]([\w.]+)/
      }
    } else {
      if (/opera/.test(c)) {
        a = {
          type: "opera",
          version: /version/.test(c) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/
        }
      } else {
        if (/msie/.test(c)) {
          a = {
            type: "msie",
            version: /msie ([\w.]+)/
          }
        } else {
          if (/mozilla/.test(c) && !/compatible/.test(c)) {
            a = {
              type: "ff",
              version: /rv:([\w.]+)/
            }
          }
        }
      }
    }
    a.version = (a.version && a.version.exec(c) || [0, "0"])[1];
    $.browser.info = a
  }
  return $.browser.info[b]
};
$.e = {
  _counter: 0,
  _uid: function() {
    return "h" + $.e._counter++
  },
  add: function(c, b, g) {
    if (typeof c != "object") {
      c = $(c)
    }
    if (document.addEventListener) {
      c.addEventListener(b, g, false)
    } else {
      if (document.attachEvent) {
        if ($.e._find(c, b, g) != -1) {
          return
        }
        var j = function(h) {
          if (!h) {
            h = window.event
          }
          var d = {
            _event: h,
            type: h.type,
            target: h.srcElement,
            currentTarget: c,
            relatedTarget: h.fromElement ? h.fromElement : h.toElement,
            eventPhase: (h.srcElement == c) ? 2 : 3,
            clientX: h.clientX,
            clientY: h.clientY,
            screenX: h.screenX,
            screenY: h.screenY,
            altKey: h.altKey,
            ctrlKey: h.ctrlKey,
            shiftKey: h.shiftKey,
            keyCode: h.keyCode,
            data: h.data,
            origin: h.origin,
            stopPropagation: function() {
              this._event.cancelBubble = true
            },
            preventDefault: function() {
              this._event.returnValue = false
            }
          };
          if (Function.prototype.call) {
            g.call(c, d)
          } else {
            c._currentHandler = g;
            c._currentHandler(d);
            c._currentHandler = null
          }
        };
        c.attachEvent("on" + b, j);
        var f = {
          element: c,
          eventType: b,
          handler: g,
          wrappedHandler: j
        };
        var k = c.document || c;
        var a = k.parentWindow;
        var l = $.e._uid();
        if (!a._allHandlers) {
          a._allHandlers = {}
        }
        a._allHandlers[l] = f;
        if (!c._handlers) {
          c._handlers = []
        }
        c._handlers.push(l);
        if (!a._onunloadHandlerRegistered) {
          a._onunloadHandlerRegistered = true;
          a.attachEvent("onunload", $.e._removeAllHandlers)
        }
      }
    }
  },
  remove: function(f, c, j) {
    if (document.addEventListener) {
      f.removeEventListener(c, j, false)
    } else {
      if (document.attachEvent) {
        var b = $.e._find(f, c, j);
        if (b == -1) {
          return
        }
        var l = f.document || f;
        var a = l.parentWindow;
        var k = f._handlers[b];
        var g = a._allHandlers[k];
        f.detachEvent("on" + c, g.wrappedHandler);
        f._handlers.splice(b, 1);
        delete a._allHandlers[k]
      }
    }
  },
  _find: function(f, a, m) {
    var b = f._handlers;
    if (!b) {
      return -1
    }
    var k = f.document || f;
    var l = k.parentWindow;
    for (var g = b.length - 1; g >= 0; g--) {
      var c = b[g];
      var j = l._allHandlers[c];
      if (j.eventType == a && j.handler == m) {
        return g
      }
    }
    return -1
  },
  _removeAllHandlers: function() {
    var a = this;
    for (id in a._allHandlers) {
      var b = a._allHandlers[id];
      b.element.detachEvent("on" + b.eventType, b.wrappedHandler);
      delete a._allHandlers[id]
    }
  },
  src: function(a) {
    return a ? a.target : event.srcElement
  },
  stopPropagation: function(a) {
    a ? a.stopPropagation() : event.cancelBubble = true
  },
  trigger: function(c, b) {
    var f = {
      HTMLEvents: "abort,blur,change,error,focus,load,reset,resize,scroll,select,submit,unload",
      UIEevents: "keydown,keypress,keyup",
      MouseEvents: "click,mousedown,mousemove,mouseout,mouseover,mouseup"
    };
    if (document.createEvent) {
      var d = "";
      (b == "mouseleave") && (b = "mouseout");
      (b == "mouseenter") && (b = "mouseover");
      for (var g in f) {
        if (f[g].indexOf(b)) {
          d = g;
          break
        }
      }
      var a = document.createEvent(d);
      a.initEvent(b, true, false);
      c.dispatchEvent(a)
    } else {
      if (document.createEventObject) {
        c.fireEvent("on" + b)
      }
    }
  }
};
$.bom = {
  query: function(b) {
    var a = window.location.search.match(new RegExp("(\\?|&)" + b + "=([^&]*)(&|$)"));
    return !a ? "" : decodeURIComponent(a[2])
  },
  getHash: function(b) {
    var a = window.location.hash.match(new RegExp("(#|&)" + b + "=([^&]*)(&|$)"));
    return !a ? "" : decodeURIComponent(a[2])
  }
};
$.winName = {
  set: function(c, a) {
    var b = window.name || "";
    if (b.match(new RegExp(";" + c + "=([^;]*)(;|$)"))) {
      window.name = b.replace(new RegExp(";" + c + "=([^;]*)"), ";" + c + "=" + a)
    } else {
      window.name = b + ";" + c + "=" + a
    }
  },
  get: function(c) {
    var b = window.name || "";
    var a = b.match(new RegExp(";" + c + "=([^;]*)(;|$)"));
    return a ? a[1] : ""
  },
  clear: function(b) {
    var a = window.name || "";
    window.name = a.replace(new RegExp(";" + b + "=([^;]*)"), "")
  }
};
$.localData = function() {
  var a = "ptlogin2.qq.com";
  var d = /^[0-9A-Za-z_-]*$/;
  var b;

  function c() {
    var h = document.createElement("link");
    h.style.display = "none";
    h.id = a;
    document.getElementsByTagName("head")[0].appendChild(h);
    h.addBehavior("#default#userdata");
    return h
  }

  function f() {
    if (typeof b == "undefined") {
      if (window.localStorage) {
        b = localStorage
      } else {
        try {
          b = c();
          b.load(a)
        } catch (h) {
          b = false;
          return false
        }
      }
    }
    return true
  }

  function g(h) {
    if (typeof h != "string") {
      return false
    }
    return d.test(h)
  }
  return {
    set: function(h, j) {
      var l = false;
      if (g(h) && f()) {
        try {
          j += "";
          if (window.localStorage) {
            b.setItem(h, j);
            l = true
          } else {
            b.setAttribute(h, j);
            b.save(a);
            l = b.getAttribute(h) === j
          }
        } catch (k) {}
      }
      return l
    },
    get: function(h) {
      if (g(h) && f()) {
        try {
          return window.localStorage ? b.getItem(h) : b.getAttribute(h)
        } catch (j) {}
      }
      return null
    },
    remove: function(h) {
      if (g(h) && f()) {
        try {
          window.localStorage ? b.removeItem(h) : b.removeAttribute(h);
          return true
        } catch (j) {}
      }
      return false
    }
  }
}();
$.str = (function() {
  var htmlDecodeDict = {
    quot: '"',
    lt: "<",
    gt: ">",
    amp: "&",
    nbsp: " ",
    "#34": '"',
    "#60": "<",
    "#62": ">",
    "#38": "&",
    "#160": " "
  };
  var htmlEncodeDict = {
    '"': "#34",
    "<": "#60",
    ">": "#62",
    "&": "#38",
    " ": "#160"
  };
  return {
    decodeHtml: function(s) {
      s += "";
      return s.replace(/&(quot|lt|gt|amp|nbsp);/ig, function(all, key) {
        return htmlDecodeDict[key]
      }).replace(/&#u([a-f\d]{4});/ig, function(all, hex) {
        return String.fromCharCode(parseInt("0x" + hex))
      }).replace(/&#(\d+);/ig, function(all, number) {
        return String.fromCharCode(+number)
      })
    },
    encodeHtml: function(s) {
      s += "";
      return s.replace(/["<>& ]/g, function(all) {
        return "&" + htmlEncodeDict[all] + ";"
      })
    },
    trim: function(str) {
      str += "";
      var str = str.replace(/^\s+/, ""),
        ws = /\s/,
        end = str.length;
      while (ws.test(str.charAt(--end))) {}
      return str.slice(0, end + 1)
    },
    uin2hex: function(str) {
      var maxLength = 16;
      str = parseInt(str);
      var hex = str.toString(16);
      var len = hex.length;
      for (var i = len; i < maxLength; i++) {
        hex = "0" + hex
      }
      var arr = [];
      for (var j = 0; j < maxLength; j += 2) {
        arr.push("\\x" + hex.substr(j, 2))
      }
      var result = arr.join("");
      eval('result="' + result + '"');
      return result
    },
    bin2String: function(a) {
      var arr = [];
      for (var i = 0, len = a.length; i < len; i++) {
        var temp = a.charCodeAt(i).toString(16);
        if (temp.length == 1) {
          temp = "0" + temp
        }
        arr.push(temp)
      }
      arr = "0x" + arr.join("");
      arr = parseInt(arr, 16);
      return arr
    },
    str2bin: function(str) {
      var arr = [];
      for (var i = 0; i < str.length; i += 2) {
        arr.push(eval("'\\x" + str.charAt(i) + str.charAt(i + 1) + "'"))
      }
      return arr.join("")
    },
    utf8ToUincode: function(s) {
      var result = "";
      try {
        var length = s.length;
        var arr = [];
        for (i = 0; i < length; i += 2) {
          arr.push("%" + s.substr(i, 2))
        }
        result = decodeURIComponent(arr.join(""));
        result = $.str.decodeHtml(result)
      } catch (e) {
        result = ""
      }
      return result
    },
    json2str: function(obj) {
      var result = "";
      if (typeof JSON != "undefined") {
        result = JSON.stringify(obj)
      } else {
        var arr = [];
        for (var i in obj) {
          arr.push('"' + i + '":"' + obj[i] + '"')
        }
        result = "{" + arr.join(",") + "}"
      }
      return result
    },
    time33: function(str) {
      var hash = 0;
      for (var i = 0, length = str.length; i < length; i++) {
        hash = (hash * 33 + str.charCodeAt(i)) % 4294967296
      }
      return hash
    }
  }
})();
$.css = function() {
  var a = document.documentElement;
  return {
    getPageScrollTop: function() {
      return window.pageYOffset || a.scrollTop || document.body.scrollTop || 0
    },
    getPageScrollLeft: function() {
      return window.pageXOffset || a.scrollLeft || document.body.scrollLeft || 0
    },
    getOffsetPosition: function(c) {
      c = $(c);
      var f = 0,
        d = 0;
      if (a.getBoundingClientRect && c.getBoundingClientRect) {
        var b = c.getBoundingClientRect();
        var h = a.clientTop || document.body.clientTop || 0;
        var g = a.clientLeft || document.body.clientLeft || 0;
        f = b.top + this.getPageScrollTop() - h, d = b.left + this.getPageScrollLeft() - g
      } else {
        do {
          f += c.offsetTop || 0;
          d += c.offsetLeft || 0;
          c = c.offsetParent
        } while (c)
      }
      return {
        left: d,
        top: f
      }
    },
    getWidth: function(b) {
      return $(b).offsetWidth
    },
    getHeight: function(b) {
      return $(b).offsetHeight
    },
    show: function(b) {
      b.style.display = "block"
    },
    hide: function(b) {
      b.style.display = "none"
    },
    hasClass: function(f, g) {
      if (!f.className) {
        return false
      }
      var c = f.className.split(" ");
      for (var d = 0, b = c.length; d < b; d++) {
        if (g == c[d]) {
          return true
        }
      }
      return false
    },
    addClass: function(b, c) {
      $.css.updateClass(b, c, false)
    },
    removeClass: function(b, c) {
      $.css.updateClass(b, false, c)
    },
    updateClass: function(f, m, o) {
      var b = f.className.split(" ");
      var j = {},
        g = 0,
        l = b.length;
      for (; g < l; g++) {
        b[g] && (j[b[g]] = true)
      }
      if (m) {
        var h = m.split(" ");
        for (g = 0, l = h.length; g < l; g++) {
          h[g] && (j[h[g]] = true)
        }
      }
      if (o) {
        var c = o.split(" ");
        for (g = 0, l = c.length; g < l; g++) {
          c[g] && (delete j[c[g]])
        }
      }
      var n = [];
      for (var d in j) {
        n.push(d)
      }
      f.className = n.join(" ")
    },
    setClass: function(c, b) {
      c.className = b
    }
  }
}();
$.animate = {
  fade: function(d, j, b, f, n) {
    d = $(d);
    if (!d) {
      return
    }
    if (!d.effect) {
      d.effect = {}
    }
    var g = Object.prototype.toString.call(j);
    var c = 100;
    if (!isNaN(j)) {
      c = j
    } else {
      if (g == "[object Object]") {
        if (j) {
          if (j.to) {
            if (!isNaN(j.to)) {
              c = j.to
            }
            if (!isNaN(j.from)) {
              d.style.opacity = j.from / 100;
              d.style.filter = "alpha(opacity=" + j.from + ")"
            }
          }
        }
      }
    }
    if (typeof(d.effect.fade) == "undefined") {
      d.effect.fade = 0
    }
    window.clearInterval(d.effect.fade);
    var b = b || 1,
      f = f || 20,
      h = window.navigator.userAgent.toLowerCase(),
      m = function(o) {
        var q;
        if (h.indexOf("msie") != -1) {
          var p = (o.currentStyle || {}).filter || "";
          q = p.indexOf("opacity") >= 0 ? (parseFloat(p.match(/opacity=([^)]*)/)[1])) + "" : "100"
        } else {
          var r = o.ownerDocument.defaultView;
          r = r && r.getComputedStyle;
          q = 100 * (r && r(o, null)["opacity"] || 1)
        }
        return parseFloat(q)
      },
      a = m(d),
      k = a < c ? 1 : -1;
    if (h.indexOf("msie") != -1) {
      if (f < 15) {
        b = Math.floor((b * 15) / f);
        f = 15
      }
    }
    var l = function() {
      a = a + b * k;
      if ((Math.round(a) - c) * k >= 0) {
        d.style.opacity = c / 100;
        d.style.filter = "alpha(opacity=" + c + ")";
        window.clearInterval(d.effect.fade);
        if (typeof(n) == "function") {
          n(d)
        }
      } else {
        d.style.opacity = a / 100;
        d.style.filter = "alpha(opacity=" + a + ")"
      }
    };
    d.effect.fade = window.setInterval(l, f)
  },
  animate: function(b, c, j, t, h) {
    b = $(b);
    if (!b) {
      return
    }
    if (!b.effect) {
      b.effect = {}
    }
    if (typeof(b.effect.animate) == "undefined") {
      b.effect.animate = 0
    }
    for (var o in c) {
      c[o] = parseInt(c[o]) || 0
    }
    window.clearInterval(b.effect.animate);
    var j = j || 10,
      t = t || 20,
      k = function(x) {
        var w = {
          left: x.offsetLeft,
          top: x.offsetTop
        };
        return w
      },
      v = k(b),
      g = {
        width: b.clientWidth,
        height: b.clientHeight,
        left: v.left,
        top: v.top
      },
      d = [],
      s = window.navigator.userAgent.toLowerCase();
    if (!(s.indexOf("msie") != -1 && document.compatMode == "BackCompat")) {
      var m = document.defaultView ? document.defaultView.getComputedStyle(b, null) : b.currentStyle;
      var f = c.width || c.width == 0 ? parseInt(c.width) : null,
        u = c.height || c.height == 0 ? parseInt(c.height) : null;
      if (typeof(f) == "number") {
        d.push("width");
        c.width = f - m.paddingLeft.replace(/\D/g, "") - m.paddingRight.replace(/\D/g, "")
      }
      if (typeof(u) == "number") {
        d.push("height");
        c.height = u - m.paddingTop.replace(/\D/g, "") - m.paddingBottom.replace(/\D/g, "")
      }
      if (t < 15) {
        j = Math.floor((j * 15) / t);
        t = 15
      }
    }
    var r = c.left || c.left == 0 ? parseInt(c.left) : null,
      n = c.top || c.top == 0 ? parseInt(c.top) : null;
    if (typeof(r) == "number") {
      d.push("left");
      b.style.position = "absolute"
    }
    if (typeof(n) == "number") {
      d.push("top");
      b.style.position = "absolute"
    }
    var l = [],
      q = d.length;
    for (var o = 0; o < q; o++) {
      l[d[o]] = g[d[o]] < c[d[o]] ? 1 : -1
    }
    var p = b.style;
    var a = function() {
      var w = true;
      for (var x = 0; x < q; x++) {
        g[d[x]] = g[d[x]] + l[d[x]] * Math.abs(c[d[x]] - g[d[x]]) * j / 100;
        if ((Math.round(g[d[x]]) - c[d[x]]) * l[d[x]] >= 0) {
          w = w && true;
          p[d[x]] = c[d[x]] + "px"
        } else {
          w = w && false;
          p[d[x]] = g[d[x]] + "px"
        }
      }
      if (w) {
        window.clearInterval(b.effect.animate);
        if (typeof(h) == "function") {
          h(b)
        }
      }
    };
    b.effect.animate = window.setInterval(a, t)
  }
};
$.check = {
  isHttps: function() {
    return document.location.protocol == "https:"
  },
  isSsl: function() {
    var a = document.location.host;
    return /^ssl./i.test(a)
  },
  isIpad: function() {
    var a = navigator.userAgent.toLowerCase();
    return /ipad/i.test(a)
  },
  isQQ: function(a) {
    return /^[1-9]{1}\d{4,9}$/.test(a)
  },
  isQQMail: function(a) {
    return /^[1-9]{1}\d{4,9}@qq\.com$/.test(a)
  },
  isNullQQ: function(a) {
    return /^\d{1,4}$/.test(a)
  },
  isNick: function(a) {
    return /^[a-zA-Z]{1}([a-zA-Z0-9]|[-_]){0,19}$/.test(a)
  },
  isName: function(a) {
    return /[\u4E00-\u9FA5]{1,8}/.test(a)
  },
  isPhone: function(a) {
    return /^(?:86|886|)1\d{10}\s*$/.test(a)
  },
  isDXPhone: function(a) {
    return /^(?:86|886|)1(?:33|53|80|81|89)\d{8}$/.test(a)
  },
  isSeaPhone: function(a) {
    return /^(00)?(?:852|853|886(0)?\d{1})\d{8}$/.test(a)
  },
  isMail: function(a) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(a)
  },
  isQiyeQQ800: function(a) {
    return /^(800)\d{7}$/.test(a)
  },
  isPassword: function(a) {
    return a && a.length >= 16
  },
  isForeignPhone: function(a) {
    return /^00\d{7,}/.test(a)
  },
  needVip: function(f) {
    var a = ["21001601", "21000110", "21000121", "46000101", "716027609", "716027610", "549000912", "637009801"];
    var b = true;
    for (var c = 0, d = a.length; c < d; c++) {
      if (a[c] == f) {
        b = false;
        break
      }
    }
    return b
  },
  isPaipai: function() {
    return /paipai.com$/.test(window.location.hostname)
  },
  is_weibo_appid: function(a) {
    if (a == 46000101 || a == 607000101 || a == 558032501) {
      return true
    }
    return false
  }
};
$.report = {
  monitor: function(c, b) {
    if (Math.random() > (b || 1)) {
      return
    }
    var a = location.protocol + "//ui.ptlogin2.qq.com/cgi-bin/report?id=" + c;
    $.http.preload(a)
  },
  nlog: function(g, a, d, b) {
    if (Math.random() >= (d || 1)) {
      return
    }
    var f = location.protocol == "https:" ? "https://ssl.qq.com/ptlogin/cgi-bin/ptlogin_report?" : "http://log.wtlogin.qq.com/cgi-bin/ptlogin_report?";
    var c = encodeURIComponent(g + "|_|" + location.href + "|_|" + window.navigator.userAgent);
    a = a ? a : 0;
    if (b) {
      f += "u=" + b + "&"
    }
    f += ("id=" + a + "&msg=" + c + "&v=" + Math.random());
    $.http.preload(f)
  },
  simpleIsdSpeed: function(a, c) {
    if (Math.random() < (c || 1)) {
      var b = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
      if ($.check.isHttps()) {
        b = "https://login.qq.com/cgi-bin/r.cgi?"
      }
      b += a;
      $.http.preload(b)
    }
  },
  isdSpeed: function(a, g) {
    var b = false;
    var d = "http://isdspeed.qq.com/cgi-bin/r.cgi?";
    if ($.check.isHttps()) {
      d = "https://login.qq.com/cgi-bin/r.cgi?"
    }
    d += a;
    if (Math.random() < (g || 1)) {
      var c = $.report.getSpeedPoints(a);
      for (var f in c) {
        if (c[f] && c[f] < 30000) {
          d += ("&" + f + "=" + c[f]);
          b = true
        }
      }
      d += "&v=" + Math.random();
      if (b) {
        $.http.preload(d)
      }
    }
    $.report.setSpeedPoint(a)
  },
  speedPoints: {},
  basePoint: {},
  setBasePoint: function(a, b) {
    $.report.basePoint[a] = b
  },
  setSpeedPoint: function(a, b, c) {
    if (!b) {
      $.report.speedPoints[a] = {}
    } else {
      if (!$.report.speedPoints[a]) {
        $.report.speedPoints[a] = {}
      }
      $.report.speedPoints[a][b] = c - $.report.basePoint[a]
    }
  },
  setSpeedPoints: function(a, b) {
    $.report.speedPoints[a] = b
  },
  getSpeedPoints: function(a) {
    return $.report.speedPoints[a]
  }
};
$.sso_ver = 0;
$.sso_state = 0;
$.plugin_isd_flag = "";
$.nptxsso = null;
$.activetxsso = null;
$.sso_loadComplete = true;
$.np_clock = 0;
$.loginQQnum = 0;
$.suportActive = function() {
  var a = true;
  try {
    if (window.ActiveXObject || window.ActiveXObject.prototype) {
      a = true;
      if (window.ActiveXObject.prototype && !window.ActiveXObject) {
        $.report.nlog("activeobject 判断有问题")
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
    debugger;
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
$.checkNPPlugin = function() {
  var a = 10;
  window.clearInterval($.np_clock);
  $.np_clock = window.setInterval(function() {
    if (typeof $.nptxsso.InitPVANoST == "function" || a == 0) {
      window.clearInterval($.np_clock);
      if (typeof $.nptxsso.InitPVANoST == "function") {
        pt.plogin.auth();
        if (window.console) {
          console.log("延迟切换快速登录:" + a)
        }
      }
    } else {
      a--
    }
  }, 200)
};
$.guanjiaPlugin = null;
$.initGuanjiaPlugin = function() {
  try {
    if (window.ActiveXObject) {
      $.guanjiaPlugin = new ActiveXObject("npQMExtensionsIE.Basic")
    } else {
      if (navigator.mimeTypes["application/qqpcmgr-extensions-mozilla"]) {
        $.guanjiaPlugin = document.createElement("embed");
        $.guanjiaPlugin.type = "application/qqpcmgr-extensions-mozilla";
        $.guanjiaPlugin.style.width = "0px";
        $.guanjiaPlugin.style.height = "0px";
        document.body.appendChild($.guanjiaPlugin)
      }
    }
    var a = $.guanjiaPlugin.QMGetVersion().split(".");
    if (a.length == 4 && a[2] >= 9319) {} else {
      $.guanjiaPlugin = null
    }
  } catch (b) {
    $.guanjiaPlugin = null
  }
};