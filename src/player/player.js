import Audio from './audio';
import Subtitle from './subtitle';
import Logger from '../service/logger';
import Vast from '../service/vast';

class Player {

  /**
   * This is for Player operations. It depends to Device. Some methods are abstracted by Devices
   *
   * @param {Object} currentDevice - Current device object
   * @param {Object} events - Events class inheritance
   * @param {Object} config - Config object
   *
   * @class Player
   * @constructor
   */
  constructor(currentDevice, events, config) {
    this.currentDevice = currentDevice;
    this.Events = events;
    Logger.addLog('Player', 'create', 'Player Class Initialized');
    this.Config = config;
  }

  /**
   * Creates Video element. It creates a HTML5 video element with config videoPlayerId
   * Then you can reach this video element with this.videoElement
   * It appends this video element to body. You have to set it to a fixed position with css.
   * Most of Tv manufacturers runs its own video player and its position fixed to (0,0) cooridnates
   * Its important to consider your design
   *
   * @method createVideoElement
   * @for Player
   * @return null
   */
  createVideoElement() {
    if (this.videoElement) {
      this.deleteVideoElement();
    }
    this.videoElement = document.createElement('video');
    this.videoElement.style.position = 'absolute';
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.setAttribute('width', this.Config.width);
    this.videoElement.setAttribute('height', this.Config.height);
    this.videoElement.setAttribute('id', this.Config.videoPlayerId);
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.style.visibility = 'hidden';
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('NULL', 'WEB');
    this.registerVideoEvents();
    Logger.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
    return null;
  }

  /**
   * Sets this.playerInfo with initial values. This values usefull for later usages
   * For example Vast, device specific, DRM Type etc we are using this object
   *
   * @for Player
   * @method setPlayerInfo
   * @return {Object} this.playerInfo
   */
  setPlayerInfo(type, organizer) {
    this.playerInfo = {
      canPlay: false,
      canPlayThrough: false,
      playbackRate: 1,
      duration: null,
      currentState: null,
      dataLoaded: false,
      metaDataLoaded: false,
      isSeeking: false,
      isStalled: false,
      currentVolume: 1,
      customData: null,
      drmType: type,
      drmOrganizer: organizer,
      src: null,
      adsEnabled: false,
      adsType: null,
      subtitleEnabled: false,
      uhd: false
    };
    return this.playerInfo;
  }

  /**
   * Removes videoElement from DOM.
   * Its recommended to call this function if you are consider to close video
   * TODO We have to check DRM inited if yes we have to detach DRM before removing
   *
   * @for Player
   * @method deleteVideoElement
   * @return {Boolean}
   */
  deleteVideoElement() {
    this.pause();
    let videoElement = this.videoElement || this.objectPlayer;
    if (videoElement) {
      videoElement.stop();
      document.body.removeChild(videoElement);
      videoElement = null;
    }
    return true;
  }

  /**
   * Adds video source to element.
   * If trying to play DRM video you have to send customData with video source
   * It sets this customData to player info so it can be accessible.
   * Checks content address if it includes manifest regex it will start DRM functions automatically
   * It catches DRM providers with currentDevice
   * You can send HLS, Live HLS and Microsoft SS (PlayReady) content
   * TODO DRM providers can be included in another function
   *
   * @param {String} src - Source url for video content
   * @param {String} customData - Custom Data
   *
   * @for Player
   * @method addVideoSource
   *
   */
  addVideoSource(src, contentType, customData, drm) {
    const _this = this;
    this.autoLoop = false;
    this.playerInfo.customData = customData;
    this.playerInfo.src = src;
    this.playerInfo._contentType = contentType;
    this.playerInfo._drm = drm;
    this.playerInfo._customData = { ...customData };

    console.log('playerInfo -> ' + JSON.stringify(_this.playerInfo));
    if (this.playerInfo._drm) {
      console.log(
        'Found playReady Content & drmType is ' +
        this.playerInfo.drmType +
        ' drmOrganizer ' +
        this.playerInfo.drmOrganizer
      );
      switch (this.playerInfo.drmOrganizer) {
        case 'OIPF':

          var oipfMessage =
            '<?xml version="1.0" encoding="utf-8"?>' +
            '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">' +
            '<LicenseServerUriOverride>' +
            '<LA_URL>' +
            _this.Config.DRM.playReady.licenserUrl +
            '</LA_URL>' +
            '</LicenseServerUriOverride>' +
            '<SetCustomData><CustomData>' +
            _this.playerInfo._customData +
            '</CustomData></SetCustomData></PlayReadyInitiator>';

          var mimeType = this.Config.DRM.playReady.mimeType;
          var DRMSystemID = this.Config.DRM.playReady.DRMSystemID;

          this.OIPFDrmObject.sendDRMMessage(mimeType, oipfMessage, DRMSystemID);

          if (this.videoElement) {
            this.videoElement.style.visibility = 'visible';
            this.sourceElement = document.createElement('source');
            this.sourceElement.setAttribute('src', this.playerInfo.src);
            if (!this.videoElement.firstChild) {
              this.videoElement.appendChild(this.sourceElement);
            }
            this.videoElement.load();
          } else if (this.objectPlayer) {
            this.objectVideoEvents();
            this.objectPlayer.style.visibility = 'visible';
            this.objectPlayer.setAttribute('type', 'application/vnd.ms-sstr+xml');
            this.objectPlayer.setAttribute('data', this.playerInfo.src);
          }
          break;
        case 'TIZEN':
          var avplayVersion = webapis.tvinfo.getVersion();
          this.videoElement.style.visibility = 'visible';
          webapis.avplay.close();
          webapis.avplay.open(_this.playerInfo.src);

          var drmParam = {
            LicenseServer: this.Config.DRM.playReady.licenserUrl,
            CustomData: customData
          };
          if (String(src)
            .match(/\/manifest/i)) {
            webapis.avplay.setDrm('PLAYREADY', 'SetProperties', JSON.stringify(drmParam));
          } else if (String(src)
            .match(/\.wvm/)) {
            webapis.avplay.setStreamingProperty('WIDEVINE', {});
            webapis.avplay.setDrm('WIDEVINE_CLASSIC', 'SetProperties', JSON.stringify(drmParam));
          }

          // if (parseInt(avplayVersion) >= 3) {
          // 	webapis.avplay.prepare();
          // } else {
          // 	webapis.avplay.prepareAsync(
          // 		function () {
          // 			console.log("prepare success");
          // 		},
          // 		function () {
          // 			console.log("prepare failed");
          // 		}
          // 	);
          // }

          webapis.avplay.prepareAsync(function () {
            tizen.systeminfo.getPropertyValue('DISPLAY', function (result) {
              webapis.avplay.setDisplayRect(0, 0, result.resolutionWidth, result.resolutionHeight);
              if (webapis.productinfo.isUdPanelSupported()) {
                console.log('4K UHD is supported');
                _this.playerInfo.uhd = true;
              }
            });
          });

          break;
        case 'WEBOS':
          this.setupWebOSDrm();
          this.videoElement.style.visibility = 'visible';
          this.Events.addListener('DRM_WebOSReady', function () {
            _this.sourceElement = document.createElement('source');
            _this.sourceElement.setAttribute('src', _this.playerInfo.src);
            _this.sourceElement.setAttribute(
              'type',
              'application/vnd.ms-sstr+xml;mediaOption=' + _this._WebOS.mediaOption
            );
            if (!_this.videoElement.firstChild) {
              _this.videoElement.appendChild(_this.sourceElement);
            }
            document.body.setAttribute('onunload', _this.unloadDrmClient);
          });
          break;
        default:
          console.log('STANDART');
      }
    } else {
      if ('tizen' in window && 'webapis' in window) {
        this.videoElement.style.visibility = 'visible';
        webapis.avplay.close();
        webapis.avplay.open(_this.playerInfo.src);

        webapis.avplay.prepareAsync(function () {
          tizen.systeminfo.getPropertyValue('DISPLAY', function (result) {
            webapis.avplay.setDisplayRect(0, 0, result.resolutionWidth, result.resolutionHeight);
            if (webapis.productinfo.isUdPanelSupported()) {
              console.log('4K UHD is supported');
              _this.playerInfo.uhd = true;
            }
          });
        });

      } else if (this.videoElement) {
        let options = {};
        options.mediaTransportType = String(src)
          .match(/\.m3u8/) ? 'HLS' : 'URI';
        options.mediaFormat = {};
        options.mediaFormat.type = 'video';
        options.adaptiveStreaming = {};
        options.adaptiveStreaming.apativeResolution = true;
        options.adaptiveStreaming.seamlessPlay = true;
        options.option = {};

        let mediaOption = escape(JSON.stringify(options));

        this.videoElement.style.visibility = 'visible';
        // this.videoElement.src = this.playerInfo.src;
        this.sourceElement = document.createElement('source');
        this.sourceElement.setAttribute('src', this.playerInfo.src);

        if (String(src)
          .match(/\/manifest/i)) {
          this.sourceElement.setAttribute('type', 'application/vnd.ms-sstr+xml;mediaOption=' + mediaOption);
        } else if (String(src)
          .match(/\.wvm/)) {
          this.sourceElement.setAttribute('type', 'video/mp4;mediaOption=' + mediaOption);
        } else if (String(src)
          .match(/\.mp4/)) {
          this.sourceElement.setAttribute('type', 'video/mp4;mediaOption=' + mediaOption);
        } else if (String(src)
          .match(/\.m3u8/)) {
          this.sourceElement.setAttribute(
            'type',
            'application/vnd.apple.mpegurl;mediaOption=' + mediaOption
          );
        }

        if (!this.videoElement.firstChild) {
          this.videoElement.appendChild(this.sourceElement);
        }

        if (this.videoElement.readyState != 0) {
          this.videoElement.load();
        }
      } else if (this.objectPlayer) {
        this.objectVideoEvents();
        this.objectPlayer.style.visibility = 'visible';
        this.objectPlayer.setAttribute('data', this.playerInfo.src);
        if (this.currentDevice.brandName == 'seraphic') {
          this.objectPlayer.setAttribute('type', 'video/mpeg4');
        }
      }
    }
    Logger.addLog('Player', 'info', 'This is a DRM-Free Content');
  }

  /**
   * Initialize ads with given source and type. So type is mandatory field to operate
   *
   * @param {String} type - Type of ads source 'VMAP' or just 'VAST'
   * @param url - Url of ads source VMAP or VAST Url
   *
   * @for Player
   * @method initAds
   * @return {*}
   */
  initAds(type, url) {
    const _this = this;
    _this.playerInfo.adsType = type;
    _this.playerInfo.adsEnabled = true;
    switch (type) {
      case 'VMAP': // eslint-disable-line
        const xhr = new window.XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        _this.Events.on('vmapLoaded', (vmapObject) => {
          _this.prepareVastFromVmap(vmapObject);
        });
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            // Parse VMAP
            Vast.parseVMAP(xhr.responseXML, _this.Events);
            Logger.addLog('Player - ADS', 'info', 'VMAP Target Loaded Successfully');
            _this.addAdsCaption();
          }
        };
        break;
      case 'VAST':
        console.log('VAST');
        break;
      default:
        return Logger.addLog('Player - Ads', 'error', '');
    }
  }

  /**
   * If ads type is VMAP and detected in initAds method it will call automatically this function
   *
   * @param {Object} vmapObject - Vmap object its response of VMAP XML
   *
   * @for Player
   * @method prepareVastFromVmap
   */
  prepareVastFromVmap(vmapObject) {
    // Create Wrapper Div
    this.wrapperDiv = document.createElement('div');
    this.wrapperDiv.className = 'vastWrapper';
    this.wrapperDiv.id = `vastWrapper_${this.Config.videoPlayerId}`;
    this.videoElement.parentNode.insertBefore(this.wrapperDiv, this.videoElement);
    this.wrapperDiv.appendChild(this.videoElement);
    this.vastElement = this.videoElement.cloneNode(true);
    this.vastElement.id = 'vast-player';
    this.vastElement.style.visibility = 'hidden';
    // this.vastElement.childNodes[0].src = '';
    this.vastElement.src = '';
    this.wrapperDiv.appendChild(this.vastElement);
    this.vastTrackElement = document.createElement('img');
    this.vastTrackElement.setAttribute('src', 'deneme');
    document.body.appendChild(this.vastTrackElement);
    this.vastReadyItems = [];
    this.adsInProgress = false;
    for (let i = 0; i < vmapObject.length; i += 1) {
      this.vastReadyItems.push(this.readVastFile(vmapObject[i].url, this.Config.vastOptions));
    }
    for (let j = 0; j < Vast.vastArray.length; j += 1) {
      if (Vast.vastArray[j].time === 'end') {
        Vast.vastArray[j].time = (Math.floor(this.videoElement.duration) - 1);
      }
    }
  }

  /**
   * Reads Vast file and seperates its source and options (extensions, type etc)
   *
   * @param {String} vastUrl - URL address for Vast
   * @param {Object} options - It stands for this.config.vastOptions
   * @for Player
   * @method readVastFile
   * @return {{}}
   */
  readVastFile(vastUrl, options) { // eslint-disable-line

    // Read XML file
    let xmlHttpReq;
    let xmlDoc;
    if (window.XMLHttpRequest) {
      xmlHttpReq = new XMLHttpRequest();
    } else {
      xmlHttpReq = new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
    }
    xmlHttpReq.open('GET', vastUrl, false);
    xmlHttpReq.send();
    xmlDoc = xmlHttpReq.responseXML; // eslint-disable-line

    const vastObj = {};

    // Get impression tag
    const impression = xmlDoc.getElementsByTagName('Impression');
    if (impression != null) {
      // obj_vast.impression_url = impression[0].childNodes[0].nodeValue;
      vastObj.impression = impression;
      // alert(obj_vast.impression_url);
    }

    // Get Creative
    const creative = xmlDoc.getElementsByTagName('Creative');
    let mediaFiles;
    let trackingEvents;
    for (let i = 0; i < creative.length; i += 1) {
      const creativeLinear = creative[i].getElementsByTagName('Linear');
      if (creativeLinear != null) {
        for (let j = 0; j < creativeLinear.length; j += 1) {
          // Get media files
          const creativeLinearMediaFiles = creativeLinear[j].getElementsByTagName('MediaFiles');
          if (creativeLinearMediaFiles != null) {
            for (let k = 0; k < creativeLinearMediaFiles.length; k += 1) {
              const creativeLinearMediaFile = creativeLinearMediaFiles[k].getElementsByTagName('MediaFile');
              if (creativeLinearMediaFile != null) {
                mediaFiles = creativeLinearMediaFile;
              }
            }
          }

          // Get Clickthrough URL
          const creativeLinearVideoClicks = creativeLinear[j].getElementsByTagName('VideoClicks');
          if (creativeLinearVideoClicks != null) {
            for (let k = 0; k < creativeLinearVideoClicks.length; k += 1) {
              const creativeLineartVClicksClickthrough = creativeLinearVideoClicks[k].getElementsByTagName('ClickThrough')[0].childNodes[0].nodeValue;
              const creativeLineartVClicksClickthroughTracking = creativeLinearVideoClicks[k].getElementsByTagName('ClickTracking');
              if (creativeLineartVClicksClickthrough != null) {
                vastObj.clickthroughUrl = creativeLineartVClicksClickthrough;
              }
              if (creativeLineartVClicksClickthroughTracking != null) {
                vastObj.clickthroughTracking = creativeLineartVClicksClickthroughTracking;
              }
            }
          }

          // Get Tracking Events
          const creativeLinearTrackingEvents = creativeLinear[j].getElementsByTagName('TrackingEvents');
          if (creativeLinearTrackingEvents != null) {
            for (let k = 0; k < creativeLinearTrackingEvents.length; k += 1) {
              const creativeLinearTrackingEventsTracking = creativeLinearTrackingEvents[k].getElementsByTagName('Tracking');
              if (creativeLinearTrackingEventsTracking != null) {
                trackingEvents = creativeLinearTrackingEventsTracking;
              }
            }
          }

          // Get AD Duration

          const creativeLinearDuration = creativeLinear[j].getElementsByTagName('Duration')[0];
          if (creativeLinearDuration != null) {
            vastObj.duration = creativeLinearDuration.childNodes[0].nodeValue;
            // alert(obj_vast.duration);
            const arrD = vastObj.duration.split(':');
            const strSecs = (+arrD[0]) * 60 * 60 + (+arrD[1]) * 60 + (+arrD[2]);
            vastObj.duration = strSecs;
          }
        }
      }
    }

    if (typeof mediaFiles !== 'undefined') {
      for (let i = 0; i < mediaFiles.length; i += 1) {
        if (mediaFiles[i].getAttribute('type') === options.media_type) {
          if ((mediaFiles[i].getAttribute('bitrate') > options.media_bitrate_min) && (mediaFiles[i].getAttribute('bitrate') < options.media_bitrate_max)) {
            vastObj.mediaFile = mediaFiles[i].childNodes[0].nodeValue;
          }
        }
      }
    }

    if (typeof trackingEvents !== 'undefined') {
      for (let i = 0; i < trackingEvents.length; i += 1) {
        if (trackingEvents[i].getAttribute('event') === 'start') {
          if (vastObj.trackingStart != null) {
            vastObj.trackingStart += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingStart = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingStartTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'firstQuartile') {
          if (vastObj.trackingFirstQuartile != null) {
            vastObj.trackingFirstQuartile += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingFirstQuartile = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.tracking_first_quartile_tracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'midpoint') {
          if (vastObj.trackingMidpoint != null) {
            vastObj.trackingMidpoint += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingMidpoint = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingMidpointTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'thirdQuartile') {
          if (vastObj.trackingThirdQuartile != null) {
            vastObj.trackingThirdQuartile += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingThirdQuartile = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingThirdQuartileTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'complete') {
          if (vastObj.trackingComplete != null) {
            vastObj.trackingComplete += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingComplete = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingCompleteTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'mute') {
          if (vastObj.trackingMute != null) {
            vastObj.trackingMute += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingMute = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingMuteTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'unmute') {
          if (vastObj.trackingUnmute != null) {
            vastObj.trackingUnmute += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingUnmute = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingUnmuteTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'pause') {
          if (vastObj.trackingPause != null) {
            vastObj.trackingPause += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingPause = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingPauseTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'resume') {
          if (vastObj.trackingResume != null) {
            vastObj.trackingResume += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingResume = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingResumeTracked = false;
        }
        if (trackingEvents[i].getAttribute('event') === 'fullscreen') {
          if (vastObj.trackingFullscreen != null) {
            vastObj.trackingFullscreen += ` ${trackingEvents[i].childNodes[0].nodeValue}`;
          } else {
            vastObj.trackingFullscreen = trackingEvents[i].childNodes[0].nodeValue;
          }
          vastObj.trackingFullscreenTracked = false;
        }
      }
    }

    // Tracking events

    return vastObj;
  }

  /**
   * This function is triggered with timeUpdate event of video player.
   * It compares with Vast time with current time
   *
   * @for Player
   * @method checkAdsStatus
   */
  checkAdsStatus() {
    if (!this.adsInProgress) {
      // let currentTime = Math.floor(this.videoElement.currentTime);
      if (this.videoElement.currentTime >= Vast.vastArray[0].time) {
        this.adsInProgress = true;
        this.pause();
        this.initVastAd(this.videoElement.currentTime);
      }
    }
  }

  /**
   * It starts ads in videoPlayer. Pauses current video then starting ads
   * After completing ads it starts old src url with initial seeking with time
   *
   * @param time - current time of video player
   * @for Player
   * @method initVastAd
   */
  initVastAd(time) {
    const _this = this;
    this.videoElement.src = '';
    this.captionDiv.style.visibility = 'visible';
    this.captionDiv.innerHTML = 'Reklamlar Yükleniyor';
    this.vastElement.src = this.vastReadyItems[0].mediaFile;
    this.vastElement.removeAttribute('controls');
    this.vastElement.addEventListener('loadedmetadata', () => {
      _this.videoElement.style.visibility = 'hidden';
      _this.vastElement.style.visibility = 'visible';
      _this.captionDiv.innerHTML = _this.Config.vastOptions.ad_caption;
      console.log('Meta Data YüklenDi');
      _this.vastElement.play();
    });
    this.vastElement.addEventListener('ended', () => {
      console.log('Bitti');
      _this.vastElement.style.visibility = 'hidden';
      _this.videoElement.style.visibility = 'visible';
      _this.captionDiv.style.visibility = 'hidden';
      _this.adsInProgress = false;
      _this.videoElement.src = _this.playerInfo.src;
      _this.videoElement.currentTime = time;
      _this.play();
    });
    this.vastElement.addEventListener('play', () => {
      console.log('Reklam Başladı');
    });
    console.log(`init ettik${time}`);
    Vast.vastArray.splice(0, 1);
    _this.vastReadyItems.splice(0, 1);

  }

  /**
   * Adds ads caption to video player to end user notified about Ads
   * This text can be edited via config
   *
   * @return {boolean}
   *
   * @for Player
   * @method addAdsCaption
   */
  addAdsCaption() {
    this.captionDiv = document.createElement('div');
    this.captionDiv.className = 'vastCaption';
    this.captionDiv.id = `vastCaption_${this.Config.videoPlayerId}`;
    this.captionDiv.innerHTML = this.Config.vastOptions.ad_caption;
    this.wrapperDiv.appendChild(this.captionDiv);
    // Adjust style
    this.captionDiv.style.left = `${(this.vastElement.offsetWidth / 2) - (document.getElementsByClassName('vastCaption')[0].offsetWidth / 2)}px`;
    this.captionDiv.style.visibility = 'hidden';
    return true;
  }

  /**
   * Unloads DRM client. !IMPORTANT! Some devices may be crash if you are not unloaded drm client
   *
   * @for Player
   * @method unloadDrmClient
   */
  unloadDrmClient() {
    console.log('Unload Geldi');
    const _this = this;
    if (this.currentDevice.brandName === 'webos' && _this._WebOS.isDrmClientLoaded) {
      webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
        method: 'unload',
        parameters: { clientId: _this._WebOS.clientId },
        onSuccess: (result) => {
          _this._WebOS.isDrmClientLoaded = false;
          console.log('DRM Client is unloaded successfully.');
        },
        onFailure: (result) => {
          console.log(`[${result.errorCode}] ${result.errorText}`);
          // Do something for error handling
        }
      });
    }
  }

  /**
   * Initialize WebOs DRM
   * TODO This can be move to webos device with abstract
   *
   * @for Player
   * @method setupWebOSDrm
   */
  setupWebOSDrm() {
    console.log('setupWebOSDrm calıstı');
    const _this = this;
    _this._WebOS = {};

    _this._WebOS.appId = 'com.blu.smarttv';
    _this._WebOS.clientId = '';
    _this._WebOS.isDrmClientLoaded = '';

    webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
      method: 'load',
      parameters: {
        drmType: _this.playerInfo.drmType,
        appId: _this._WebOS.appId
      },
      onSuccess: (result) => {
        _this._WebOS.clientId = result.clientId;
        _this._WebOS.isDrmClientLoaded = true;
        console.log('DRM Client is loaded successfully.');
        _this.sendWebOSDrm();
      },
      onFailure: (result) => {
        console.log(`[${result.errorCode}] ${result.errorText}`);
        // Do something for error handling
      }
    });
  }

  /**
   * WebOs Drm trigger
   *
   * @for Player
   * @method sendWebOSDrm
   */
  sendWebOSDrm() {
    this._WebOS.msg = `<?xml version="1.0" encoding="utf-8"?>
    <PlayReadyInitiator xmlns= "http://schemas.microsoft.com/DRM/2007/03/protocols/">
    <LicenseAcquisition>
    <Header><WRMHEADER xmlns= "http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.0.0.0">
    <DATA>
    <PROTECTINFO>
    <KEYLEN>16
    </KEYLEN>
    <ALGID>AESCTR</ALGID>
    </PROTECTINFO>
    <LA_URL>${this.Config.DRM.licenserUrl}</LA_URL>
    <KID>lFmb2gxg0Cr5bfEnJXgJeA==</KID>
    <CHECKSUM>P7ORpD2IpA==</CHECKSUM>
    </DATA>
    </WRMHEADER>
    </Header>
    <CustomData>${this.playerInfo.customData}</CustomData>
    </LicenseAcquisition>
    </PlayReadyInitiator>`;

    const _this = this;

    webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
      method: 'sendDrmMessage',
      parameters: {
        clientId: this._WebOS.clientId,
        msgType: this.Config.DRM.mimeType,
        msg: this._WebOS.msg,
        drmSystemId: this.Config.DRM.drmSystemId
      },
      onSuccess: (result) => {
        _this._WebOS.msgId = result.msgId;
        _this._WebOS.resultCode = result.resultCode;
        _this._WebOS.resultMsg = result.resultMsg;
        console.log(`Message ID: ${_this._WebOS.msgId}`);
        console.log(`[${_this._WebOS.resultCode}] ${_this._WebOS.resultMsg}`);
        _this._WebOS.options = {};
        _this._WebOS.options.option = {};
        _this._WebOS.options.option.drm = {};
        _this._WebOS.options.option.drm.type = _this.playerInfo.drmType;
        _this._WebOS.options.option.drm.clientId = _this._WebOS.clientId;
        _this._WebOS.mediaOption = escape(JSON.stringify(_this._WebOS.options));
        _this.Events.triggerEvent('DRM_WebOSReady');
        if (_this._WebOS.resultCode !== 0) {
          // Do Handling DRM message error
        }
      },
      onFailure: (result) => {
        console.log(`[${result.errorCode}] ${result.errorText}`);
      }
    });

  }

  /**
   * Constructor for Audio class
   *
   * @for Player
   * @method initAudioClass
   */
  initAudioClass() {
    this.Audio = new Audio();
    this.changeAudioWithOrder = this.Audio.changeAudioWithOrder;
    this.getCurrentAudioWithOrder = this.Audio.getCurrentAudioWithOrder;
    this.denemeSERDAR = this.Audio.getThis;
  }

  /**
   * Add Subtitle Method
   *
   * @for Player
   * @method initAudioClass
   */
  addSubtitle(srt, targetElement) {
    this.removeSubtitle();
    this.Events.addListener('player_onTimeUpdate', () => {
      this.playerInfo.subtitleEnabled && this.Subtitle.tick();
    });
    this.Events.addListener('player_onEnded', () => {
      if (this.playerInfo.subtitleEnabled) {
        this.Subtitle.target.innerText = '';
      }
    });
    this.playerInfo.subtitleEnabled = true;
    this.Subtitle = new Subtitle(srt, this, targetElement);
  }

  removeSubtitle() {
    this.Events.removeListener('player_onTimeUpdate', () => {
      this.playerInfo.subtitleEnabled && this.Subtitle.tick();
    });
    this.Events.removeListener('player_onEnded', () => {
      if (this.playerInfo.subtitleEnabled) {
        this.Subtitle.target.innerText = '';
      }
    });
    this.playerInfo.subtitleEnabled = false;
    this.Subtitle = null;
    this.currentSub = null;
    this.subs = null;
  }

  addTracks(tracks) {
    for (const trackItem of tracks) {
      const track = document.createElement('track');
      track.kind = 'captions';
      track.label = trackItem.label;
      track.srclang = trackItem.code;
      track.src = trackItem.src;
      this.videoElement.appendChild(track);
    }
  }

  enableTrack(track) {
    if (!this.videoElement.textTracks || this.videoElement.textTracks.length) return;
    for (const trackItem of this.videoElement.textTracks) {
      console.log(trackItem.language, track);
      trackItem.mode = trackItem.language === track ? 'showing' : 'disabled';
    }
  }

  /**
   * Play trigger for videoElement
   *
   * @for Player
   * @method play
   */
  play() {
    const { tizen, webapis } = window;
    try {
      if (tizen && webapis) {
        webapis.avplay.play();
        console.log('video oynatılıyor...');
      } else if (this.videoElement) {
        this.videoElement.play();
      } else if (this.objectPlayer) {
        this.objectPlayer.play(1);
      }
      this.Events.triggerEvent('player_onPlay', ['Play']);
      this.playerInfo.currentState = 'Play';
    } catch (error) {
      console.log('player not ready', error.message);
    }

    if (tizen && webapis) {
      webapis.appcommon.setScreenSaver(
        webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_OFF,
        (result) => {
          console.log('screen saver disabled', result);
        },
        (error) => {
          console.log(JSON.stringify(error));
        }
      );
    }
  }

  /**
   * Stop trigger for videoElement
   * it removes video element from dom
   *
   * @for Player
   * @method stop
   */
  stop() {
    this.Events.removeAllListeners();
    this.deleteVideoSource();
  }

  /**
   * Pause trigger for videoElement
   *
   * @for Player
   * @method pause
   */
  pause() {
    const { tizen, webapis } = window;
    if (tizen && webapis) {
      webapis.avplay.pause();
      this.Events.triggerEvent('player_onPause', ['Pause']);
    } else if (this.videoElement) {
      this.videoElement.pause();
      this.Events.triggerEvent('player_onPause', ['Pause']);
    } else if (this.objectPlayer) {
      this.objectPlayer.play(0);
      this.Events.triggerEvent('player_onPause', ['Pause']);
    }
    this.playerInfo.currentState = 'Paused';
  }

  /**
   * Play/Pause toggle trigger for videoElement
   *
   * @for Player
   * @method togglePlay
   */
  togglePlay() {
    const { tizen, webapis } = window;
    if (tizen && webapis) {
      if (webapis.avplay.getState() === 'PLAYING') {
        this.pause();
      } else {
        this.play();
      }
    } else if (this.videoElement) {
      if (this.videoElement.paused) {
        this.play();
      } else {
        this.pause();
      }
    } else if (this.objectPlayer) {
      if (this.objectPlayer.playState === 2) {
        this.play();
      } else {
        this.pause();
      }
    }
  }

  /**
   * Play trigger for a video element with endless autoloop
   * you can use this feature to enable silent background videos
   *
   * @for Player
   * @method playWithLoop
   */
  playWithLoop() {
    this.autoLoop = true;
    this.play();
    this.playerInfo.currentState = 'Play';
  }

  /**
   * Trigger specific events for all videoElement trigger
   * @for Player
   * @method tizenRegisterEvents
   */
  tizenRegisterEvents() {
    const { tizen, webapis } = window;
    const listener = {
      onbufferingstart: () => {
        console.log('Buffering start.');
        this.Events.triggerEvent('player_onWaiting');
      },
      onbufferingprogress: (percent) => {
        // console.log("Buffering progress data : " + percent);
      },
      onbufferingcomplete: () => {
        console.log('Buffering complete.');
        this.Events.triggerEvent('player_onDurationChange', [Math.trunc(webapis.avplay.getDuration())]);
        this.playerInfo.duration = Math.trunc(webapis.avplay.getDuration() / 1000);
        if (this.playerInfo.subtitleEnabled) {
          this.Subtitle.target.innerText = '';
          this.Subtitle.setCurrentSubtitle();
        }
        const avplayState = webapis.avplay.getState();
        if (
          avplayState !== 'IDLE' &&
          avplayState !== 'NONE' &&
          avplayState === 'READY' &&
          (this.autoLoop === true ||
            this.playerInfo.currentState === 'Play' ||
            this.playerInfo.currentState === 'Playing')
        ) {
          this.playerInfo.currentState = 'Play';
          webapis.avplay.play();
          console.log('buffer completed, video play');
        }
      },
      onstreamcompleted: () => {
        console.log('Stream Completed autoLoop: ', this.autoLoop);
        this.playerInfo.currentState = 'Finished';
        this.Events.triggerEvent('player_onEnded', ['Video Finished']);
        const avplayState = webapis.avplay.getState();
        if (
          avplayState !== 'IDLE' &&
          avplayState !== 'NONE' &&
          (avplayState === 'PLAYING' || avplayState === 'READY') &&
          this.autoLoop === true
        ) {
          console.log('loop video devam et...');
          webapis.avplay.seekTo(0);
        } else if (tizen && webapis) {
          webapis.appcommon.setScreenSaver(
            webapis.appcommon.AppCommonScreenSaverState.SCREEN_SAVER_ON,
            (result) => {
              console.log('screen saver enabled', result);
            },
            (error) => {
              console.log(JSON.stringify(error));
            }
          );
        }
      },
      oncurrentplaytime: (currentTime) => {
        this.Events.triggerEvent('player_onTimeUpdate', [Math.trunc(currentTime)]);
        const state = webapis.avplay.getState();
        switch (state) {
          case 'PLAYING':
            this.Events.triggerEvent('player_onPlay', ['Play']);
            this.playerInfo.currentState = 'Play';
            break;

          case 'PAUSED':
            this.Events.triggerEvent('player_onPause', ['Pause']);
            this.playerInfo.currentState = 'Paused';
            break;

          case 'READY':
            this.Events.triggerEvent('player_onMetaDataLoaded', ['Meta Data Loaded']);
            this.playerInfo.metaDataLoaded = true;
            break;

          case 'IDLE':
            this.Events.triggerEvent('player_onDataLoaded', ['Data Loaded']);
            this.playerInfo.dataLoaded = true;
            break;

          default:
            break;
        }
      },
      onerror: (eventType) => {
        console.log(`event type error : ${eventType}`);
        this.Events.triggerEvent('player_onError', [eventType]);
        this.playerInfo.currentState = 'Error';
      },
      onevent: (eventType, eventData) => {
        console.log(`event type: ${eventType}`, `data: ${eventData}`);
      },
      onsubtitlechange: (duration, text, data3, data4) => {
        console.log(`subtitleText: ${text}`);
      },
      ondrmevent: (drmEvent, drmData) => {
        console.log(`DRM callback: ${drmEvent}`, `data: ${drmData}`);
      }
    };
    webapis.avplay.setListener(listener);
  }

  /**
   * Trigger create object player for object player
   * @for Arçelik Player && Seraphic Player
   * @method createObjectPlayer
   */
  createObjectPlayer(idName) {
    this.objectPlayer = document.createElement('object');
    this.objectPlayer.setAttribute('id', idName);
    this.objectPlayer.setAttribute('type', 'video/mpeg4');
    this.objectPlayer.setAttribute('class', 'player');
    this.objectPlayer.setAttribute('data', '');
    this.objectPlayer.setAttribute('width', this.Config.width);
    this.objectPlayer.setAttribute('height', this.Config.height);
    this.objectPlayer.style.position = 'absolute';
    this.objectPlayer.style.left = '0px';
    this.objectPlayer.style.top = '0px';
    this.objectPlayer.style.zIndex = -1;
    this.objectPlayer.style.visibility = 'hidden';
    document.body.appendChild(this.objectPlayer);
    Logger.addLog('Player', 'info', 'Object Player Created');
  }

  /**
   * Trigger specific events for all object player trigger (arcelikPlayer)
   * @for Player
   * @method objectVideoEvents
   */
  objectVideoEvents() {
    this.audioLoaded = false;
    const playStates = ['stopped', 'playing', 'paused', 'connecting', 'buffering', 'finished', 'error'];
    // 0 stopped
    // 1 playing
    // 2 paused
    // 3 connecting
    // 4 buffering
    // 5 finished
    // 6 error
    // const pr = ['data', 'type', 'playPosition', 'playTime', 'playState', 'error', 'speed'];
    let ps;
    if (!this.objectInterval) {
      this.objectPlayer.onPlayStateChange = (event) => {
        ps = this.objectPlayer.playState;
        console.log(`event -> ${playStates[ps]} -> ${ps}`);
        let error = '';
        switch (ps) {
          case 0:
            this.playerInfo.currentState = 'Stopped';
            this.Events.triggerEvent('player_onEnded', ['Video Stopped']);
            break;
          case 1:
            // get duration
            this.Events.triggerEvent('player_onDurationChange', [Math.trunc(this.objectPlayer.playTime)]);
            this.playerInfo.duration = Math.trunc(this.objectPlayer.playTime / 1000);
            this.Events.triggerEvent('player_onPlay', ['Play']);
            this.playerInfo.currentState = 'Play';
            break;
          case 2:
            this.Events.triggerEvent('player_onPause', ['Pause']);
            this.playerInfo.currentState = 'Paused';
            break;
          case 3:
            this.Events.triggerEvent('player_onProgress', ['Downloading Video']);
            break;
          case 4:
            this.Events.triggerEvent('player_onWaiting');
            if (this.playerInfo.subtitleEnabled) {
              this.Subtitle.target.innerText = '';
              this.Subtitle.setCurrentSubtitle();
            }
            break;
          case 5:
            this.playerInfo.currentState = 'Finished';
            this.Events.triggerEvent('player_onEnded', ['Video Finished']);
            if (this.autoLoop && ps !== 0) {
              this.objectPlayer.play(1);
            }
            break;
          case 6:
            switch (this.objectPlayer.error) {
              case 0:
                error = 'A/V format not supported';
                break;
              case 1:
                error = 'cannot connect to server or lost connection';
                break;
              case 2:
                error = 'unidentified error';
                break;
              default:
                break;
            }
            this.Events.triggerEvent('player_onError', [error]);
            this.playerInfo.currentState = 'Error';
            break;
          default:
            break;
        }
      };
      this.objectInterval = setInterval(() => {
        if (this.objectPlayer.playState === 1) {
          // trigger current time
          this.Events.triggerEvent('player_onTimeUpdate', [Math.trunc(this.objectPlayer.playPosition)]);
        }
      }, 500);
    }
  }

  /**
   * Trigger specific events for all videoElement trigger
   * @for Player
   * @method registerVideoEvents
   */
  registerVideoEvents() {
    this.videoElement.addEventListener('canplay', () => {
      this.playerInfo.canPlay = true;
      this.Events.triggerEvent('player_onCanPlay');
    });

    this.videoElement.addEventListener('canplaythrough', () => {
      this.playerInfo.canPlayThrough = true;
      this.Events.triggerEvent('player_onCanPlayThrough');
    });

    this.videoElement.addEventListener('durationchange', () => {
      this.Events.triggerEvent('player_onDurationChange', [Math.trunc(this.videoElement.duration)]);
      this.playerInfo.duration = this.videoElement.duration;
    });

    this.videoElement.addEventListener('ended', () => {
      this.playerInfo.currentState = 'Finished';
      this.Events.triggerEvent('player_onEnded', ['Video Finished']);
      if (this.autoLoop) {
        this.playWithLoop();
      }
    });

    this.videoElement.addEventListener('loadeddata', () => {
      this.Events.triggerEvent('player_onDataLoaded', ['Data Loaded']);
      this.playerInfo.dataLoaded = true;
      if (this.playerInfo.subtitleEnabled) {
        this.Subtitle.target.innerText = '';
        this.Subtitle.setCurrentSubtitle();
      }
    });

    this.videoElement.addEventListener('loadedmetadata', () => {
      this.Events.triggerEvent('player_onMetaDataLoaded', ['Meta Data Loaded']);
      this.playerInfo.metaDataLoaded = true;
    });

    this.videoElement.addEventListener('error', () => {
      let errorMessage = JSON.stringify(this.videoElement.error);
      if (this.videoElement.error && this.videoElement.error.code) {
        switch (this.videoElement.error.code) {
          case 1:
            /* MEDIA_ERR_ABORTED */
            errorMessage = 'fetching process aborted by user';
            break;
          case 2:
            /* MEDIA_ERR_NETWORK */
            errorMessage = 'error occurred when downloading';
            break;
          case 3:
            /* = MEDIA_ERR_DECODE */
            errorMessage = 'error occurred when decoding';
            break;
          case 4:
            /* MEDIA_ERR_SRC_NOT_SUPPORTED */
            errorMessage = 'audio/video not supported';
            break;
        }
      }
      this.Events.triggerEvent('player_onError', [errorMessage]);
      this.playerInfo.currentState = 'Error';
    });

    this.videoElement.addEventListener('loadstart', () => {
      this.Events.triggerEvent('player_onLoadStart', ['Load Started']);
    });

    this.videoElement.addEventListener('pause', () => {
      this.Events.triggerEvent('player_onPause', ['Pause']);
      this.playerInfo.currentState = 'Paused';
    });

    this.videoElement.addEventListener('play', () => {
      this.Events.triggerEvent('player_onPlay', ['Play']);
      this.playerInfo.currentState = 'Play';
    });

    this.videoElement.addEventListener('playing', () => {
      this.Events.triggerEvent('player_onPlaying', ['Playing']);
      this.playerInfo.currentState = 'Playing';
    });

    this.videoElement.addEventListener('progress', () => {
      this.Events.triggerEvent('player_onProgress', ['Downloading Video']);
    });

    this.videoElement.addEventListener('ratechange', () => {
      this.Events.triggerEvent('player_onRateChange', [this.videoElement.playbackRate]);
      this.playerInfo.playbackRate = this.videoElement.playbackRate;
    });

    this.videoElement.addEventListener('seeked', () => {
      this.Events.triggerEvent('player_onSeeked', ['Seek Completed']);
      this.playerInfo.isSeeking = false;
      if (this.playerInfo.subtitleEnabled) {
        this.Subtitle.target.innerText = '';
        this.Subtitle.setCurrentSubtitle();
      }
    });

    this.videoElement.addEventListener('seeking', () => {
      this.Events.triggerEvent('player_onSeeking', ['Seek In Progress']);
      this.playerInfo.isSeeking = true;
    });

    this.videoElement.addEventListener('timeupdate', () => {
      this.Events.triggerEvent('player_onTimeUpdate', [Math.trunc(this.videoElement.currentTime)]);
      if (this.playerInfo.adsEnabled) {
        this.checkAdsStatus();
      }
    });

    this.videoElement.addEventListener('volumechange', () => {
      this.Events.triggerEvent('player_onVolumeChange', [this.videoElement.volume]);
      this.videoElement.currentVolume = this.videoElement.volume;
    });

    this.videoElement.addEventListener('waiting', () => {
      this.Events.triggerEvent('player_onWaiting');
      this.playerInfo.currentState = 'Waiting';
    });
  }

  /**
   * Drm initiator for OIPF Devices such as Vestel and Arcelik
   *
   * @for Player
   * @method createOIPFDrmAgent
   */
  createOIPFDrmAgent() {
    if (!this.OIPFDrmObject) {
      this.OIPFDrmObject = document.createElement('object');
      this.OIPFDrmObject.setAttribute('type', 'application/oipfDrmAgent');
      this.OIPFDrmObject.setAttribute('id', 'oipfDrm');
      this.OIPFDrmObject.style.display = 'none';
      document.head.appendChild(this.OIPFDrmObject);
    }
    this.OIPFDrmObject.onDRMMessageResult = (msgId, resultMsg, resultCode) => {
      console.info('msgId -> ' + msgId);
      console.info('resultMsg -> ' + resultMsg);
      console.info('resultCode -> ' + resultCode);
      if (resultCode === 0) {
        console.warn(`DRM Initialized Successfuly, Result Code = ${resultCode}!`);
      } else {
        switch (resultCode) {
          case 1:
            console.warn(`Error Code : 1 / Unknown Error - ${HtmlEncode(resultMsg)}`);
            break;
          case 2:
            console.warn('Error Code : 2 / Cannot Process Result');
            break;
          case 3:
            console.warn('Error Code : 3 / Unknown MIME Type');
            break;
          case 4:
            console.warn('Error Code : 4 / User Consent Required');
            break;
          case 5:
            console.warn('Error Code : 5 / Unknown DRM system');
            break;
          case 6:
            console.warn('Error Code : 6 / Wrong format');
            break;
          default:
            console.warn(Error, resultCode);
            break;
        }
      }
    };
  }

  /**
   * Seek with given value adding
   *
   * @param {Number} value
   * @for Player
   * @method seekWithTimeAdd
   */
  seekWithTimeAdd(value) {
    this.videoElement.currentTime += value;
  }

  /**
   * Seek to given time
   * TODO Check device performances if needed use pause method first
   *
   * @param value
   *
   * @for Player
   * @method seekToTime
   */
  seekToTime(value) {
    try {
      const { tizen, webapis } = window;
      if (tizen && webapis) {
        const state = webapis.avplay.getState();
        if (state !== 'IDLE' && state !== 'NONE') {
          webapis.avplay.seekTo(value * 1000);
        }
      } else if (this.videoElement) {
        this.videoElement.currentTime = value;
      } else if (this.objectPlayer) {
        if (this.objectPlayer.playState !== 6) {
          this.objectPlayer.seek(value * 1000);
        }
      }
      console.warn('seek to time: ', value);
    } catch (error) {
      console.info('dont overload, wait buffer completed...', error.message);
    }
  }

  /**
   * Sets currentTime to 0 and plays automatically
   *
   * @for Player
   * @method restart
   */
  restart() {
    this.pause();
    this.videoElement.currentTime = 0;
    this.play();
  }

}

export default Player;
