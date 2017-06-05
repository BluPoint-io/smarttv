window.webOS = window.webOS || {};

// device.js
(function () {
  try {
    var deviceInfo = JSON.parse(PalmSystem.deviceInfo);
    webOS.device = deviceInfo
  } catch (e) {
    webOS.device = {}
  }
})();

// platform.js
(function () {
  if (window.PalmSystem) {
    webOS.platform = {};
    if (navigator.userAgent.indexOf("SmartTV") > -1 || navigator.userAgent.indexOf("Large Screen") > -1) {
      webOS.platform.tv = true
    } else if (webOS.device.platformVersionMajor && webOS.device.platformVersionMinor) {
      try {
        var major = parseInt(webOS.device.platformVersionMajor);
        var minor = parseInt(webOS.device.platformVersionMinor);
        if (major < 3 || major == 3 && minor <= 0) {
          webOS.platform.legacy = true
        } else {
          webOS.platform.open = true
        }
      } catch (e) {
        webOS.platform.open = true
      }
    } else {
      webOS.platform.open = true
    }
  }
})();

// application.js
(function () {
  webOS.fetchAppId = function () {
    if (window.PalmSystem) {
      return PalmSystem.identifier.split(" ")[0]
    }
  };
  webOS.fetchAppInfo = function () {
    if (!this.appInfo) {
      var readAppInfoFile = function (filepath) {
        if (window.palmGetResource) {
          try {
            return palmGetResource(filepath)
          } catch (e) {
            console.log("error reading appinfo.json" + e.message)
          }
        } else {
          var req = new XMLHttpRequest;
          req.open("GET", filepath + "?palmGetResource=true", false);
          req.send(null);
          if (req.status >= 200 && req.status < 300) {
            return req.responseText
          } else {
            console.log("error reading appinfo.json")
          }
        }
      };
      var appID = this.fetchAppId();
      var paths = [this.fetchAppRootPath() + "appinfo.json", "file:///media/cryptofs/apps/usr/palm/applications/" + appID + "/appinfo.json", "file:///usr/palm/applications/" + appID + "/appinfo.json"];
      var index = paths[0].indexOf(appID);
      if (index > -1) {
        paths.unshift(paths[0].substring(0, index) + appID + "/appinfo.json")
      }
      var appInfoJSON = undefined;
      for (var i = 0; i < paths.length && !appInfoJSON; i++) {
        appInfoJSON = readAppInfoFile(paths[i])
      }
      if (appInfoJSON) {
        this.appInfo = enyo.json.parse(appInfoJSON)
      }
    }
    return this.appInfo
  };
  webOS.fetchAppRootPath = function () {
    var base = window.location.href;
    if ("baseURI" in window.document) {
      base = window.document.baseURI
    } else {
      var baseTags = window.document.getElementsByTagName("base");
      if (baseTags.length > 0) {
        base = baseTags[0].href
      }
    }
    var match = base.match(new RegExp(".*://[^#]*/"));
    if (match) {
      return match[0]
    }
    return ""
  }
})();

// keyboard.js
(function () {
  var hasVKeyboard = !(webOS.platform.legacy && webOS.device.platformVersionMajor && parseInt(webOS.device.platformVersionMajor) < 3);
  if (hasVKeyboard) {
    var state = {};
    Mojo = window.Mojo || {};
    Mojo.keyboardShown = function (inKeyboardShowing) {
      state.isShowing = inKeyboardShowing
    };
    webOS.keyboard = {
      types: {
        text: 0,
        password: 1,
        search: 2,
        range: 3,
        email: 4,
        number: 5,
        phone: 6,
        url: 7,
        color: 8
      }, isShowing: function () {
        return state.isShowing || false
      }, show: function (type) {
        if (this.isManualMode() && window.PalmSystem) {
          PalmSystem.keyboardShow(type || 0)
        }
      }, hide: function () {
        if (this.isManualMode() && window.PalmSystem) {
          PalmSystem.keyboardHide()
        }
      }, setManualMode: function (mode) {
        state.manual = mode;
        if (window.PalmSystem) {
          PalmSystem.setManualKeyboardEnabled(mode)
        }
      }, isManualMode: function () {
        return state.manual || false
      }, forceShow: function (inType) {
        this.setManualMode(true);
        if (window.PalmSystem) {
          PalmSystem.keyboardShow(inType || 0)
        }
      }, forceHide: function () {
        this.setManualMode(true);
        if (window.PalmSystem) {
          PalmSystem.keyboardHide()
        }
      }
    }
  }
})();

// launch.js
(function () {
  if ((webOS.platform.legacy || webOS.platform.open) && !window.cordova) {
    var fireDocumentEvent = function (type, data) {
      var evt = document.createEvent("Events");
      evt.initEvent(type, false, false);
      for (var i in data) {
        evt[i] = data[i]
      }
      document.dispatchEvent(evt)
    };
    Mojo = window.Mojo || {};
    var lp = JSON.parse(PalmSystem.launchParams || "{}") || {};
    fireDocumentEvent("webOSLaunch", {type: "webOSLaunch", detail: lp});
    window.Mojo.relaunch = function (e) {
      var lp = JSON.parse(PalmSystem.launchParams || "{}") || {};
      if (lp["palm-command"] && lp["palm-command"] == "open-app-menu") {
        fireDocumentEvent("menubutton", {});
        return true
      } else {
        fireDocumentEvent("webOSRelaunch", {type: "webOSRelaunch", detail: lp})
      }
    };
    if (window.PalmSystem) {
      window.PalmSystem.stageReady()
    }
  }
})();

// notification.js
(function () {
  webOS.notification = {
    showToast: function (params, callback) {
      var message = params.message || "";
      var icon = params.icon || "";
      var source = webOS.fetchAppId();
      var appId = params.appId || source;
      var toastParams = params.params || {};
      var target = params.target;
      var noaction = params.noaction;
      var stale = params.stale || false;
      var soundClass = params.soundClass || "";
      var soundFile = params.soundFile || "";
      var soundDurationMs = params.soundDurationMs || "";
      if (webOS.platform.legacy || webOS.platform.open) {
        var response = params.response || {banner: true};
        var id = PalmSystem.addBannerMessage(message, JSON.stringify(toastParams), icon, soundClass, soundFile, soundDurationMs);
        callback && callback(id)
      } else {
        if (message.length > 60) {
          console.warn("Toast notification message is longer than recommended. May not display as intended")
        }
        var reqParam = {sourceId: source, message: message, stale: stale, noaction: noaction};
        if (icon && icon.length > 0) {
          reqParam.iconUrl = icon
        }
        if (!noaction) {
          if (target) {
            reqParam.onclick = {target: target}
          } else {
            reqParam.onclick = {appId: appId, params: toastParams}
          }
        }
        this.showToastRequest = webOS.service.request("palm://com.webos.notification", {
          method: "createToast",
          parameters: reqParam,
          onSuccess: function (inResponse) {
            callback && callback(inResponse.toastId)
          },
          onFailure: function (inError) {
            console.error("Failed to create toast: " + JSON.stringify(inError));
            callback && callback()
          }
        })
      }
    }, removeToast: function (toastId) {
      if (webOS.platform.legacy || webOS.platform.open) {
        try {
          PalmSystem.removeBannerMessage(toastId)
        } catch (e) {
          console.warn(e);
          PalmSystem.clearBannerMessage()
        }
      } else {
        this.removeToastRequest = webOS.service.request("palm://com.webos.notification", {
          method: "closeToast",
          parameters: {toastId: toastId}
        })
      }
    }, supportsDashboard: function () {
      return webOS.platform.legacy || webOS.platform.open
    }, showDashboard: function (url, html) {
      if (webOS.platform.legacy || webOS.platform.open) {
        var dash = window.open(url, "_blank", 'attributes={"window":"dashboard"}');
        if (html) {
          dash.document.write(html)
        }
        if (dash.PalmSystem) {
          dash.PalmSystem.stageReady()
        }
        return dash
      } else {
        console.warn("Dashboards are not supported on this version of webOS.")
      }
    }
  }
})();

// orientation.js
(function () {
  webOS.orientation = {
    setOrientation: function (orientation) {
      if (window.PalmSystem && PalmSystem.setWindowOrientation) {
        PalmSystem.setWindowOrientation(orientation)
      }
    }, getOrientation: function () {
      if (window.PalmSystem && PalmSystem.setWindowOrientation) {
        return PalmSystem.windowOrientation
      } else {
        return "up"
      }
    }
  }
})();

// pmloglib.js
(function () {
  var levelNone = -1;
  var levelEmergency = 0;
  var levelAlert = 1;
  var levelCritical = 2;
  var levelError = 3;
  var levelWarning = 4;
  var levelNotice = 5;
  var levelInfo = 6;
  var levelDebug = 7;
  var isObject = function (obj) {
    return !!obj && typeof obj === "object" && Object.prototype.toString.call(obj) !== "[object Array]"
  };
  var log = function (level, messageId, keyVals, freeText) {
    if (window.PalmSystem) {
      if (keyVals && !isObject(keyVals)) {
        level = levelError;
        keyVals = {msgid: messageId};
        messageId = "MISMATCHED_FMT";
        freeText = null;
        console.warn("webOSLog called with invalid format: keyVals must be an object")
      }
      if (!messageId && level != levelDebug) {
        console.warn("webOSLog called with invalid format: messageId was empty")
      }
      if (keyVals) {
        keyVals = JSON.stringify(keyVals)
      }
      if (window.PalmSystem.PmLogString) {
        if (level == levelDebug) {
          window.PalmSystem.PmLogString(level, null, null, freeText)
        } else {
          window.PalmSystem.PmLogString(level, messageId, keyVals, freeText)
        }
      } else {
        console.error("Unable to send log; PmLogString not found in this version of PalmSystem")
      }
    }
  };
  webOS.emergency = function (messageId, keyVals, freeText) {
    log(levelEmergency, messageId, keyVals, freeText)
  };
  webOS.alert = function (messageId, keyVals, freeText) {
    log(levelAlert, messageId, keyVals, freeText)
  };
  webOS.critical = function (messageId, keyVals, freeText) {
    log(levelCritical, messageId, keyVals, freeText)
  };
  webOS.error = function (messageId, keyVals, freeText) {
    log(levelError, messageId, keyVals, freeText)
  };
  webOS.warning = function (messageId, keyVals, freeText) {
    log(levelWarning, messageId, keyVals, freeText)
  };
  webOS.notice = function (messageId, keyVals, freeText) {
    log(levelNotice, messageId, keyVals, freeText)
  };
  webOS.info = function (messageId, keyVals, freeText) {
    log(levelInfo, messageId, keyVals, freeText)
  };
  webOS.debug = function (freeText) {
    log(levelDebug, "", "", freeText)
  }
})();

// service.js
(function () {
  function LS2Request(uri, params) {
    this.uri = uri;
    params = params || {};
    if (params.method) {
      if (this.uri.charAt(this.uri.length - 1) != "/") {
        this.uri += "/"
      }
      this.uri += params.method
    }
    if (typeof params.onSuccess === "function") {
      this.onSuccess = params.onSuccess
    }
    if (typeof params.onFailure === "function") {
      this.onFailure = params.onFailure
    }
    if (typeof params.onComplete === "function") {
      this.onComplete = params.onComplete
    }
    this.params = typeof params.parameters === "object" ? params.parameters : {};
    this.subscribe = params.subscribe || false;
    if (this.subscribe) {
      this.params.subscribe = params.subscribe
    }
    if (this.params.subscribe) {
      this.subscribe = this.params.subscribe
    }
    this.resubscribe = params.resubscribe || false;
    this.send()
  }

  LS2Request.prototype.send = function () {
    if (!window.PalmServiceBridge) {
      console.error("PalmServiceBridge not found.");
      return
    }
    this.bridge = new PalmServiceBridge;
    var self = this;
    this.bridge.onservicecallback = this.callback = function (msg) {
      var parsedMsg;
      if (self.cancelled) {
        return
      }
      try {
        parsedMsg = JSON.parse(msg)
      } catch (e) {
        parsedMsg = {errorCode: -1, errorText: msg}
      }
      if ((parsedMsg.errorCode || parsedMsg.returnValue == false) && self.onFailure) {
        self.onFailure(parsedMsg);
        if (self.resubscribe && self.subscribe) {
          self.delayID = setTimeout(function () {
            self.send()
          }, LS2Request.resubscribeDelay)
        }
      } else if (self.onSuccess) {
        self.onSuccess(parsedMsg)
      }
      if (self.onComplete) {
        self.onComplete(parsedMsg)
      }
      if (!self.subscribe) {
        self.cancel()
      }
    };
    this.bridge.call(this.uri, JSON.stringify(this.params))
  };
  LS2Request.prototype.cancel = function () {
    this.cancelled = true;
    if (this.resubscribeJob) {
      clearTimeout(this.delayID)
    }
    if (this.bridge) {
      this.bridge.cancel();
      this.bridge = undefined
    }
  };
  LS2Request.prototype.toString = function () {
    return "[LS2Request]"
  };
  LS2Request.resubscribeDelay = 1e4;
  webOS.service = {
    request: function (uri, params) {
      return new LS2Request(uri, params)
    },
    systemPrefix: webOS.platform.legacy || webOS.platform.open ? "com.palm" : "com.webos",
    protocol: webOS.platform.legacy && webOS.device.platformVersionMajor && parseInt(webOS.device.platformVersionMajor) <= 1 ? "palm://" : "luna://"
  };
  navigator.service = {request: webOS.service.request};
  navigator.service.Request = navigator.service.request
})();

// version.js
(function () {
  webOS.libVersion = "0.1.0"
})();

// window.js
(function () {
  webOS.window = {
    launchParams: function (inWindow) {
      inWindow = inWindow || window;
      if (inWindow.PalmSystem) {
        return JSON.parse(inWindow.PalmSystem.launchParams || "{}") || {}
      }
      return {}
    }, isActivated: function (inWindow) {
      inWindow = inWindow || window;
      if (inWindow.PalmSystem) {
        return inWindow.PalmSystem.isActivated
      }
      return false
    }, activate: function (inWindow) {
      inWindow = inWindow || window;
      if (inWindow.PalmSystem) {
        inWindow.PalmSystem.activate()
      }
    }, deactivate: function (inWindow) {
      inWindow = inWindow || window;
      if (inWindow.PalmSystem) {
        inWindow.PalmSystem.deactivate()
      }
    }, newCard: function (url, html) {
      if (!url && !(webOS.platform.legacy || webOS.platform.open)) {
        url = "about:blank"
      }
      var child = window.open(url);
      if (html) {
        child.document.write(html)
      }
      if (child.PalmSystem) {
        child.PalmSystem.stageReady()
      }
      return child
    }, setFullScreen: function (state) {
      if (window.PalmSystem && PalmSystem.enableFullScreenMode) {
        PalmSystem.enableFullScreenMode(state)
      }
    }, setWindowProperties: function (inWindow, inProps) {
      if (arguments.length == 1) {
        inProps = inWindow;
        inWindow = window
      }
      if (inWindow.PalmSystem && inWindow.PalmSystem.setWindowProperties) {
        inWindow.webOS.window.properties = inProps = inProps || {};
        inWindow.PalmSystem.setWindowProperties(inProps)
      }
    }, getWindowProperties: function (inWindow) {
      inWindow = inWindow || window;
      inWindow.webOS.window.properties = inWindow.webOS.window.properties || {};
      return inWindow.webOS.window.properties
    }, blockScreenTimeout: function (state) {
      webOS.window.properties.blockScreenTimeout = state;
      this.setWindowProperties(navigator.windowProperties)
    }, setSubtleLightbar: function (state) {
      webOS.window.properties.setSubtleLightbar = state;
      this.setWindowProperties(webOS.window.properties)
    }, setFastAccelerometer: function (state) {
      webOS.window.properties.fastAccelerometer = state;
      this.setWindowProperties(webOS.window.properties)
    }
  }
})();

