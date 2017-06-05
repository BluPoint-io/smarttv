import Audio from './audio';
// import Subtitle from './subtitle';
import Logger from '../service/logger';
import Vast from '../service/vast';

/** Class representing Player */
class Player {
  /**
   * Create Player
   * @param {Object} currentDevice - Current device object
   * @param {Object} events - Events class inheritance
   * @param {Object} config - Config object
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
   */
  createVideoElement() {
    if (this.videoElement) {
      this.deleteVideoElement();
    }
    this.videoElement = document.createElement('video');
    this.videoElement.style.position = 'absolute';
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.setAttribute('id', 'dtv-video');
    document.body.appendChild(this.videoElement);
    this.registerVideoEvents();
    Logger.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
    return null;
  }

  /**
   * Sets this.playerInfo with initial values. This values usefull for later usages
   * For example Vast, device specific, DRM Type etc we are using this object
   *
   * @return {Object} this.playerInfo
   */
  setPlayerInfo() {
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
      currentVolume: this.videoElement.volume,
      customData: null,
      drmType: null,
      drmOrganizer: null,
      src: null,
      adsEnabled: false,
      adsType: null
    };
    return this.playerInfo;
  }

  /**
   * Removes videoElement from DOM.
   * Its recommended to call this function if you are consider to close video
   * TODO We have to check DRM inited if yes we have to detach DRM before removing
   *
   * @return {Boolean}
   */
  deleteVideoElement() {
    this.pause();
    document.body.removeChild(this.videoElement);
    this.videoElement = false;
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
   */
  addVideoSource(src, customData) {
    this.playerInfo.customData = customData;
    this.playerInfo.src = src;
    const _this = this;
    if (src.match(/\/manifest/i)) {
      if (this.currentDevice.brandName === 'webos') {
        this.playerInfo.drmType = 'playready';
      } else {
        this.playerInfo.drmType = 'playReady';
      }
      switch (this.playerInfo.drmOrganizer) {
        case 'OIPF': // eslint-disable-line
          Logger.addLog('Player', 'info', `Found playReady Content & drmType is ${this.playerInfo.drmType}`);
          this.createOIPFDrmAgent();
          const oipfMessage = '<?xml version="1.0" encoding="utf-8"?>' +
            '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">' +
            '<SetCustomData><CustomData>dummy</CustomData></SetCustomData></PlayReadyInitiator>';
          const mimeType = this.Config.playReady.mimeType;
          const DRMSystemID = this.Config.playReady.DRMSystemID;
          this.OIPFDrmObject.sendDRMMessage(mimeType, oipfMessage, DRMSystemID);
          this.videoElement.setAttribute('src', this.playerInfo.src);
          break;
        case 'TIZEN':
          console.log('TIZEN');

          break;
        case 'WEBOS':
          this.setupWebOSDrm();
          this.Events.addListener('DRM_WebOSReady', () => {
            _this.sourceElement = document.createElement('source');
            _this.sourceElement.setAttribute('src', _this.playerInfo.src);
            _this.sourceElement.setAttribute('type', `application/vnd.ms-sstr+xml;mediaOption=${_this._WebOS.mediaOption}`);
            _this.videoElement.appendChild(_this.sourceElement);
            document.body.setAttribute('onunload', _this.unloadDrmClient);
          });
          break;
        default:
          console.log('STANDART');
      }
    } else {
      Logger.addLog('Player', 'info', 'This is a DRM-Free Content');
      // _this.sourceElement = document.createElement('source');
      // _this.sourceElement.setAttribute('src', _this.playerInfo.src);
      // _this.videoElement.appendChild(_this.sourceElement);
      this.videoElement.setAttribute('src', _this.playerInfo.src);
    }
  }

  /**
   * Initialize ads with given source and type. So type is mandatory field to operate
   *
   * @param {String} type - Type of ads source 'VMAP' or just 'VAST'
   * @param url - Url of ads source VMAP or VAST Url
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
        xhr.onreadystatechange = function() {
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
   */
  addAdsCaption() {
    this.captionDiv = document.createElement('div');
    this.captionDiv.className = 'vastCaption';
    this.captionDiv.id = `vastCaption_${this.Config.videoPlayerId}`;
    this.captionDiv.innerHTML = this.Config.vastOptions.ad_caption;
    this.wrapperDiv.appendChild(this.captionDiv);
    // Adjust style
    this.captionDiv.style.left = `${(this.vastElement.offsetWidth / 2) - (document.getElementsByClassName('vastCaption')[0].offsetWidth / 2)}px`;    this.captionDiv.style.visibility = 'hidden';
    return true;
  }

  /**
   * Unloads DRM client. !IMPORTANT! Some devices may be crash if you are not unloaded drm client
   */
  unloadDrmClient() {
    console.log('Unload Geldi');
    const _this = this;
    if (this.currentDevice.brandName === 'webos' && _this._WebOS.isDrmClientLoaded) {
      const request = webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
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
   */
  setupWebOSDrm() {
    const _this = this;
    _this._WebOS = {};

    _this._WebOS.appId = 'com.dtv.smarttv';
    _this._WebOS.clientId = '';
    _this._WebOS.isDrmClientLoaded = '';

    let request = webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
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

    let request = webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
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
   */
  initAudioClass() {
    this.Audio = new Audio();
    this.changeAudioWithOrder = this.Audio.changeAudioWithOrder;
    this.getCurrentAudioWithOrder = this.Audio.getCurrentAudioWithOrder;
    this.denemeSERDAR = this.Audio.getThis;
  }

  /**
   * Play trigger for videoElement
   */
  play() {
    this.videoElement.play();
  }

  /**
   * Pause trigger for videoElement
   */
  pause() {
    this.videoElement.pause();
  }

  /**
   * Play/Pause toggle trigger for videoElement
   */
  togglePlay() {
    if (this.videoElement.paused) {
      this.play();
    } else {
      this.pause();
    }
  }

  /**
   * Trigger specific events for all videoElement trigger
   */
  registerVideoEvents() {
    const _this = this;

    this.videoElement.oncanplay = () => {
      _this.playerInfo.canPlay = true;
      _this.Events.triggerEvent('player_onCanPlay');
    };

    this.videoElement.oncanplaythrough = () => {
      _this.playerInfo.canPlayThrough = true;
      _this.Events.triggerEvent('player_onCanPlayThrough');
    };

    this.videoElement.ondurationchange = () => {
      _this.Events.triggerEvent('player_onDurationChange', [_this.videoElement.duration]);
      _this.playerInfo.duration = _this.videoElement.duration;
    };

    this.videoElement.onended = () => {
      _this.playerInfo.currentState = 'Finished';
      _this.Events.triggerEvent('player_onEnded', ['Video Finished']);
    };

    this.videoElement.onloadeddata = () => {
      _this.Events.triggerEvent('player_onDataLoaded', ['Data Loaded']);
      _this.playerInfo.dataLoaded = true;
    };

    this.videoElement.onloadedmetadata = () => {
      _this.Events.triggerEvent('player_onMetaDataLoaded', ['Meta Data Loaded']);
      _this.playerInfo.metaDataLoaded = true;
    };

    this.videoElement.onloadstart = () => {
      _this.Events.triggerEvent('player_onLoadStart', ['Load Started']);
    };

    this.videoElement.onpause = () => {
      _this.Events.triggerEvent('player_onPause', ['Pause']);
      _this.playerInfo.currentState = 'Paused';
    };

    this.videoElement.onplay = () => {
      _this.Events.triggerEvent('player_onPlay', ['Play']);
      _this.playerInfo.currentState = 'Play';
    };

    this.videoElement.onplaying = () => {
      _this.Events.triggerEvent('player_onPlaying', ['Playing']);
      _this.playerInfo.currentState = 'Playing';
    };

    this.videoElement.progress = () => {
      _this.Events.triggerEvent('player_onProgress', ['Downloading Video']);
    };

    this.videoElement.onratechange = () => {
      _this.Events.triggerEvent('player_onRateChange', [_this.videoElement.playbackRate]);
      _this.playerInfo.playbackRate = _this.videoElement.playbackRate;
    };

    this.videoElement.onseeked = () => {
      _this.Events.triggerEvent('player_onSeeked', ['Seek Completed']);
      _this.playerInfo.isSeeking = false;
    };

    this.videoElement.onseeking = () => {
      _this.Events.triggerEvent('player_onSeeking', ['Seek In Progress']);
      _this.playerInfo.isSeeking = true;
    };

    this.videoElement.ontimeupdate = () => {
      _this.Events.triggerEvent('player_onTimeUpdate', [_this.videoElement.currentTime]);
      if (_this.playerInfo.adsEnabled) {
        _this.checkAdsStatus();
      }
    };

    this.videoElement.onvolumechange = () => {
      _this.Events.triggerEvent('player_onVolumeChange', [_this.videoElement.volume]);
      _this.videoElement.currentVolume = _this.videoElement.volume;
    };

    this.videoElement.onwaiting = () => {
      _this.Events.triggerEvent('player_onWaiting');
      _this.playerInfo.currentState = 'Waiting';
    };
  }

  /**
   * Drm initiator for OIPF Devices such as Vestel and Arcelik
   */
  createOIPFDrmAgent() {
    this.OIPFDrmObject = document.createElement('object');
    this.OIPFDrmObject.setAttribute('type', 'application/oipfDrmAgent');
    this.OIPFDrmObject.setAttribute('id', 'oipfDrm');
    this.OIPFDrmObject.style.display = 'none';
    document.head.appendChild(this.OIPFDrmObject);
    this.OIPFDrmObject.onDRMMessageResult = function(msgId, resultMsg, resultCode) {
      if (resultCode === 0) {
        Logger.addLog('Player', 'create', `DRM Initialized Successfuly, Result Code = ${resultCode}!`);
      } else {
        switch (resultCode) {
          case 1:
            Logger.addLog('Player', 'error', 'Error Code : 1 / Unknown Error - ', HtmlEncode(resultMsg)); // eslint-disable-line no-undef
            break;
          case 2:
            Logger.addLog('Player', 'error', 'Error Code : 2 / Cannot Process Result');
            break;
          case 3:
            Logger.addLog('Player', 'error', 'Error Code : 3 / Unknown MIME Type');
            break;
          case 4:
            Logger.addLog('Player', 'error', 'Error Code : 4 / User Consent Required');
            break;
          default:
            Logger.addLog('Player', 'error', 'Error', resultCode);
            break;
        }
      }
    };
  }

  /**
   * Seek with given value adding
   *
   * @param {Number} value
   */
  seekWithTimeAdd(value) {
    this.videoElement.currentTime += value;
  }

  /**
   * Seek to given time
   * TODO Check device performances if needed use pause method first
   *
   * @param value
   */
  seekToTime(value) {
    this.videoElement.currentTime = value;
  }

  /**
   * Sets currentTime to 0 and plays automatically
   */
  restart() {
    this.pause();
    this.videoElement.currentTime = 0;
    this.play();
  }

}

export default Player;
