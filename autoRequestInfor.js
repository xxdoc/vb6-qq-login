document.domain = "qq.com";

// 兼容不同浏览器的 Adapter 适配层
if (typeof window.XMLHttpRequest === "undefined") {
  window.XMLHttpRequest = function() {
    return new window.ActiveXObject(navigator.userAgent.indexOf("MSIE 5") >= 0 ? "Microsoft.XMLHTTP" : "Msxml2.XMLHTTP");
  };
}

var log = function(msg, type) {
  if (typeof(console) === "object") {
    type = /*type || */ "log";
    if (typeof(console[type]) === "function") {
      console[type](msg);
    } else if (typeof(console["log"]) === "function") {
      console.log(msg);
    }
  }
};

/**
 * 这是Ajax对象名字空间的一个方法
 * 
 * @memberOf Http
 * @method  ajax
 * 
 * @param {Object} options 一个配置对象
 * @return {Object} ajax 返回一个ajax对象
 */
var ajax = function(uri, options) {
  var httpRequest,
    httpSuccess,
    timeout,
    isTimeout = false,
    isComplete = false;

  options = {
    method: options.method || "GET",
    data: options.data || null,
    arguments: options.arguments || null,

    onSuccess: options.onSuccess || function() {},
    onError: options.onError || function() {},
    onComplete: options.onComplete || function() {},
    //尚未测试
    onTimeout: options.onTimeout || function() {},

    isAsync: options.isAsync || true,
    timeout: options.timeout ? options.timeout : 30000,
    contentType: options.contentType ? options.contentType : "utf-8",
    type: options.type || "xml"
  };
  uri = uri || "",
    timeout = options.timeout;



  httpRequest = new window.XMLHttpRequest();

  httpRequest.open(options.method, uri, options.isAsync);
  //设置编码集
  //httpRequest.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  httpRequest.setRequestHeader("Content-Type", options.contentType);

  /**
   * @ignore
   */
  httpSuccess = function(r) {
    try {
      return (!r.status && location.protocol == "file:") || (r.status >= 200 && r.status < 300) || (r.status == 304) || (navigator.userAgent.indexOf("Safari") > -1 && typeof r.status == "undefined");
    } catch (e) {
      log(e, "error");
    }
    return false;
  }

  //httpRequest.UPDATE_TIME_STAMP = "20110331001";
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      if (!isTimeout) {
        var o = {};
        o.responseText = httpRequest.responseText;
        o.responseXML = httpRequest.responseXML;
        o.uri = uri;
        o.arguments = options.arguments;
        o.status = httpRequest.status;
        o.data = options.data;

        if (httpSuccess(httpRequest)) {
          if (options.type === "script") {
            eval.call(window, data);
          }
          try {
            if (options && options.onSuccess) {
              options.onSuccess(o);
            }

          } catch (e) {
            log(e, "error");
          }


        } else {

          try {
            options.onError(o);
          } catch (e) {
            log(e, "error");
          }
        }

        try {
          options.onComplete(o);
        } catch (e) {
          log(e, "error");
        }
      }
      isComplete = true;
      //删除对象,防止内存溢出
      httpRequest = null;
    }
  };

  httpRequest.send(options.data);

  window.setTimeout(function() {
    var o;
    if (!isComplete) {
      isTimeout = true;
      o = {};
      o.uri = uri;
      o.arguments = options.arguments;
      if (httpRequest) {
        httpRequest.abort();
        httpRequest = null;
      }
      try {
        options.onTimeout(o);
        options.onComplete(o);
      } catch (e) {
        log(e, "error");
      }
    }
  }, timeout);

  return httpRequest;
};

function GetRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}
var urlParam = GetRequest();
//这里为了安全，不直接传回调函数过来，这里做一层map

if (urlParam["callback"]) {
  parent.alloy.ajaxProxyCallback(parseInt(urlParam["callback"]), parseInt(urlParam["id"]));
}