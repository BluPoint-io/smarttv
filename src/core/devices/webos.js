import Device from '../device';
import Logger from '../../service/logger';
import Mux from '../../service/mux';

class DeviceWebOs extends Device {

  /**
   * This is extendable class for LG WebOs devices
   *
   * @class Device_WebOs
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    this.initNetworkClass();
    this.initKeyListener();
    Logger.addLog('Device_WebOs', 'info', 'WebOs Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    this.Mux = new Mux(this.Config);
    window.isDebugEnabled = this.Config.debug;
    this.constructor.addWebOSLib();
  }

  /**
   * WebOs native api's are required to use webos.js file.
   * This method provides necessary libraries.
   *
   * @for Device_WebOs
   * @method addWebOsLib
   * @return {Boolean} true
   */
  static addWebOSLib() {
    window.webOS=window.webOS||{},"object"==typeof module&&module.exports&&(module.exports=window.webOS),function(){if(webOS.platform={},window.PalmSystem)if(-1<navigator.userAgent.indexOf("SmartWatch"))webOS.platform.watch=!0;else if(-1<navigator.userAgent.indexOf("SmartTV")||-1<navigator.userAgent.indexOf("Large Screen"))webOS.platform.tv=!0;else{try{var e=JSON.parse(PalmSystem.deviceInfo||"{}");if(e.platformVersionMajor&&e.platformVersionMinor){var t=parseInt(e.platformVersionMajor),o=parseInt(e.platformVersionMinor);t<3||3==t&&o<=0?webOS.platform.legacy=!0:webOS.platform.open=!0}}catch(e){webOS.platform.open=!0}window.Mojo=window.Mojo||{relaunch:function(e){}},window.PalmSystem&&PalmSystem.stageReady&&PalmSystem.stageReady()}else webOS.platform.unknown=!0}(),webOS.fetchAppId=function(){if(window.PalmSystem&&PalmSystem.identifier)return PalmSystem.identifier.split(" ")[0]},webOS.fetchAppInfo=function(o,e){if(webOS.appInfo)o&&o(webOS.appInfo);else{var t=function(e,t){if(!e&&t)try{webOS.appInfo=JSON.parse(t),o&&o(webOS.appInfo)}catch(e){console.error("Unable to parse appinfo.json file for "+appID),o&&o()}else o&&o()},i=new XMLHttpRequest;i.onreadystatechange=function(){4==i.readyState&&(200<=i.status&&i.status<300||0===i.status?t(void 0,i.responseText):t({status:404}))};try{i.open("GET",e||"appinfo.json",!0),i.send(null)}catch(e){t({status:404})}}},webOS.fetchAppRootPath=function(){var e=window.location.href;if("baseURI"in window.document)e=window.document.baseURI;else{var t=window.document.getElementsByTagName("base");0<t.length&&(e=t[0].href)}var o=e.match(new RegExp(".*://[^#]*/"));return o?o[0]:""},webOS.platformBack=function(){if(window.PalmSystem&&PalmSystem.platformBack)return PalmSystem.platformBack()},webOS.deviceInfo=function(s){if(this.device)s(this.device);else{this.device={};try{var e=JSON.parse(PalmSystem.deviceInfo);this.device.modelName=e.modelName,this.device.modelNameAscii=e.modelNameAscii,this.device.version=e.platformVersion,this.device.versionMajor=e.platformVersionMajor,this.device.versionMinor=e.platformVersionMinor,this.device.versionDot=e.platformVersionDot,this.device.sdkVersion=e.platformVersion,this.device.screenWidth=e.screenWidth,this.device.screenHeight=e.screenHeight}catch(e){this.device.modelName=this.device.modelNameAscii="webOS Device"}this.device.screenHeight=this.device.screenHeight||screen.height,this.device.screenWidth=this.device.screenWidth||screen.width;var r=this;webOS.platform.tv?webOS.service.request("luna://com.webos.service.tv.systemproperty",{method:"getSystemInfo",parameters:{keys:["firmwareVersion","modelName","sdkVersion","UHD"]},onSuccess:function(e){if(r.device.modelName=e.modelName||r.device.modelName,r.device.modelNameAscii=e.modelName||r.device.modelNameAscii,r.device.sdkVersion=e.sdkVersion||r.device.sdkVersion,r.device.uhd="true"===e.UHD,e.firmwareVersion&&"0.0.0"!==e.firmwareVersion||(e.firmwareVersion=e.sdkVersion),e.firmwareVersion){r.device.version=e.firmwareVersion;for(var t=r.device.version.split("."),o=["versionMajor","versionMinor","versionDot"],i=0;i<o.length;i++)try{r.device[o[i]]=parseInt(t[i])}catch(e){r.device[o[i]]=t[i]}}s(r.device)},onFailure:function(e){s(r.device)}}):(webOS.platform.watch&&(this.device.modelName=this.device.modelNameAscii="webOS Watch"),s(this.device))}},webOS.feedback={play:function(e){if(webOS&&webOS.platform&&webOS.platform.watch){var t={name:e||"touch",sink:"pfeedback"};if(!window.PalmServiceBridge)return;webOS.service.request("luna://com.palm.audio/systemsounds",{method:"playFeedback",parameters:t,subscribe:!1,resubscribe:!1})}}},webOS.keyboard={isShowing:function(){return!!(PalmSystem&&PalmSystem.isKeyboardVisible&&PalmSystem.isKeyboardVisible())}},webOS.notification={showToast:function(e,t){var o=e.message||"",i=e.icon||"",s=webOS.fetchAppId(),r=e.appId||s,n=e.appParams||{},a=e.target,c=e.noaction,l=e.stale||!1,m=e.soundClass||"",d=e.soundFile||"",u=e.soundDurationMs||"";if(webOS.platform.legacy||webOS.platform.open){var f=(e.response,PalmSystem.addBannerMessage(o,JSON.stringify(n),i,m,d,u));t&&t(f)}else{60<o.length&&console.warn("Toast notification message is longer than recommended. May not display as intended");var b={sourceId:s,message:o,stale:l,noaction:c};i&&0<i.length&&(b.iconUrl=i),c||(b.onclick=a?{target:a}:{appId:r,params:n}),this.showToastRequest=webOS.service.request("palm://com.webos.notification",{method:"createToast",parameters:b,onSuccess:function(e){t&&t(e.toastId)},onFailure:function(e){console.error("Failed to create toast: "+JSON.stringify(e)),t&&t()}})}},removeToast:function(e){if(webOS.platform.legacy||webOS.platform.open)try{PalmSystem.removeBannerMessage(e)}catch(e){console.warn(e),PalmSystem.clearBannerMessage()}else this.removeToastRequest=webOS.service.request("palm://com.webos.notification",{method:"closeToast",parameters:{toastId:e}})},supportsDashboard:function(){return webOS.platform.legacy||webOS.platform.open},showDashboard:function(e,t){if(webOS.platform.legacy||webOS.platform.open){var o=window.open(e,"_blank",'attributes={"window":"dashboard"}');return t&&o.document.write(t),o.PalmSystem&&o.PalmSystem.stageReady(),o}console.warn("Dashboards are not supported on this version of webOS.")}},function(){var i=function(e,t,o,i){var s;window.PalmSystem&&(o&&!((s=o)&&"object"==typeof s&&"[object Array]"!==Object.prototype.toString.call(s))&&(e=3,o={msgid:t},t="MISMATCHED_FMT",i=null,console.warn("webOSLog called with invalid format: keyVals must be an object")),t||7==e||console.warn("webOSLog called with invalid format: messageId was empty"),o&&(o=JSON.stringify(o)),window.PalmSystem.PmLogString?7==e?window.PalmSystem.PmLogString(e,null,null,i):window.PalmSystem.PmLogString(e,t,o,i):console.error("Unable to send log; PmLogString not found in this version of PalmSystem"))};webOS.emergency=function(e,t,o){i(0,e,t,o)},webOS.alert=function(e,t,o){i(1,e,t,o)},webOS.critical=function(e,t,o){i(2,e,t,o)},webOS.error=function(e,t,o){i(3,e,t,o)},webOS.warning=function(e,t,o){i(4,e,t,o)},webOS.notice=function(e,t,o){i(5,e,t,o)},webOS.info=function(e,t,o){i(6,e,t,o)},webOS.debug=function(e){i(7,"","",e)}}(),function(){function i(e,t){this.uri=e,(t=t||{}).method&&("/"!=this.uri.charAt(this.uri.length-1)&&(this.uri+="/"),this.uri+=t.method),"function"==typeof t.onSuccess&&(this.onSuccess=t.onSuccess),"function"==typeof t.onFailure&&(this.onFailure=t.onFailure),"function"==typeof t.onComplete&&(this.onComplete=t.onComplete),this.params="object"==typeof t.parameters?t.parameters:{},this.subscribe=t.subscribe||!1,this.subscribe&&(this.params.subscribe=t.subscribe),this.params.subscribe&&(this.subscribe=this.params.subscribe),this.resubscribe=t.resubscribe||!1,this.send()}i.prototype.send=function(){if(!window.PalmServiceBridge)return this.onFailure&&this.onFailure({errorCode:-1,errorText:"PalmServiceBridge not found.",returnValue:!1}),this.onComplete&&this.onComplete({errorCode:-1,errorText:"PalmServiceBridge not found.",returnValue:!1}),void console.error("PalmServiceBridge not found.");this.bridge=new PalmServiceBridge;var e=this;this.bridge.onservicecallback=this.callback=function(t){var o;if(!e.cancelled){try{o=JSON.parse(t)}catch(e){o={errorCode:-1,errorText:t,returnValue:!1}}(o.errorCode||0==o.returnValue)&&e.onFailure?(e.onFailure(o),e.resubscribe&&e.subscribe&&(e.delayID=setTimeout(function(){e.send()},i.resubscribeDelay))):e.onSuccess&&e.onSuccess(o),e.onComplete&&e.onComplete(o),e.subscribe||e.cancel()}},this.bridge.call(this.uri,JSON.stringify(this.params))},i.prototype.cancel=function(){this.cancelled=!0,this.resubscribeJob&&clearTimeout(this.delayID),this.bridge&&(this.bridge.cancel(),this.bridge=void 0)},i.prototype.toString=function(){return"[LS2Request]"},i.resubscribeDelay=1e4,webOS.service={request:function(e,t){return new i(e,t)},systemPrefix:"com.webos.",protocol:"luna://"},navigator.service={request:webOS.service.request},navigator.service.Request=navigator.service.request}(),webOS.libVersion="0.1.0",webOS.voicereadout={readAlert:function(e,t){var o,i,s="boolean"!=typeof t||t;if(webOS&&webOS.platform&&webOS.platform.watch){var r,n,a=function(){webOS.service.request("luna://com.lge.service.tts",{method:"speak",parameters:{locale:r,text:e,speechRate:n}})};i=function(){var t;t=function(){var t;t=a,webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{category:"option",key:"ttsSpeechRate"},onSuccess:function(e){n=Number(e.settings.ttsSpeechRate),t()},onFailure:function(e){console.error("Failed to get system speechRate settings: "+JSON.stringify(e))}})},webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{keys:["localeInfo"]},onSuccess:function(e){r=e.settings.localeInfo.locales.TTS,t()},onFailure:function(e){console.error("Failed to get system localeInfo settings: "+JSON.stringify(e))}})},webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{category:"VoiceReadOut"},onSuccess:function(e){e&&e.settings.talkbackEnable&&i()},onFailure:function(e){console.error("Failed to get system VoiceReadOut settings: "+JSON.stringify(e))}})}else webOS&&webOS.platform&&webOS.platform.tv?(o=a=function(){webOS.service.request("luna://com.webos.service.tts",{method:"speak",parameters:{text:e,clear:s},onFailure:function(e){console.error("Failed to readAlertMessage: "+JSON.stringify(e))}})},webOS.service.request("luna://com.webos.settingsservice",{method:"getSystemSettings",parameters:{keys:["audioGuidance"],category:"option"},onSuccess:function(e){e&&"on"===e.settings.audioGuidance&&o()},onFailure:function(e){console.error("Failed to get system AudioGuidance settings: "+JSON.stringify(e))}})):console.warn("Platform doesn't support TTS api.")}};
    Logger.addLog('Device_WebOs', 'info', 'WebOs Library loaded successfully', window.webOS);
  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
   * @for Device_WebOs
   * @method createVideoElement
   * @return {Boolean} true
   */
  createVideoElement() {
    if (this.videoElement) {
      this.deleteVideoElement();
    }
    this.videoElement = document.createElement('video');
    this.videoElement.style.position = 'absolute';
    this.videoElement.setAttribute('width', this.Config.width);
    this.videoElement.setAttribute('height', this.Config.height);
    this.videoElement.setAttribute('id', this.Config.videoPlayerId);
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.style.visibility = 'hidden';
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('playready', 'WEBOS');
    this.registerVideoEvents();
    Logger.addLog('Device_WebOs', 'info', 'Player Element Created and Registered Video Events');
    this.initAudioClass();
  }
}

export default DeviceWebOs;
