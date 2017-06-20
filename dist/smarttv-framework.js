(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("smarttv-framework", [], factory);
	else if(typeof exports === 'object')
		exports["smarttv-framework"] = factory();
	else
		root["smarttv-framework"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Device = undefined;
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import Storage from './service/storage';
	
	if (typeof Object.assign !== 'function') {
	  Object.assign = function (target, varArgs) {
	    // .length of function is 2
	    if (target == null) {
	      // TypeError if undefined or null
	      throw new TypeError('Cannot convert undefined or null to object');
	    }
	
	    var to = Object(target);
	
	    for (var index = 1; index < arguments.length; index += 1) {
	      var nextSource = arguments[index]; // eslint-disable-line prefer-rest-params
	
	      if (nextSource != null) {
	        // Skip over if undefined or null
	        for (var nextKey in nextSource) {
	          // Avoid bugs when hasOwnProperty is shadowed
	          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
	            to[nextKey] = nextSource[nextKey];
	          }
	        }
	      }
	    }
	    return to;
	  };
	}
	
	var device = new _device2.default();
	var currentDeviceName = device.currentDevice.brandName;
	var currentDevice = __webpack_require__(9)("./" + currentDeviceName);
	
	exports.Device = currentDevice; // eslint-disable-line

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _platforms = __webpack_require__(2);
	
	var _platforms2 = _interopRequireDefault(_platforms);
	
	var _player = __webpack_require__(3);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _events = __webpack_require__(7);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _config = __webpack_require__(8);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Device = function () {
	  /**
	   * Class representing Device
	   *
	   * @class Device
	   * @constructor
	   */
	  function Device() {
	    _classCallCheck(this, Device);
	
	    this.userAgent = navigator.userAgent;
	    this.currentDevice = {
	      agentIndex: 'browserDefault',
	      brandName: 'web',
	      modelYear: '2016',
	      displayName: 'Apple Macbook Pro 17'
	    };
	    this.setCurrentDevice(_platforms2.default);
	    this.Player = 'Player is ready to attach';
	    this.Events = 'Events mechanism ready to start';
	    this.Config = _config2.default;
	  }
	
	  /**
	   * Sets currentDevice which needs to identicate which platform we are running on it
	   * Uses browser User Agent to identicate device. Platforms list have to be updated. (PR Welcomed)
	   * This function have to be worked before all operations.
	   * Because other classes and objects are includes device specific blocks
	   *
	   * @method setCurrentDevice
	   * @for Device
	   * @param {Array} [platforms] Platforms list to compare userAgent.
	   * @return {Object} It returns currentDevice and sets it to Device class
	   */
	
	  _createClass(Device, [{
	    key: 'setCurrentDevice',
	    value: function setCurrentDevice(platforms) {
	      for (var platform = 0; platform < platforms.length; platform += 1) {
	        if (this.userAgent.indexOf(platforms[platform].agentIndex) >= 0) {
	          this.currentDevice = platforms[platform];
	          break;
	        }
	      }
	      return this.currentDevice;
	    }
	
	    /**
	     * Events are based on class. So it have to be constructed.
	     *
	     * @method initEvents
	     * @for Device
	     * @return {Object} It returns Events class
	     */
	
	  }, {
	    key: 'initEvents',
	    value: function initEvents() {
	      _logger2.default.addLog('Device', 'progress', 'Events Class Initialization Started');
	      this.Events = new _events2.default(_logger2.default);
	      return this.Events;
	    }
	
	    /**
	     * This function stands for initializing Player class
	     * It uses currentDevice and config info (extended during device extending)
	     * It pass Events to Player class to use same initialized class
	     *
	     * @method initPlayerClass
	     * @for Device
	     * @return {Object} It returns Events class
	     */
	
	  }, {
	    key: 'initPlayerClass',
	    value: function initPlayerClass() {
	      _logger2.default.addLog('Device', 'progress', 'Player Class Initialization Started');
	      this.Player = new _player2.default(this.currentDevice, this.Events, this.Config);
	      return this.Player;
	    }
	  }]);
	
	  return Device;
	}();
	
	exports.default = Device;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 *
	 * @type {[*]}
	 */
	var platforms = [{
	  agentIndex: 'Maple 5',
	  brandName: 'samsung',
	  modelYear: '2010',
	  displayName: 'Samsung SmartTV Orsay | 2010'
	}, {
	  agentIndex: 'Maple 6',
	  brandName: 'samsung',
	  modelYear: '2011',
	  displayName: 'Samsung SmartTV Orsay | 2011'
	}, {
	  agentIndex: 'SmartTV; Maple2012',
	  brandName: 'samsung',
	  modelYear: '2012',
	  displayName: 'Samsung SmartTV Orsay | 2012'
	}, {
	  agentIndex: 'SmartTV+2013; Maple2012',
	  brandName: 'samsung',
	  modelYear: '2013',
	  displayName: 'Samsung SmartTV Orsay | 2013'
	}, {
	  agentIndex: 'SmartTV+2014; Maple2012',
	  brandName: 'samsung',
	  modelYear: '2014',
	  displayName: 'Samsung SmartTV Orsay | 2014'
	}, {
	  agentIndex: 'SmartTV+2015; Maple2012',
	  brandName: 'samsung',
	  modelYear: '2015',
	  displayName: 'Samsung SmartTV Orsay | 2015'
	}, {
	  agentIndex: 'Maple',
	  brandName: 'samsung',
	  modelYear: 'undefined',
	  displayName: 'Samsung SmartTV Orsay'
	}, {
	  agentIndex: 'Tizen 2.3',
	  brandName: 'tizen',
	  modelYear: '2015',
	  displayName: 'Samsung SmartTV Tizen | 2015'
	}, {
	  agentIndex: 'Tizen 2.4.0',
	  brandName: 'tizen',
	  modelYear: '2016',
	  displayName: 'Samsung SmartTV Tizen | 2016'
	}, {
	  agentIndex: 'Tizen',
	  brandName: 'tizen',
	  modelYear: '2015',
	  displayName: 'Samsung SmartTV Tizen | 2015'
	}, { agentInde: 'VESTEL', brandNam: 'vestel', modelYea: 'undefined', displayNam: 'Vestel SmartTV'
	}, { agentInde: 'VSTVB', brandNam: 'vestel', modelYea: 'undefined', displayNam: 'Vestel SmartTV'
	}, {
	  agentIndex: 'LG NetCast.TV-2011',
	  brandName: 'lg',
	  modelYear: '2011',
	  displayNme: 'LG SmartTV NetCast | 2011'
	}, {
	  agentIndex: 'LG NetCast.TV-2012',
	  brandName: 'lg',
	  modelYear: '2012',
	  displayName: 'LG SmartTV NetCast | 2012'
	}, {
	  agentIndex: 'LG NetCast.TV',
	  brandName: 'lg',
	  modelYear: '2013',
	  displayName: 'LG SmartTV NetCast | 2013'
	}, {
	  agentIndex: 'LG SimpleSmart.TV-2016',
	  brandName: 'lg',
	  modelYear: '2016',
	  displayName: 'LG SmartTV NetCast | 2016'
	}, {
	  agentIndex: 'NETTV\/3',
	  brandName: 'philips',
	  modelYear: '2011',
	  displayName: 'Philips SmartTV | 2011'
	}, {
	  agentIndex: 'NETTV\/4\.0',
	  brandName: 'philips',
	  modelYear: '2012',
	  displayName: 'Philips SmartTV | 2012'
	}, {
	  agentIndex: 'NETTV\/',
	  brandName: 'philips',
	  modelYear: '2013',
	  displayName: 'Philips SmartTV | 2013'
	}, {
	  agentIndex: 'DuneHD\/',
	  brandName: 'philips',
	  modelYear: 'undefined',
	  displayName: 'Philips SmartTV'
	}, {
	  agentIndex: 'Viera\/1\.',
	  brandName: 'viera',
	  modelYear: '2012',
	  displayName: 'Viera SmartTV | 2012'
	}, {
	  agentIndex: 'SmartTvA\/',
	  brandName: 'alliance',
	  modelYear: 'generic',
	  displayName: 'Alliance SmartTV | Generic'
	}, {
	  agentIndex: 'ToshibaTP\/',
	  brandName: 'alliance',
	  modelYear: 'toshiba',
	  displayName: 'Alliance SmartTV | Toshiba'
	}, {
	  agentIndex: 'Viera\/3\.',
	  brandName: 'viera',
	  modelYear: '2013',
	  displayName: 'Viera SmartTV | 2013'
	},
	/*  {
	    'agentIndex': '537.41',
	    'brandName': 'webos',
	    'modelYear': '1.x',
	    'displayName': 'LG WebOS SmartTV | 1.x'
	  },
	  {
	    'agentIndex': '538.2',
	    'brandName': 'webos',
	    'modelYear': '2.x',
	    'displayName': 'LG WebOS SmartTV | 2.x'
	  },
	  {
	    'agentIndex': '537.36',
	    'brandName': 'webos',
	    'modelYear': '3.x',
	    'displayName': 'LG WebOS SmartTV | 3.x'
	  },*/
	{
	  agentIndex: 'Web0S',
	  brandName: 'webos',
	  modelYear: 'undefined',
	  displayName: 'LG WebOS SmartTV'
	}, {
	  agentIndex: 'Arcelik',
	  brandName: 'arcelik',
	  modelYear: 'undefined',
	  displayName: 'Arçelik Group Smart TV'
	}, {
	  agentIndex: 'Hisense',
	  brandName: 'hisense',
	  modelYear: 'undefined',
	  displayName: 'Hisense SmartTV'
	}];
	
	exports.default = platforms;
	module.exports = exports['default'];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// import Subtitle from './subtitle';
	
	
	var _audio = __webpack_require__(4);
	
	var _audio2 = _interopRequireDefault(_audio);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _vast = __webpack_require__(6);
	
	var _vast2 = _interopRequireDefault(_vast);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	
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
	  function Player(currentDevice, events, config) {
	    _classCallCheck(this, Player);
	
	    this.currentDevice = currentDevice;
	    this.Events = events;
	    _logger2.default.addLog('Player', 'create', 'Player Class Initialized');
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
	
	
	  _createClass(Player, [{
	    key: 'createVideoElement',
	    value: function createVideoElement() {
	      if (this.videoElement) {
	        this.deleteVideoElement();
	      }
	      this.videoElement = document.createElement('video');
	      this.videoElement.style.position = 'absolute';
	      this.videoElement.setAttribute('class', 'player');
	      this.videoElement.setAttribute('id', 'dtv-video');
	      document.body.appendChild(this.videoElement);
	      this.registerVideoEvents();
	      _logger2.default.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
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
	
	  }, {
	    key: 'setPlayerInfo',
	    value: function setPlayerInfo() {
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
	     * @for Player
	     * @method deleteVideoElement
	     * @return {Boolean}
	     */
	
	  }, {
	    key: 'deleteVideoElement',
	    value: function deleteVideoElement() {
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
	     *
	     * @for Player
	     * @method addVideoSource
	     *
	     */
	
	  }, {
	    key: 'addVideoSource',
	    value: function addVideoSource(src, customData) {
	      this.playerInfo.customData = customData;
	      this.playerInfo.src = src;
	      var _this = this;
	      if (src.match(/\/manifest/i)) {
	        if (this.currentDevice.brandName === 'webos') {
	          this.playerInfo.drmType = 'playready';
	        } else {
	          this.playerInfo.drmType = 'playReady';
	        }
	        switch (this.playerInfo.drmOrganizer) {
	          case 'OIPF':
	            // eslint-disable-line
	            _logger2.default.addLog('Player', 'info', 'Found playReady Content & drmType is ' + this.playerInfo.drmType);
	            this.createOIPFDrmAgent();
	            var oipfMessage = '<?xml version="1.0" encoding="utf-8"?>' + '<PlayReadyInitiator xmlns="http://schemas.microsoft.com/DRM/2007/03/protocols/">' + '<SetCustomData><CustomData>dummy</CustomData></SetCustomData></PlayReadyInitiator>';
	            var mimeType = this.Config.playReady.mimeType;
	            var DRMSystemID = this.Config.playReady.DRMSystemID;
	            this.OIPFDrmObject.sendDRMMessage(mimeType, oipfMessage, DRMSystemID);
	            this.videoElement.setAttribute('src', this.playerInfo.src);
	            break;
	          case 'TIZEN':
	            console.log('TIZEN');
	
	            break;
	          case 'WEBOS':
	            this.setupWebOSDrm();
	            this.Events.addListener('DRM_WebOSReady', function () {
	              _this.sourceElement = document.createElement('source');
	              _this.sourceElement.setAttribute('src', _this.playerInfo.src);
	              _this.sourceElement.setAttribute('type', 'application/vnd.ms-sstr+xml;mediaOption=' + _this._WebOS.mediaOption);
	              _this.videoElement.appendChild(_this.sourceElement);
	              document.body.setAttribute('onunload', _this.unloadDrmClient);
	            });
	            break;
	          default:
	            console.log('STANDART');
	        }
	      } else {
	        _logger2.default.addLog('Player', 'info', 'This is a DRM-Free Content');
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
	     *
	     * @for Player
	     * @method initAds
	     * @return {*}
	     */
	
	  }, {
	    key: 'initAds',
	    value: function initAds(type, url) {
	      var _this = this;
	      _this.playerInfo.adsType = type;
	      _this.playerInfo.adsEnabled = true;
	      switch (type) {
	        case 'VMAP':
	          // eslint-disable-line
	          var xhr = new window.XMLHttpRequest();
	          xhr.open('GET', url);
	          xhr.send();
	          _this.Events.on('vmapLoaded', function (vmapObject) {
	            _this.prepareVastFromVmap(vmapObject);
	          });
	          xhr.onreadystatechange = function () {
	            if (xhr.readyState === 4) {
	              // Parse VMAP
	              _vast2.default.parseVMAP(xhr.responseXML, _this.Events);
	              _logger2.default.addLog('Player - ADS', 'info', 'VMAP Target Loaded Successfully');
	              _this.addAdsCaption();
	            }
	          };
	          break;
	        case 'VAST':
	          console.log('VAST');
	          break;
	        default:
	          return _logger2.default.addLog('Player - Ads', 'error', '');
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
	
	  }, {
	    key: 'prepareVastFromVmap',
	    value: function prepareVastFromVmap(vmapObject) {
	      // Create Wrapper Div
	      this.wrapperDiv = document.createElement('div');
	      this.wrapperDiv.className = 'vastWrapper';
	      this.wrapperDiv.id = 'vastWrapper_' + this.Config.videoPlayerId;
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
	      for (var i = 0; i < vmapObject.length; i += 1) {
	        this.vastReadyItems.push(this.readVastFile(vmapObject[i].url, this.Config.vastOptions));
	      }
	      for (var j = 0; j < _vast2.default.vastArray.length; j += 1) {
	        if (_vast2.default.vastArray[j].time === 'end') {
	          _vast2.default.vastArray[j].time = Math.floor(this.videoElement.duration) - 1;
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
	
	  }, {
	    key: 'readVastFile',
	    value: function readVastFile(vastUrl, options) {
	      // eslint-disable-line
	
	      // Read XML file
	      var xmlHttpReq = void 0;
	      var xmlDoc = void 0;
	      if (window.XMLHttpRequest) {
	        xmlHttpReq = new XMLHttpRequest();
	      } else {
	        xmlHttpReq = new ActiveXObject('Microsoft.XMLHTTP'); // eslint-disable-line
	      }
	      xmlHttpReq.open('GET', vastUrl, false);
	      xmlHttpReq.send();
	      xmlDoc = xmlHttpReq.responseXML; // eslint-disable-line
	
	      var vastObj = {};
	
	      // Get impression tag
	      var impression = xmlDoc.getElementsByTagName('Impression');
	      if (impression != null) {
	        // obj_vast.impression_url = impression[0].childNodes[0].nodeValue;
	        vastObj.impression = impression;
	        // alert(obj_vast.impression_url);
	      }
	
	      // Get Creative
	      var creative = xmlDoc.getElementsByTagName('Creative');
	      var mediaFiles = void 0;
	      var trackingEvents = void 0;
	      for (var i = 0; i < creative.length; i += 1) {
	        var creativeLinear = creative[i].getElementsByTagName('Linear');
	        if (creativeLinear != null) {
	          for (var j = 0; j < creativeLinear.length; j += 1) {
	            // Get media files
	            var creativeLinearMediaFiles = creativeLinear[j].getElementsByTagName('MediaFiles');
	            if (creativeLinearMediaFiles != null) {
	              for (var k = 0; k < creativeLinearMediaFiles.length; k += 1) {
	                var creativeLinearMediaFile = creativeLinearMediaFiles[k].getElementsByTagName('MediaFile');
	                if (creativeLinearMediaFile != null) {
	                  mediaFiles = creativeLinearMediaFile;
	                }
	              }
	            }
	
	            // Get Clickthrough URL
	            var creativeLinearVideoClicks = creativeLinear[j].getElementsByTagName('VideoClicks');
	            if (creativeLinearVideoClicks != null) {
	              for (var _k = 0; _k < creativeLinearVideoClicks.length; _k += 1) {
	                var creativeLineartVClicksClickthrough = creativeLinearVideoClicks[_k].getElementsByTagName('ClickThrough')[0].childNodes[0].nodeValue;
	                var creativeLineartVClicksClickthroughTracking = creativeLinearVideoClicks[_k].getElementsByTagName('ClickTracking');
	                if (creativeLineartVClicksClickthrough != null) {
	                  vastObj.clickthroughUrl = creativeLineartVClicksClickthrough;
	                }
	                if (creativeLineartVClicksClickthroughTracking != null) {
	                  vastObj.clickthroughTracking = creativeLineartVClicksClickthroughTracking;
	                }
	              }
	            }
	
	            // Get Tracking Events
	            var creativeLinearTrackingEvents = creativeLinear[j].getElementsByTagName('TrackingEvents');
	            if (creativeLinearTrackingEvents != null) {
	              for (var _k2 = 0; _k2 < creativeLinearTrackingEvents.length; _k2 += 1) {
	                var creativeLinearTrackingEventsTracking = creativeLinearTrackingEvents[_k2].getElementsByTagName('Tracking');
	                if (creativeLinearTrackingEventsTracking != null) {
	                  trackingEvents = creativeLinearTrackingEventsTracking;
	                }
	              }
	            }
	
	            // Get AD Duration
	
	            var creativeLinearDuration = creativeLinear[j].getElementsByTagName('Duration')[0];
	            if (creativeLinearDuration != null) {
	              vastObj.duration = creativeLinearDuration.childNodes[0].nodeValue;
	              // alert(obj_vast.duration);
	              var arrD = vastObj.duration.split(':');
	              var strSecs = +arrD[0] * 60 * 60 + +arrD[1] * 60 + +arrD[2];
	              vastObj.duration = strSecs;
	            }
	          }
	        }
	      }
	
	      if (typeof mediaFiles !== 'undefined') {
	        for (var _i = 0; _i < mediaFiles.length; _i += 1) {
	          if (mediaFiles[_i].getAttribute('type') === options.media_type) {
	            if (mediaFiles[_i].getAttribute('bitrate') > options.media_bitrate_min && mediaFiles[_i].getAttribute('bitrate') < options.media_bitrate_max) {
	              vastObj.mediaFile = mediaFiles[_i].childNodes[0].nodeValue;
	            }
	          }
	        }
	      }
	
	      if (typeof trackingEvents !== 'undefined') {
	        for (var _i2 = 0; _i2 < trackingEvents.length; _i2 += 1) {
	          if (trackingEvents[_i2].getAttribute('event') === 'start') {
	            if (vastObj.trackingStart != null) {
	              vastObj.trackingStart += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingStart = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingStartTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'firstQuartile') {
	            if (vastObj.trackingFirstQuartile != null) {
	              vastObj.trackingFirstQuartile += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingFirstQuartile = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.tracking_first_quartile_tracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'midpoint') {
	            if (vastObj.trackingMidpoint != null) {
	              vastObj.trackingMidpoint += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingMidpoint = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingMidpointTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'thirdQuartile') {
	            if (vastObj.trackingThirdQuartile != null) {
	              vastObj.trackingThirdQuartile += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingThirdQuartile = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingThirdQuartileTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'complete') {
	            if (vastObj.trackingComplete != null) {
	              vastObj.trackingComplete += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingComplete = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingCompleteTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'mute') {
	            if (vastObj.trackingMute != null) {
	              vastObj.trackingMute += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingMute = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingMuteTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'unmute') {
	            if (vastObj.trackingUnmute != null) {
	              vastObj.trackingUnmute += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingUnmute = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingUnmuteTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'pause') {
	            if (vastObj.trackingPause != null) {
	              vastObj.trackingPause += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingPause = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingPauseTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'resume') {
	            if (vastObj.trackingResume != null) {
	              vastObj.trackingResume += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingResume = trackingEvents[_i2].childNodes[0].nodeValue;
	            }
	            vastObj.trackingResumeTracked = false;
	          }
	          if (trackingEvents[_i2].getAttribute('event') === 'fullscreen') {
	            if (vastObj.trackingFullscreen != null) {
	              vastObj.trackingFullscreen += ' ' + trackingEvents[_i2].childNodes[0].nodeValue;
	            } else {
	              vastObj.trackingFullscreen = trackingEvents[_i2].childNodes[0].nodeValue;
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
	
	  }, {
	    key: 'checkAdsStatus',
	    value: function checkAdsStatus() {
	      if (!this.adsInProgress) {
	        // let currentTime = Math.floor(this.videoElement.currentTime);
	        if (this.videoElement.currentTime >= _vast2.default.vastArray[0].time) {
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
	
	  }, {
	    key: 'initVastAd',
	    value: function initVastAd(time) {
	      var _this = this;
	      this.videoElement.src = '';
	      this.captionDiv.style.visibility = 'visible';
	      this.captionDiv.innerHTML = 'Reklamlar Yükleniyor';
	      this.vastElement.src = this.vastReadyItems[0].mediaFile;
	      this.vastElement.removeAttribute('controls');
	      this.vastElement.addEventListener('loadedmetadata', function () {
	        _this.videoElement.style.visibility = 'hidden';
	        _this.vastElement.style.visibility = 'visible';
	        _this.captionDiv.innerHTML = _this.Config.vastOptions.ad_caption;
	        console.log('Meta Data YüklenDi');
	        _this.vastElement.play();
	      });
	      this.vastElement.addEventListener('ended', function () {
	        console.log('Bitti');
	        _this.vastElement.style.visibility = 'hidden';
	        _this.videoElement.style.visibility = 'visible';
	        _this.captionDiv.style.visibility = 'hidden';
	        _this.adsInProgress = false;
	        _this.videoElement.src = _this.playerInfo.src;
	        _this.videoElement.currentTime = time;
	        _this.play();
	      });
	      this.vastElement.addEventListener('play', function () {
	        console.log('Reklam Başladı');
	      });
	      console.log('init ettik' + time);
	      _vast2.default.vastArray.splice(0, 1);
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
	
	  }, {
	    key: 'addAdsCaption',
	    value: function addAdsCaption() {
	      this.captionDiv = document.createElement('div');
	      this.captionDiv.className = 'vastCaption';
	      this.captionDiv.id = 'vastCaption_' + this.Config.videoPlayerId;
	      this.captionDiv.innerHTML = this.Config.vastOptions.ad_caption;
	      this.wrapperDiv.appendChild(this.captionDiv);
	      // Adjust style
	      this.captionDiv.style.left = this.vastElement.offsetWidth / 2 - document.getElementsByClassName('vastCaption')[0].offsetWidth / 2 + 'px';this.captionDiv.style.visibility = 'hidden';
	      return true;
	    }
	
	    /**
	     * Unloads DRM client. !IMPORTANT! Some devices may be crash if you are not unloaded drm client
	     *
	     * @for Player
	     * @method unloadDrmClient
	     */
	
	  }, {
	    key: 'unloadDrmClient',
	    value: function unloadDrmClient() {
	      console.log('Unload Geldi');
	      var _this = this;
	      if (this.currentDevice.brandName === 'webos' && _this._WebOS.isDrmClientLoaded) {
	        webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
	          method: 'unload',
	          parameters: { clientId: _this._WebOS.clientId },
	          onSuccess: function onSuccess(result) {
	            _this._WebOS.isDrmClientLoaded = false;
	            console.log('DRM Client is unloaded successfully.');
	          },
	          onFailure: function onFailure(result) {
	            console.log('[' + result.errorCode + '] ' + result.errorText);
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
	
	  }, {
	    key: 'setupWebOSDrm',
	    value: function setupWebOSDrm() {
	      var _this = this;
	      _this._WebOS = {};
	
	      _this._WebOS.appId = 'com.dtv.smarttv';
	      _this._WebOS.clientId = '';
	      _this._WebOS.isDrmClientLoaded = '';
	
	      webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
	        method: 'load',
	        parameters: {
	          drmType: _this.playerInfo.drmType,
	          appId: _this._WebOS.appId
	        },
	        onSuccess: function onSuccess(result) {
	          _this._WebOS.clientId = result.clientId;
	          _this._WebOS.isDrmClientLoaded = true;
	          console.log('DRM Client is loaded successfully.');
	          _this.sendWebOSDrm();
	        },
	        onFailure: function onFailure(result) {
	          console.log('[' + result.errorCode + '] ' + result.errorText);
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
	
	  }, {
	    key: 'sendWebOSDrm',
	    value: function sendWebOSDrm() {
	      this._WebOS.msg = '<?xml version="1.0" encoding="utf-8"?>\n    <PlayReadyInitiator xmlns= "http://schemas.microsoft.com/DRM/2007/03/protocols/">\n    <LicenseAcquisition>\n    <Header><WRMHEADER xmlns= "http://schemas.microsoft.com/DRM/2007/03/PlayReadyHeader" version="4.0.0.0">\n    <DATA>\n    <PROTECTINFO>\n    <KEYLEN>16\n    </KEYLEN>\n    <ALGID>AESCTR</ALGID>\n    </PROTECTINFO>\n    <LA_URL>' + this.Config.DRM.licenserUrl + '</LA_URL>\n    <KID>lFmb2gxg0Cr5bfEnJXgJeA==</KID>\n    <CHECKSUM>P7ORpD2IpA==</CHECKSUM>\n    </DATA>\n    </WRMHEADER>\n    </Header>\n    <CustomData>' + this.playerInfo.customData + '</CustomData>\n    </LicenseAcquisition>\n    </PlayReadyInitiator>';
	
	      var _this = this;
	
	      webOS.service.request('luna://com.webos.service.drm', { // eslint-disable-line
	        method: 'sendDrmMessage',
	        parameters: {
	          clientId: this._WebOS.clientId,
	          msgType: this.Config.DRM.mimeType,
	          msg: this._WebOS.msg,
	          drmSystemId: this.Config.DRM.drmSystemId
	        },
	        onSuccess: function onSuccess(result) {
	          _this._WebOS.msgId = result.msgId;
	          _this._WebOS.resultCode = result.resultCode;
	          _this._WebOS.resultMsg = result.resultMsg;
	          console.log('Message ID: ' + _this._WebOS.msgId);
	          console.log('[' + _this._WebOS.resultCode + '] ' + _this._WebOS.resultMsg);
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
	        onFailure: function onFailure(result) {
	          console.log('[' + result.errorCode + '] ' + result.errorText);
	        }
	      });
	    }
	
	    /**
	     * Constructor for Audio class
	     *
	     * @for Player
	     * @method initAudioClass
	     */
	
	  }, {
	    key: 'initAudioClass',
	    value: function initAudioClass() {
	      this.Audio = new _audio2.default();
	      this.changeAudioWithOrder = this.Audio.changeAudioWithOrder;
	      this.getCurrentAudioWithOrder = this.Audio.getCurrentAudioWithOrder;
	      this.denemeSERDAR = this.Audio.getThis;
	    }
	
	    /**
	     * Play trigger for videoElement
	     *
	     * @for Player
	     * @method play
	     */
	
	  }, {
	    key: 'play',
	    value: function play() {
	      this.videoElement.play();
	    }
	
	    /**
	     * Pause trigger for videoElement
	     *
	     * @for Player
	     * @method pause
	     */
	
	  }, {
	    key: 'pause',
	    value: function pause() {
	      this.videoElement.pause();
	    }
	
	    /**
	     * Play/Pause toggle trigger for videoElement
	     *
	     * @for Player
	     * @method togglePlay
	     */
	
	  }, {
	    key: 'togglePlay',
	    value: function togglePlay() {
	      if (this.videoElement.paused) {
	        this.play();
	      } else {
	        this.pause();
	      }
	    }
	
	    /**
	     * Trigger specific events for all videoElement trigger
	     * @for Player
	     * @method registerVideoEvents
	     */
	
	  }, {
	    key: 'registerVideoEvents',
	    value: function registerVideoEvents() {
	      var _this = this;
	
	      this.videoElement.oncanplay = function () {
	        _this.playerInfo.canPlay = true;
	        _this.Events.triggerEvent('player_onCanPlay');
	      };
	
	      this.videoElement.oncanplaythrough = function () {
	        _this.playerInfo.canPlayThrough = true;
	        _this.Events.triggerEvent('player_onCanPlayThrough');
	      };
	
	      this.videoElement.ondurationchange = function () {
	        _this.Events.triggerEvent('player_onDurationChange', [_this.videoElement.duration]);
	        _this.playerInfo.duration = _this.videoElement.duration;
	      };
	
	      this.videoElement.onended = function () {
	        _this.playerInfo.currentState = 'Finished';
	        _this.Events.triggerEvent('player_onEnded', ['Video Finished']);
	      };
	
	      this.videoElement.onloadeddata = function () {
	        _this.Events.triggerEvent('player_onDataLoaded', ['Data Loaded']);
	        _this.playerInfo.dataLoaded = true;
	      };
	
	      this.videoElement.onloadedmetadata = function () {
	        _this.Events.triggerEvent('player_onMetaDataLoaded', ['Meta Data Loaded']);
	        _this.playerInfo.metaDataLoaded = true;
	      };
	
	      this.videoElement.onloadstart = function () {
	        _this.Events.triggerEvent('player_onLoadStart', ['Load Started']);
	      };
	
	      this.videoElement.onpause = function () {
	        _this.Events.triggerEvent('player_onPause', ['Pause']);
	        _this.playerInfo.currentState = 'Paused';
	      };
	
	      this.videoElement.onplay = function () {
	        _this.Events.triggerEvent('player_onPlay', ['Play']);
	        _this.playerInfo.currentState = 'Play';
	      };
	
	      this.videoElement.onplaying = function () {
	        _this.Events.triggerEvent('player_onPlaying', ['Playing']);
	        _this.playerInfo.currentState = 'Playing';
	      };
	
	      this.videoElement.progress = function () {
	        _this.Events.triggerEvent('player_onProgress', ['Downloading Video']);
	      };
	
	      this.videoElement.onratechange = function () {
	        _this.Events.triggerEvent('player_onRateChange', [_this.videoElement.playbackRate]);
	        _this.playerInfo.playbackRate = _this.videoElement.playbackRate;
	      };
	
	      this.videoElement.onseeked = function () {
	        _this.Events.triggerEvent('player_onSeeked', ['Seek Completed']);
	        _this.playerInfo.isSeeking = false;
	      };
	
	      this.videoElement.onseeking = function () {
	        _this.Events.triggerEvent('player_onSeeking', ['Seek In Progress']);
	        _this.playerInfo.isSeeking = true;
	      };
	
	      this.videoElement.ontimeupdate = function () {
	        _this.Events.triggerEvent('player_onTimeUpdate', [_this.videoElement.currentTime]);
	        if (_this.playerInfo.adsEnabled) {
	          _this.checkAdsStatus();
	        }
	      };
	
	      this.videoElement.onvolumechange = function () {
	        _this.Events.triggerEvent('player_onVolumeChange', [_this.videoElement.volume]);
	        _this.videoElement.currentVolume = _this.videoElement.volume;
	      };
	
	      this.videoElement.onwaiting = function () {
	        _this.Events.triggerEvent('player_onWaiting');
	        _this.playerInfo.currentState = 'Waiting';
	      };
	    }
	
	    /**
	     * Drm initiator for OIPF Devices such as Vestel and Arcelik
	     *
	     * @for Player
	     * @method createOIPFDrmAgent
	     */
	
	  }, {
	    key: 'createOIPFDrmAgent',
	    value: function createOIPFDrmAgent() {
	      this.OIPFDrmObject = document.createElement('object');
	      this.OIPFDrmObject.setAttribute('type', 'application/oipfDrmAgent');
	      this.OIPFDrmObject.setAttribute('id', 'oipfDrm');
	      this.OIPFDrmObject.style.display = 'none';
	      document.head.appendChild(this.OIPFDrmObject);
	      this.OIPFDrmObject.onDRMMessageResult = function (msgId, resultMsg, resultCode) {
	        if (resultCode === 0) {
	          _logger2.default.addLog('Player', 'create', 'DRM Initialized Successfuly, Result Code = ' + resultCode + '!');
	        } else {
	          switch (resultCode) {
	            case 1:
	              _logger2.default.addLog('Player', 'error', 'Error Code : 1 / Unknown Error - ', HtmlEncode(resultMsg)); // eslint-disable-line no-undef
	              break;
	            case 2:
	              _logger2.default.addLog('Player', 'error', 'Error Code : 2 / Cannot Process Result');
	              break;
	            case 3:
	              _logger2.default.addLog('Player', 'error', 'Error Code : 3 / Unknown MIME Type');
	              break;
	            case 4:
	              _logger2.default.addLog('Player', 'error', 'Error Code : 4 / User Consent Required');
	              break;
	            default:
	              _logger2.default.addLog('Player', 'error', 'Error', resultCode);
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
	
	  }, {
	    key: 'seekWithTimeAdd',
	    value: function seekWithTimeAdd(value) {
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
	
	  }, {
	    key: 'seekToTime',
	    value: function seekToTime(value) {
	      this.videoElement.currentTime = value;
	    }
	
	    /**
	     * Sets currentTime to 0 and plays automatically
	     *
	     * @for Player
	     * @method restart
	     */
	
	  }, {
	    key: 'restart',
	    value: function restart() {
	      this.pause();
	      this.videoElement.currentTime = 0;
	      this.play();
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Audio = function () {
	
	  /**
	   * This class is for Audio operations. It works with Player
	   *
	   * @class Audio
	   * @constructor
	   */
	  function Audio() {
	    _classCallCheck(this, Audio);
	
	    _logger2.default.addLog('Audio', 'create', 'Audio class initialized');
	  }
	
	  /**
	   * Changes audio tracks with given order. It enables given index and disables other audio elements
	   * Based on HTML5 video element audioTracks
	   *
	   * @param {Number} order - Language order to change
	   * @method changeAudioWithOrder
	   * @for Audio
	   * @return {Boolean}
	   */
	
	
	  _createClass(Audio, [{
	    key: 'changeAudioWithOrder',
	    value: function changeAudioWithOrder(order) {
	      var _this = this;
	      var audioTracks = _this.videoElement.audioTracks;
	      if (typeof audioTracks !== 'undefined' && audioTracks.length > 0) {
	        for (var i = 0; i < audioTracks.length; i += 1) {
	          if (order === i) {
	            audioTracks[i].enabled = true;
	            _this.Events.triggerEvent('player_currentAudio', [i]);
	          } else {
	            audioTracks[i].enabled = false;
	          }
	        }
	        return true;
	      }
	    }
	
	    /**
	     * It returns current audio order. It checks which audioTrack is enabled
	     * Usefull for UI to understand which language is available
	     * TODO It must return object. If video metadata is correct it returns language unicode and name
	     *
	     * @method getCurrentAudioWithOrder
	     * @for Audio
	     * @return {Number} order - It returns current audio index
	     *
	     */
	
	  }, {
	    key: 'getCurrentAudioWithOrder',
	    value: function getCurrentAudioWithOrder() {
	      var _this = this;
	      var audioTracks = _this.videoElement.audioTracks;
	      if (typeof audioTracks !== 'undefined' && audioTracks.length > 0) {
	        for (var i = 0; i < audioTracks.length; i += 1) {
	          if (audioTracks[i].enabled) {
	            _this.Events.triggerEvent('player_currentAudio', [i]);
	            _this.videoElement.currentAudioElement = audioTracks[i];
	            return i;
	          }
	        }
	      } else {
	        return _logger2.default.addLog('Audio', 'info', 'There is no multiple audio content');
	      }
	    }
	  }]);
	
	  return Audio;
	}();
	
	exports.default = Audio;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Class representing Logger
	 * @class Logger
	 */
	var Logger = function () {
	  function Logger() {
	    _classCallCheck(this, Logger);
	  }
	
	  _createClass(Logger, null, [{
	    key: 'addLog',
	
	
	    /**
	     * addLog stands for console log it have to show console logs on TV Screen
	     * TODO Design and create screens for console on real devices
	     * TODO Implement real device logger system
	     * @param from - Where triggered this log function
	     * @param type - Type of log (info, error, create, progress, default)
	     * @param message - Message of log
	     * @param variable - Variable of log it can be Array, Object, string etc
	     *
	     * @method addLog
	     * @static
	     * @for Logger
	     */
	    value: function addLog(from, type, message, variable) {
	      switch (type) {
	        case 'create':
	          console.log('[' + from + '] %c -> { ' + type + ' } \n\n ' + message + (variable ? ' => ' : ''), 'color: #009b1c;', variable || '');
	          break;
	        case 'info':
	          console.log('[' + from + '] %c -> { ' + type + ' } \n\n ' + message + (variable ? ' => ' : ''), 'color: orange;', variable || '');
	          break;
	        case 'progress':
	          console.log('[' + from + '] %c -> { ' + type + ' } \n\n ' + message + (variable ? ' => ' : ''), 'color: #008adb;', variable || '');
	          break;
	        case 'error':
	          console.log('%c [' + from + '] -> { ' + type + ' } \n\n ' + message + (variable ? ' => ' : ''), 'color: red; font-weight: bold', variable || '');
	          break;
	        default:
	          console.log('[' + from + '] %c -> { ' + type + ' } \n\n ' + message + (variable ? ' => ' : ''), 'color: black;', variable || '');
	      }
	    }
	  }]);
	
	  return Logger;
	}();
	
	exports.default = Logger;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 * Parses VMAP Ad Source
	 * TODO Detailed documentation can be written
	 * @param xml
	 * @constructor
	 */
	function VMAPAdSource(xml) {
	  var i = void 0;
	  var len = void 0;
	  var node = void 0;
	  this.id = xml.getAttribute('id');
	  this.allowMultipleAds = xml.getAttribute('allowMultipleAds');
	  this.followRedirects = xml.getAttribute('followRedirects');
	  this.vastAdData = null;
	  this.adTagURI = null;
	  this.customData = null;
	  var ref = xml.childNodes;
	  for (i = 0, len = ref.length; i < len; i += 1) {
	    node = ref[i];
	    switch (node.localName) {
	      case 'AdTagURI':
	        this.adTagURI = {
	          templateType: node.getAttribute('templateType'),
	          uri: (node.textContent || node.text || '').trim()
	        };
	        break;
	      case 'VASTAdData':
	        this.vastAdData = node.firstChild;
	        while (this.vastAdData && this.vastAdData.nodeType !== 1) {
	          this.vastAdData = this.vastAdData.nextSibling;
	        }
	        break;
	      case 'CustomAdData':
	        this.customData = node;
	        break;
	      default:
	        break;
	    }
	  }
	}
	
	/**
	 * Parses VMAP AdBreaks
	 * TODO Detailed documentation can be written
	 * @param xml
	 * @constructor
	 */
	function VMAPAdBreak(xml) {
	  var j = void 0;
	  var k = void 0;
	  var len = void 0;
	  var len1 = void 0;
	  var node = void 0;
	  var ref1 = void 0;
	  var subnode = void 0;
	  var pseudoVast = {};
	  this.timeOffset = xml.getAttribute('timeOffset');
	  this.breakType = xml.getAttribute('breakType');
	  pseudoVast.breakType = this.breakType;
	  this.breakId = xml.getAttribute('breakId');
	  this.repeatAfter = xml.getAttribute('repeatAfter');
	  this.adSource = null;
	  this.trackingEvents = [];
	  var ref = xml.childNodes;
	  for (j = 0, len = ref.length; j < len; j += 1) {
	    node = ref[j];
	    switch (node.localName) {
	      case 'AdSource':
	        this.adSource = new VMAPAdSource(node);
	        break;
	      case 'TrackingEvents':
	        ref1 = node.childNodes;
	        for (k = 0, len1 = ref1.length; k < len1; k += 1) {
	          subnode = ref1[k];
	          if (subnode.localName === 'Tracking') {
	            this.trackingEvents.push({
	              event: subnode.getAttribute('event'),
	              uri: (subnode.textContent || subnode.text || '').trim()
	            });
	          }
	        }
	        break;
	      case 'Extensions':
	        if (node.childNodes[1].tagName === 'vmap:Extension') {
	          this.extensions = {};
	          this.extensions.type = node.childNodes[1].getAttribute('type');
	          this.extensions.supress_bumper = node.childNodes[1].getAttribute('suppress_bumper') === 'true';
	        } else {
	          this.extensions = null;
	        }
	        break;
	      default:
	        break;
	    }
	  }
	  if (typeof this.extensions !== 'undefined' && this.extensions.type === 'bumper') {
	    pseudoVast.bumper = true;
	  }
	  if (this.adSource.adTagURI.templateType === 'vast3' && this.adSource.adTagURI.uri) {
	    pseudoVast.url = this.adSource.adTagURI.uri;
	  }
	  switch (this.timeOffset) {
	    case 'start':
	      {
	        pseudoVast.time = 0;
	        Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
	        break;
	      }
	    case 'end':
	      {
	        pseudoVast.time = 'end';
	        Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
	        break;
	      }
	    default:
	      {
	        var arrTime = this.timeOffset.split(':');
	        var msTime = 0;
	        msTime = arrTime[0] * 60 * 60 + arrTime[1] * 60 + Math.floor(arrTime[2]);
	        pseudoVast.time = msTime;
	        Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
	        break;
	      }
	  }
	}
	
	/**
	 * TODO Detailed documentation can be written
	 * @param event
	 * @param errorCode
	 * @return {Array}
	 */
	VMAPAdBreak.prototype.track = function (event, errorCode) {
	  var j = void 0;
	  var len = void 0;
	  var tracker = void 0;
	  var uri = void 0;
	  var ref = this.trackingEvents;
	  var results = [];
	  for (j = 0, len = ref.length; j < len; j += 1) {
	    tracker = ref[j];
	    if (tracker.event !== event) {
	      continue;
	    }
	    uri = tracker.uri;
	    if (tracker.event === 'error') {
	      uri = uri.replace('[ERRORCODE]', errorCode);
	    }
	    results.push(this.tracker(uri));
	  }
	  return results;
	};
	
	/**
	 * TODO Detailed documentation can be written
	 * @param uri
	 * @return {*}
	 */
	VMAPAdBreak.prototype.tracker = function (uri) {
	  var i = void 0;
	  if (typeof window !== 'undefined' && window !== null) {
	    i = new Image();
	    i.src = uri;
	    return uri;
	  }
	};
	
	/**
	 *
	 * @type {{parseVMAP: ((xml, Events)), parsedVMAP: {}, vastArray: Array}}
	 */
	var Vast = {
	  parseVMAP: function parseVMAP(xml, Events) {
	    var i = void 0;
	    var len = void 0;
	    var node = void 0;
	    if (!((xml != null ? xml.documentElement : undefined) != null && xml.documentElement.localName === 'VMAP')) {
	      throw new Error('Not a VMAP document');
	    }
	    this.parsedVMAP.version = xml.documentElement.getAttribute('version');
	    this.parsedVMAP.adBreaks = [];
	    this.parsedVMAP.extensions = [];
	    var ref = xml.documentElement.childNodes;
	    for (i = 0, len = ref.length; i < len; i += 1) {
	      node = ref[i];
	      switch (node.localName) {
	        case 'AdBreak':
	          this.parsedVMAP.adBreaks.push(new VMAPAdBreak(node));
	          break;
	        case 'Extensions':
	          this.parsedVMAP.extensions = node.childNodes;
	          break;
	        default:
	          break;
	      }
	    }
	    Events.triggerEvent('vmapLoaded', [this.vastArray]);
	    return this.parsedVMAP;
	  },
	
	  parsedVMAP: {},
	  vastArray: []
	};
	
	exports.default = Vast;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 * @for Events
	 * @method alias
	 */
	var alias = function alias(name) {
	  // eslint-disable-line arrow-body-style
	  return function aliasClosure() {
	    return this[name].apply(this, arguments); // eslint-disable-line prefer-rest-params
	  };
	};
	
	/**
	 *
	 * @param listener
	 *
	 * @for Events
	 * @method isValidListener
	 * @return {*}
	 */
	var isValidListener = function isValidListener(listener) {
	  var returnValue = void 0;
	  if (typeof listener === 'function' || listener instanceof RegExp) {
	    returnValue = true;
	  } else if (listener && (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object') {
	    returnValue = isValidListener(listener.listener);
	  } else {
	    returnValue = false;
	  }
	  return returnValue;
	};
	
	/**
	 * Finds the index of the listener for the event in its storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 *
	 * @for Events
	 * @method indexOfListener
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	var indexOfListener = function indexOfListener(listeners, listener) {
	  var i = listeners.length;
	  while (i--) {
	    // eslint-disable-line no-plusplus
	    if (listeners[i].listener === listener) {
	      return i;
	    }
	  }
	
	  return -1;
	};
	
	var Events = function () {
	  /**
	   *
	   * @param loggerClass
	   * @class Events
	   * @constructor
	   */
	  function Events(loggerClass) {
	    _classCallCheck(this, Events);
	
	    this.logger = loggerClass;
	    this.logger.addLog('Events', 'create', 'Events Class Initialized');
	    this.on = alias('addListener');
	    this.once = alias('addOnceListener');
	    this.off = alias('removeListener');
	    this.removeAllListeners = alias('removeEvent');
	    this.trigger = alias('triggerEvent');
	  }
	
	  /**
	   * Returns the listener array for the specified event.
	   * Will initialise the event object and listener arrays if required.
	   * Will return an object if you use a regex search.
	   * The object contains keys for each matched event.
	   * So /ba[rz]/ might return an object containing bar and baz.
	   * But only if you have either defined them with defineEvent or added some listeners to them.
	   * Each property in the object response is an array of listener functions.
	   *
	   * @param {String|RegExp} evt Name of the event to return the listeners from.
	   *
	   * @for Events
	   * @method getListeners
	   * @return {Function[]|Object} All listener functions for the event.
	   */
	
	
	  _createClass(Events, [{
	    key: 'getListeners',
	    value: function getListeners(evt) {
	      var events = this._getEvents();
	      var response = void 0;
	      var key = void 0;
	
	      // Return a concatenated array of all matching events if
	      // the selector is a regular expression.
	      if (evt instanceof RegExp) {
	        response = {};
	        for (key in events) {
	          if (Object.prototype.hasOwnProperty.call(events, key) && evt.test(key)) {
	            response[key] = events[key];
	          }
	        }
	      } else {
	        response = events[evt] || (events[evt] = []);
	      }
	
	      return response;
	    }
	
	    /**
	     * Takes a list of listener objects and flattens it into a list of listener functions.
	     *
	     * @param {Object[]} listeners Raw listener objects.
	     *
	     * @for Events
	     * @method flattenListeners
	     * @return {Function[]} Just the listener functions.
	     */
	
	  }, {
	    key: 'flattenListeners',
	    value: function flattenListeners(listeners) {
	      /*
	      eslint class-methods-use-this: ["error", { "exceptMethods": ["flattenListeners"] }] */
	      var flatListeners = [];
	      var i = void 0;
	
	      for (i = 0; i < listeners.length; i += 1) {
	        flatListeners.push(listeners[i].listener);
	      }
	
	      return flatListeners;
	    }
	
	    /**
	     * Fetches the requested listeners via getListeners
	     * but will always return the results inside an object.
	     * This is mainly for internal use but others may find it useful.
	     *
	     * @param {String|RegExp} evt Name of the event to return the listeners from.
	     * @for Events
	     * @method getListenersAsObject
	     * @return {Object} All listener functions for an event in an object.
	     */
	
	  }, {
	    key: 'getListenersAsObject',
	    value: function getListenersAsObject(evt) {
	      var listeners = this.getListeners(evt);
	      var response = void 0;
	
	      if (listeners instanceof Array) {
	        response = {};
	        response[evt] = listeners;
	      }
	
	      return response || listeners;
	    }
	
	    /**
	     * Adds a listener function to the specified event.
	     * The listener will not be added if it is a duplicate.
	     * If the listener returns true then;
	     * it will be removed after it is called.
	     * If you pass a regular expression as the event name then;
	     * the listener will be added to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted.
	     * If the function returns true then it will be removed after calling.
	     * @for Events
	     * @method addListener
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'addListener',
	    value: function addListener(evt, listener) {
	      if (!isValidListener(listener)) {
	        throw new TypeError('listener must be a function');
	      }
	
	      var listeners = this.getListenersAsObject(evt);
	      var listenerIsWrapped = (typeof listener === 'undefined' ? 'undefined' : _typeof(listener)) === 'object';
	      var key = void 0;
	
	      for (key in listeners) {
	        var propertyCheck = Object.prototype.hasOwnProperty.call(listeners, key);
	        var checkIndexOfListener = indexOfListener(listeners[key], listener);
	        if (propertyCheck && checkIndexOfListener === -1) {
	          listeners[key].push(listenerIsWrapped ? listener : {
	            listener: listener,
	            once: false
	          });
	        }
	      }
	      return this;
	    }
	
	    /**
	     * Semi-alias of addListener. It will add a listener that will be
	     * automatically removed after its first execution.
	     *
	     * @param {String|RegExp} evt Name of the event to attach the listener to.
	     * @param {Function} listener Method to be called when the event is emitted.
	     * If the function returns true then it will be removed after calling.
	     * @for Events
	     * @method addOnceListener
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'addOnceListener',
	    value: function addOnceListener(evt, listener) {
	      return this.addListener(evt, {
	        listener: listener,
	        once: true
	      });
	    }
	
	    /**
	     * Defines an event name.
	     * This is required if you want to use a regex to add a listener to multiple events at once.
	     * If you don't do this then how do you expect it to know what event to add to?
	     * Should it just add to every possible match for a regex? No. That is scary and bad.
	     * You need to tell it what event names should be matched by a regex.
	     *
	     * @param {String} evt Name of the event to create.
	     * @for Events
	     * @method defineEvent
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'defineEvent',
	    value: function defineEvent(evt) {
	      this.getListeners(evt);
	      return this;
	    }
	
	    /**
	     * Uses defineEvent to define multiple events.
	     *
	     * @param {String[]} evts An array of event names to define.
	     * @for Events
	     * @method defineEvents
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'defineEvents',
	    value: function defineEvents(evts) {
	      for (var i = 0; i < evts.length; i += 1) {
	        this.defineEvent(evts[i]);
	      }
	      return this;
	    }
	
	    /**
	     * Removes a listener function from the specified event.
	     * When passed a regular expression as the event name,
	     * it will remove the listener from all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to remove the listener from.
	     * @param {Function} listener Method to remove from the event.
	     * @for Events
	     * @method removeListener
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'removeListener',
	    value: function removeListener(evt, listener) {
	      var listeners = this.getListenersAsObject(evt);
	      var index = void 0;
	      var key = void 0;
	
	      for (key in listeners) {
	        if (Object.prototype.hasOwnProperty.call(listeners, key)) {
	          index = indexOfListener(listeners[key], listener);
	
	          if (index !== -1) {
	            listeners[key].splice(index, 1);
	          }
	        }
	      }
	
	      return this;
	    }
	
	    /**
	     * Adds listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the first argument you can add to multiple events at once.
	     * The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added.
	     * Can pass it a regular expression to add the array of listeners to all events that match it.
	     * Yeah, this function does quite a bit. That's probably a bad thing.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
	     * An object if you wish to add to multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to add.
	     * @for Events
	     * @method addListeners
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'addListeners',
	    value: function addListeners(evt, listeners) {
	      return this.manipulateListeners(false, evt, listeners);
	    }
	
	    /**
	     * Removes listeners in bulk using the manipulateListeners method.
	     * If you pass an object as the first argument you can remove from multiple events at once.
	     * The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be removed.
	     * You can also pass it a regular expression to
	     * remove the listeners from all events that match it.
	     *
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
	     * An object if you wish to remove from multiple events at once.
	     * @param {Function[]} [listeners] An optional array of listener functions to remove.
	     * @for Events
	     * @method removeListeners
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'removeListeners',
	    value: function removeListeners(evt, listeners) {
	      return this.manipulateListeners(true, evt, listeners);
	    }
	
	    /**
	     * Edits listeners in bulk.
	     * The addListeners and removeListeners methods both use this to do their job.
	     * You should really use those instead, this is a little lower level.
	     * The first argument will determine if the listeners are removed (true) or added (false).
	     * If you pass an object as the second argument you can add/remove from multiple events at once.
	     * The object should contain key value pairs of events and listeners or listener arrays.
	     * You can also pass it an event name and an array of listeners to be added/removed.
	     * You can pass it a regular expression to manipulate the listeners of all events that match it.
	     *
	     * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	     * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
	     * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	     * @for Events
	     * @method manipulateListeners
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'manipulateListeners',
	    value: function manipulateListeners(remove, evt, listeners) {
	      var i = void 0;
	      var value = void 0;
	      var single = remove ? this.removeListener : this.addListener;
	      var multiple = remove ? this.removeListeners : this.addListeners;
	
	      // If evt is an object then pass each of its properties to this method
	      if ((typeof evt === 'undefined' ? 'undefined' : _typeof(evt)) === 'object' && !(evt instanceof RegExp)) {
	        for (i in evt) {
	          value = evt[i];
	          if (Object.prototype.hasOwnProperty.call(evt, i) && value) {
	            // Pass the single listener straight through to the singular method
	            if (typeof value === 'function') {
	              single.call(this, i, value);
	            } else {
	              // Otherwise pass back to the multiple function
	              multiple.call(this, i, value);
	            }
	          }
	        }
	      } else {
	        // So evt must be a string
	        // And listeners must be an array of listeners
	        // Loop over it and pass each one to the multiple method
	        i = listeners.length - 1;
	        while (i) {
	          single.call(this, evt, listeners[i]);
	          i -= 1;
	        }
	      }
	
	      return this;
	    }
	
	    /**
	     * Removes all listeners from a specified event.
	     * If you do not specify an event then all listeners will be removed.
	     * That means every event will be emptied.
	     * You can also pass a regex to remove all events that match it.
	     *
	     * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for.
	     * @for Events
	     * @method removeEvent
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'removeEvent',
	    value: function removeEvent(evt) {
	      var type = typeof evt === 'undefined' ? 'undefined' : _typeof(evt);
	      var events = this._getEvents();
	      var key = void 0;
	
	      // Remove different things depending on the state of evt
	      if (type === 'string') {
	        // Remove all listeners for the specified event
	        delete events[evt];
	      } else if (evt instanceof RegExp) {
	        // Remove all events matching the regex.
	        for (key in events) {
	          if (Object.prototype.hasOwnProperty.call(events, key) && evt.test(key)) {
	            delete events[key];
	          }
	        }
	      } else {
	        // Remove all listeners in all events
	        delete this._events;
	      }
	
	      return this;
	    }
	
	    /**
	     * Emits an event of your choice.
	     * When emitted, every listener attached to that event will be executed.
	     * If you pass the optional argument array then those arguments
	     * will be passed to every listener upon execution.
	     * Because it uses `apply`, your array of arguments will be passed as
	     * if you wrote them out separately.
	     * So they will not arrive within the array on the other side, they will be separate.
	     * You can also pass a regular expression to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {Array} [args] Optional array of arguments to be passed to each listener.
	     * @for Events
	     * @method triggerEvent
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'triggerEvent',
	    value: function triggerEvent(evt, args) {
	      var listenersMap = this.getListenersAsObject(evt);
	      var listeners = void 0;
	      var listener = void 0;
	      var i = void 0;
	      var key = void 0;
	      var response = void 0;
	
	      for (key in listenersMap) {
	        if (Object.prototype.hasOwnProperty.call(listenersMap, key)) {
	          listeners = listenersMap[key].slice(0);
	
	          for (i = 0; i < listeners.length; i += 1) {
	            // If the listener returns true then it shall be removed from the event
	            // The function is executed either with a basic call or an apply if there is an args array
	            listener = listeners[i];
	
	            if (listener.once === true) {
	              this.removeListener(evt, listener.listener);
	            }
	
	            response = listener.listener.apply(this, args || []);
	
	            if (response === this._getOnceReturnValue()) {
	              this.removeListener(evt, listener.listener);
	            }
	          }
	        }
	      }
	
	      return this;
	    }
	
	    /**
	     * Subtly different from emitEvent in that it will pass its arguments on to the listeners,
	     * as opposed to taking a single array of arguments to pass on.
	     * you can pass a regex in place of the event name to emit to all events that match it.
	     *
	     * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	     * @param {...*} Optional additional arguments to be passed to each listener.
	     * @for Events
	     * @method emit
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'emit',
	    value: function emit(evt) {
	      var args = Array.prototype.slice.call(arguments, 1); // eslint-disable-line prefer-rest-params
	      return this.triggerEvent(evt, args);
	    }
	
	    /**
	     * Sets the current value to check against when executing listeners. If a
	     * listeners return value matches the one set here then it will be removed
	     * after execution. This value defaults to true.
	     *
	     * @param {*} value The new value to check for when executing listeners.
	     * @for Events
	     * @method setOnceReturnValue
	     * @return {Object} Current instance of EventEmitter for chaining.
	     */
	
	  }, {
	    key: 'setOnceReturnValue',
	    value: function setOnceReturnValue(value) {
	      this._onceReturnValue = value;
	      return this;
	    }
	
	    /**
	     * Fetches the current value to check against when executing listeners. If
	     * the listeners return value matches this one then it should be removed
	     * automatically. It will return true by default.
	     *
	     * @for Events
	     * @method _getOnceReturnValue
	     * @return {*|Boolean} The current value to check for or the default, true.
	     * @api private
	     */
	
	  }, {
	    key: '_getOnceReturnValue',
	    value: function _getOnceReturnValue() {
	      var returnValue = void 0;
	      if (Object.prototype.hasOwnProperty.call(this, '_onceReturnValue')) {
	        returnValue = this._onceReturnValue;
	      } else {
	        returnValue = true;
	      }
	      return returnValue;
	    }
	
	    /**
	     * Fetches the events object and creates one if required.
	     *
	     * @for Events
	     * @method _getEvents
	     * @return {Object} The events storage object.
	     * @api private
	     */
	
	  }, {
	    key: '_getEvents',
	    value: function _getEvents() {
	      return this._events || (this._events = {});
	    }
	  }]);
	
	  return Events;
	}();
	
	exports.default = Events;
	module.exports = exports['default'];

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	/**
	 *
	 * @type {{width: string, height: string, deneme2: string, videoPlayerId: string, vastOptions: {media_type: string, media_bitrate_min: number, media_bitrate_max: number, ad_caption: string}, DRM: {playReady: {mimeType: string, DRMSystemID: string, licenserUrl: string}}}}
	 */
	var Config = {
	  width: '1920px',
	  height: '1080px',
	  debug: true,
	  videoPlayerId: 'dtv-video',
	  vastOptions: {
	    media_type: 'video/mp4',
	    media_bitrate_min: 200,
	    media_bitrate_max: 1200,
	    ad_caption: 'Advertisement'
	  },
	  DRM: {
	    playReady: {
	      mimeType: 'application/vnd.ms-playready.initiator+xml',
	      DRMSystemID: 'urn:dvb:casystemid:19219',
	      licenserUrl: ''
	    }
	  }
	};
	
	exports.default = Config;
	module.exports = exports['default'];

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./arcelik": 10,
		"./arcelik.js": 10,
		"./lg": 11,
		"./lg.js": 11,
		"./philips": 12,
		"./philips.js": 12,
		"./samsung": 13,
		"./samsung.js": 13,
		"./tizen": 14,
		"./tizen.js": 14,
		"./vestel": 15,
		"./vestel.js": 15,
		"./web": 16,
		"./web.js": 16,
		"./webos": 17,
		"./webos.js": 17
	};
	function webpackContext(req) {
		return __webpack_require__(webpackContextResolve(req));
	};
	function webpackContextResolve(req) {
		return map[req] || (function() { throw new Error("Cannot find module '" + req + "'.") }());
	};
	webpackContext.keys = function webpackContextKeys() {
		return Object.keys(map);
	};
	webpackContext.resolve = webpackContextResolve;
	module.exports = webpackContext;
	webpackContext.id = 9;


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceArcelik = function (_Device) {
	  _inherits(DeviceArcelik, _Device);
	
	  /**
	   * This is extendable class for Arcelik group devices (includes Beko, Grundig etc)
	   *
	   * @class Device_Arcelik
	   * @extends Device
	   * @constructor
	   */
	  function DeviceArcelik(config) {
	    _classCallCheck(this, DeviceArcelik);
	
	    var _this = _possibleConstructorReturn(this, (DeviceArcelik.__proto__ || Object.getPrototypeOf(DeviceArcelik)).call(this));
	
	    _this.initEvents();
	    _this.initPlayerClass();
	    _logger2.default.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
	    _this.Player.createVideoElement = _this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config); // Merges default config with user config
	    return _this;
	  }
	
	  /**
	   * Abstract Player createVideoElement function.
	   *
	   * @abstract
	   * @for Device_Arcelik
	   * @method createVideoElement
	   * @return {Boolean} true
	   */
	
	
	  _createClass(DeviceArcelik, [{
	    key: 'createVideoElement',
	    value: function createVideoElement() {
	      if (this.videoElement) {
	        this.deleteVideoElement();
	      }
	      console.log(this.Config);
	      this.videoElement = document.createElement('video');
	      this.videoElement.style.position = 'absolute';
	      this.videoElement.setAttribute('width', this.Config.width);
	      this.videoElement.setAttribute('height', this.Config.height);
	      this.videoElement.setAttribute('id', 'dtv-video');
	      this.videoElement.setAttribute('data', '');
	      this.videoElement.setAttribute('class', 'player');
	      document.body.appendChild(this.videoElement);
	      this.setPlayerInfo('OIPF');
	      this.registerVideoEvents();
	      _logger2.default.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
	      this.initAudioClass();
	      return true;
	    }
	  }]);
	
	  return DeviceArcelik;
	}(_device2.default);
	
	exports.default = DeviceArcelik;
	module.exports = exports['default'];

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceLG = function (_Device) {
	  _inherits(DeviceLG, _Device);
	
	  /**
	   * This is extendable class for LG NetCast devices
	   *
	   * @class Device_LG
	   * @extends Device
	   * @constructor
	   */
	  function DeviceLG() {
	    _classCallCheck(this, DeviceLG);
	
	    var _this = _possibleConstructorReturn(this, (DeviceLG.__proto__ || Object.getPrototypeOf(DeviceLG)).call(this));
	
	    _logger2.default.addLog('Device_LG', 'info', 'LG NetCast device is in progress');
	    return _this;
	  }
	
	  return DeviceLG;
	}(_device2.default);
	
	exports.default = DeviceLG;
	module.exports = exports['default'];

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DevicePhilips = function (_Device) {
	  _inherits(DevicePhilips, _Device);
	
	  /**
	   * This is extendable class for Philips devices
	   *
	   * @class Device_Philips
	   * @extends Device
	   * @constructor
	   */
	  function DevicePhilips() {
	    _classCallCheck(this, DevicePhilips);
	
	    var _this = _possibleConstructorReturn(this, (DevicePhilips.__proto__ || Object.getPrototypeOf(DevicePhilips)).call(this));
	
	    _logger2.default.addLog('Device_Philips', 'info', 'Philips device is in progress');
	    return _this;
	  }
	
	  return DevicePhilips;
	}(_device2.default);
	
	exports.default = DevicePhilips;
	module.exports = exports['default'];

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceSamsung = function (_Device) {
	  _inherits(DeviceSamsung, _Device);
	
	  /**
	   * This is extendable class for Samsung Orsay devices
	   *
	   * @class Device_Samsung
	   * @extends Device
	   * @constructor
	   */
	  function DeviceSamsung() {
	    _classCallCheck(this, DeviceSamsung);
	
	    var _this = _possibleConstructorReturn(this, (DeviceSamsung.__proto__ || Object.getPrototypeOf(DeviceSamsung)).call(this));
	
	    _logger2.default.addLog('Device_Samsung', 'info', 'Samsung device is in progress');
	    return _this;
	  }
	
	  return DeviceSamsung;
	}(_device2.default);
	
	exports.default = DeviceSamsung;
	module.exports = exports['default'];

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceTizen = function (_Device) {
	  _inherits(DeviceTizen, _Device);
	
	  /**
	   * This is extendable class for Samsung Tizen devices
	   *
	   * @class Device_Tizen
	   * @extends Device
	   * @constructor
	   */
	  function DeviceTizen(config) {
	    _classCallCheck(this, DeviceTizen);
	
	    var _this = _possibleConstructorReturn(this, (DeviceTizen.__proto__ || Object.getPrototypeOf(DeviceTizen)).call(this));
	
	    _this.initEvents();
	    _this.initPlayerClass();
	    _logger2.default.addLog('Device_Tizen', 'info', 'Samsung Tizen Initialized');
	    // this.Player.createVideoElement = this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config);
	    return _this;
	  }
	
	  return DeviceTizen;
	}(_device2.default);
	
	exports.default = DeviceTizen;
	module.exports = exports['default'];

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceVestel = function (_Device) {
	  _inherits(DeviceVestel, _Device);
	
	  /**
	   * This is extendable class for Vestel group devices
	   *
	   * @class Device_Vestel
	   * @extends Device
	   * @constructor
	   */
	  function DeviceVestel(config) {
	    _classCallCheck(this, DeviceVestel);
	
	    var _this = _possibleConstructorReturn(this, (DeviceVestel.__proto__ || Object.getPrototypeOf(DeviceVestel)).call(this));
	
	    _this.initEvents();
	    _this.initPlayerClass();
	    _logger2.default.addLog('Device_Vestel', 'info', 'Vestel Device Initialized');
	    _this.Player.createVideoElement = _this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config); // Merges default config with user config
	    return _this;
	  }
	
	  /**
	   * Abstract Player createVideoElement function.
	   *
	   * @abstract
	   * @for Device_Vestel
	   * @method createVideoElement
	   * @return {Boolean} true
	   */
	
	
	  _createClass(DeviceVestel, [{
	    key: 'createVideoElement',
	    value: function createVideoElement() {
	      if (this.videoElement) {
	        this.deleteVideoElement();
	      }
	      console.log(this.Config);
	      this.videoElement = document.createElement('video');
	      this.videoElement.style.position = 'absolute';
	      this.videoElement.setAttribute('width', this.Config.width);
	      this.videoElement.setAttribute('height', this.Config.height);
	      this.videoElement.setAttribute('data', '');
	      this.videoElement.setAttribute('class', 'player');
	      document.body.appendChild(this.videoElement);
	      this.setPlayerInfo('OIPF');
	      this.registerVideoEvents();
	      _logger2.default.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
	      return null;
	    }
	  }]);
	
	  return DeviceVestel;
	}(_device2.default);
	
	exports.default = DeviceVestel;
	module.exports = exports['default'];

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _config = __webpack_require__(8);
	
	var _config2 = _interopRequireDefault(_config);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DeviceWeb = function (_Device) {
	  _inherits(DeviceWeb, _Device);
	
	  /**
	   * This is extendable class for Web Development Environment
	   *
	   * @class Device_Web
	   * @extends Device
	   * @constructor
	   */
	  function DeviceWeb(config) {
	    _classCallCheck(this, DeviceWeb);
	
	    var _this = _possibleConstructorReturn(this, (DeviceWeb.__proto__ || Object.getPrototypeOf(DeviceWeb)).call(this));
	
	    _this.initEvents();
	    _this.initPlayerClass();
	    _logger2.default.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
	    _this.Player.createVideoElement = _this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config); // Merges default config with user config
	    console.log('CONFIG GELDI', _config2.default);
	    return _this;
	  }
	
	  /**
	   * Abstract Player createVideoElement function.
	   *
	   * @abstract
	   * @for Device_Web
	   * @method createVideoElement
	   * @return {Boolean} true
	   */
	
	
	  _createClass(DeviceWeb, [{
	    key: 'createVideoElement',
	    value: function createVideoElement() {
	      console.log(this.Config);
	      this.videoElement = document.createElement('video');
	      this.videoElement.style.position = 'absolute';
	      this.videoElement.setAttribute('width', this.Config.width);
	      this.videoElement.setAttribute('height', this.Config.height);
	      this.videoElement.setAttribute('id', this.Config.videoPlayerId);
	      this.videoElement.setAttribute('data', '');
	      this.videoElement.setAttribute('class', 'player');
	      document.body.appendChild(this.videoElement);
	      this.setPlayerInfo();
	      this.registerVideoEvents();
	      _logger2.default.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
	      this.initAudioClass();
	      return null;
	    }
	  }]);
	
	  return DeviceWeb;
	}(_device2.default);
	
	exports.default = DeviceWeb;
	module.exports = exports['default'];

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _device = __webpack_require__(1);
	
	var _device2 = _interopRequireDefault(_device);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var WebOsLibrary = __webpack_require__(18);
	
	var DeviceWebOs = function (_Device) {
	  _inherits(DeviceWebOs, _Device);
	
	  /**
	   * This is extendable class for LG WebOs devices
	   *
	   * @class Device_WebOs
	   * @extends Device
	   * @constructor
	   */
	  function DeviceWebOs(config) {
	    _classCallCheck(this, DeviceWebOs);
	
	    var _this = _possibleConstructorReturn(this, (DeviceWebOs.__proto__ || Object.getPrototypeOf(DeviceWebOs)).call(this));
	
	    _this.initEvents();
	    _this.initPlayerClass();
	    _logger2.default.addLog('Device_WebOS', 'info', 'Arcelik Device Initialized');
	    _this.Player.createVideoElement = _this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config); // Merges default config with user config
	    _this.addWebOSLib();
	    return _this;
	  }
	
	  /**
	   * WebOs native api's are required to use webos.js file.
	   * This method provides necessary libraries.
	   *
	   * @for Device_WebOs
	   * @method addWebOsLib
	   * @return {Boolean} true
	   */
	
	
	  _createClass(DeviceWebOs, [{
	    key: 'addWebOSLib',
	    value: function addWebOSLib() {
	      /*    this.webOSLibrary = document.createElement('script');
	          this.webOSLibrary.setAttribute('type', 'text/javascript');
	          this.webOSLibrary.setAttribute('src', 'lib/webOS.js');
	          document.body.appendChild(this.webOSLibrary);*/
	      this.WebOsLibrary = WebOsLibrary;
	      _logger2.default.addLog('Device_WebOs', 'info', 'WebOs Library loaded successfully', this.WebOsLibrary);
	      return true;
	    }
	
	    /**
	     * Abstract Player createVideoElement function.
	     *
	     * @abstract
	     * @for Device_WebOs
	     * @method createVideoElement
	     * @return {Boolean} true
	     */
	
	  }, {
	    key: 'createVideoElement',
	    value: function createVideoElement() {
	      if (this.videoElement) {
	        this.deleteVideoElement();
	      }
	      console.log(this.Config);
	      this.videoElement = document.createElement('video');
	      this.videoElement.style.position = 'absolute';
	      this.videoElement.setAttribute('width', this.Config.width);
	      this.videoElement.setAttribute('height', this.Config.height);
	      this.videoElement.setAttribute('id', '');
	      this.videoElement.setAttribute('class', 'player');
	      document.body.appendChild(this.videoElement);
	      this.setPlayerInfo('WEBOS');
	      this.registerVideoEvents();
	      _logger2.default.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
	      this.initAudioClass();
	      return null;
	    }
	  }]);
	
	  return DeviceWebOs;
	}(_device2.default);
	
	exports.default = DeviceWebOs;
	module.exports = exports['default'];

/***/ },
/* 18 */
/***/ function(module, exports) {

	"use strict";
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	window.webOS = window.webOS || {};
	
	// device.js
	(function () {
	  try {
	    var deviceInfo = JSON.parse(PalmSystem.deviceInfo);
	    webOS.device = deviceInfo;
	  } catch (e) {
	    webOS.device = {};
	  }
	})();
	
	// platform.js
	(function () {
	  if (window.PalmSystem) {
	    webOS.platform = {};
	    if (navigator.userAgent.indexOf("SmartTV") > -1 || navigator.userAgent.indexOf("Large Screen") > -1) {
	      webOS.platform.tv = true;
	    } else if (webOS.device.platformVersionMajor && webOS.device.platformVersionMinor) {
	      try {
	        var major = parseInt(webOS.device.platformVersionMajor);
	        var minor = parseInt(webOS.device.platformVersionMinor);
	        if (major < 3 || major == 3 && minor <= 0) {
	          webOS.platform.legacy = true;
	        } else {
	          webOS.platform.open = true;
	        }
	      } catch (e) {
	        webOS.platform.open = true;
	      }
	    } else {
	      webOS.platform.open = true;
	    }
	  }
	})();
	
	// application.js
	(function () {
	  webOS.fetchAppId = function () {
	    if (window.PalmSystem) {
	      return PalmSystem.identifier.split(" ")[0];
	    }
	  };
	  webOS.fetchAppInfo = function () {
	    if (!this.appInfo) {
	      var readAppInfoFile = function readAppInfoFile(filepath) {
	        if (window.palmGetResource) {
	          try {
	            return palmGetResource(filepath);
	          } catch (e) {
	            console.log("error reading appinfo.json" + e.message);
	          }
	        } else {
	          var req = new XMLHttpRequest();
	          req.open("GET", filepath + "?palmGetResource=true", false);
	          req.send(null);
	          if (req.status >= 200 && req.status < 300) {
	            return req.responseText;
	          } else {
	            console.log("error reading appinfo.json");
	          }
	        }
	      };
	      var appID = this.fetchAppId();
	      var paths = [this.fetchAppRootPath() + "appinfo.json", "file:///media/cryptofs/apps/usr/palm/applications/" + appID + "/appinfo.json", "file:///usr/palm/applications/" + appID + "/appinfo.json"];
	      var index = paths[0].indexOf(appID);
	      if (index > -1) {
	        paths.unshift(paths[0].substring(0, index) + appID + "/appinfo.json");
	      }
	      var appInfoJSON = undefined;
	      for (var i = 0; i < paths.length && !appInfoJSON; i++) {
	        appInfoJSON = readAppInfoFile(paths[i]);
	      }
	      if (appInfoJSON) {
	        this.appInfo = enyo.json.parse(appInfoJSON);
	      }
	    }
	    return this.appInfo;
	  };
	  webOS.fetchAppRootPath = function () {
	    var base = window.location.href;
	    if ("baseURI" in window.document) {
	      base = window.document.baseURI;
	    } else {
	      var baseTags = window.document.getElementsByTagName("base");
	      if (baseTags.length > 0) {
	        base = baseTags[0].href;
	      }
	    }
	    var match = base.match(new RegExp(".*://[^#]*/"));
	    if (match) {
	      return match[0];
	    }
	    return "";
	  };
	})();
	
	// keyboard.js
	(function () {
	  var hasVKeyboard = !(webOS.platform.legacy && webOS.device.platformVersionMajor && parseInt(webOS.device.platformVersionMajor) < 3);
	  if (hasVKeyboard) {
	    var state = {};
	    Mojo = window.Mojo || {};
	    Mojo.keyboardShown = function (inKeyboardShowing) {
	      state.isShowing = inKeyboardShowing;
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
	      }, isShowing: function isShowing() {
	        return state.isShowing || false;
	      }, show: function show(type) {
	        if (this.isManualMode() && window.PalmSystem) {
	          PalmSystem.keyboardShow(type || 0);
	        }
	      }, hide: function hide() {
	        if (this.isManualMode() && window.PalmSystem) {
	          PalmSystem.keyboardHide();
	        }
	      }, setManualMode: function setManualMode(mode) {
	        state.manual = mode;
	        if (window.PalmSystem) {
	          PalmSystem.setManualKeyboardEnabled(mode);
	        }
	      }, isManualMode: function isManualMode() {
	        return state.manual || false;
	      }, forceShow: function forceShow(inType) {
	        this.setManualMode(true);
	        if (window.PalmSystem) {
	          PalmSystem.keyboardShow(inType || 0);
	        }
	      }, forceHide: function forceHide() {
	        this.setManualMode(true);
	        if (window.PalmSystem) {
	          PalmSystem.keyboardHide();
	        }
	      }
	    };
	  }
	})();
	
	// launch.js
	(function () {
	  if ((webOS.platform.legacy || webOS.platform.open) && !window.cordova) {
	    var fireDocumentEvent = function fireDocumentEvent(type, data) {
	      var evt = document.createEvent("Events");
	      evt.initEvent(type, false, false);
	      for (var i in data) {
	        evt[i] = data[i];
	      }
	      document.dispatchEvent(evt);
	    };
	    Mojo = window.Mojo || {};
	    var lp = JSON.parse(PalmSystem.launchParams || "{}") || {};
	    fireDocumentEvent("webOSLaunch", { type: "webOSLaunch", detail: lp });
	    window.Mojo.relaunch = function (e) {
	      var lp = JSON.parse(PalmSystem.launchParams || "{}") || {};
	      if (lp["palm-command"] && lp["palm-command"] == "open-app-menu") {
	        fireDocumentEvent("menubutton", {});
	        return true;
	      } else {
	        fireDocumentEvent("webOSRelaunch", { type: "webOSRelaunch", detail: lp });
	      }
	    };
	    if (window.PalmSystem) {
	      window.PalmSystem.stageReady();
	    }
	  }
	})();
	
	// notification.js
	(function () {
	  webOS.notification = {
	    showToast: function showToast(params, callback) {
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
	        // var response = params.response || {banner: true};
	        var id = PalmSystem.addBannerMessage(message, JSON.stringify(toastParams), icon, soundClass, soundFile, soundDurationMs);
	        callback && callback(id);
	      } else {
	        if (message.length > 60) {
	          console.warn("Toast notification message is longer than recommended. May not display as intended");
	        }
	        var reqParam = { sourceId: source, message: message, stale: stale, noaction: noaction };
	        if (icon && icon.length > 0) {
	          reqParam.iconUrl = icon;
	        }
	        if (!noaction) {
	          if (target) {
	            reqParam.onclick = { target: target };
	          } else {
	            reqParam.onclick = { appId: appId, params: toastParams };
	          }
	        }
	        this.showToastRequest = webOS.service.request("palm://com.webos.notification", {
	          method: "createToast",
	          parameters: reqParam,
	          onSuccess: function onSuccess(inResponse) {
	            callback && callback(inResponse.toastId);
	          },
	          onFailure: function onFailure(inError) {
	            console.error("Failed to create toast: " + JSON.stringify(inError));
	            callback && callback();
	          }
	        });
	      }
	    }, removeToast: function removeToast(toastId) {
	      if (webOS.platform.legacy || webOS.platform.open) {
	        try {
	          PalmSystem.removeBannerMessage(toastId);
	        } catch (e) {
	          console.warn(e);
	          PalmSystem.clearBannerMessage();
	        }
	      } else {
	        this.removeToastRequest = webOS.service.request("palm://com.webos.notification", {
	          method: "closeToast",
	          parameters: { toastId: toastId }
	        });
	      }
	    }, supportsDashboard: function supportsDashboard() {
	      return webOS.platform.legacy || webOS.platform.open;
	    }, showDashboard: function showDashboard(url, html) {
	      if (webOS.platform.legacy || webOS.platform.open) {
	        var dash = window.open(url, "_blank", 'attributes={"window":"dashboard"}');
	        if (html) {
	          dash.document.write(html);
	        }
	        if (dash.PalmSystem) {
	          dash.PalmSystem.stageReady();
	        }
	        return dash;
	      } else {
	        console.warn("Dashboards are not supported on this version of webOS.");
	      }
	    }
	  };
	})();
	
	// orientation.js
	(function () {
	  webOS.orientation = {
	    setOrientation: function setOrientation(orientation) {
	      if (window.PalmSystem && PalmSystem.setWindowOrientation) {
	        PalmSystem.setWindowOrientation(orientation);
	      }
	    }, getOrientation: function getOrientation() {
	      if (window.PalmSystem && PalmSystem.setWindowOrientation) {
	        return PalmSystem.windowOrientation;
	      } else {
	        return "up";
	      }
	    }
	  };
	})();
	
	// pmloglib.js
	(function () {
	  // var levelNone = -1;
	  var levelEmergency = 0;
	  var levelAlert = 1;
	  var levelCritical = 2;
	  var levelError = 3;
	  var levelWarning = 4;
	  var levelNotice = 5;
	  var levelInfo = 6;
	  var levelDebug = 7;
	  var isObject = function isObject(obj) {
	    return !!obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && Object.prototype.toString.call(obj) !== "[object Array]";
	  };
	  var log = function log(level, messageId, keyVals, freeText) {
	    if (window.PalmSystem) {
	      if (keyVals && !isObject(keyVals)) {
	        level = levelError;
	        keyVals = { msgid: messageId };
	        messageId = "MISMATCHED_FMT";
	        freeText = null;
	        console.warn("webOSLog called with invalid format: keyVals must be an object");
	      }
	      if (!messageId && level != levelDebug) {
	        console.warn("webOSLog called with invalid format: messageId was empty");
	      }
	      if (keyVals) {
	        keyVals = JSON.stringify(keyVals);
	      }
	      if (window.PalmSystem.PmLogString) {
	        if (level == levelDebug) {
	          window.PalmSystem.PmLogString(level, null, null, freeText);
	        } else {
	          window.PalmSystem.PmLogString(level, messageId, keyVals, freeText);
	        }
	      } else {
	        console.error("Unable to send log; PmLogString not found in this version of PalmSystem");
	      }
	    }
	  };
	  webOS.emergency = function (messageId, keyVals, freeText) {
	    log(levelEmergency, messageId, keyVals, freeText);
	  };
	  webOS.alert = function (messageId, keyVals, freeText) {
	    log(levelAlert, messageId, keyVals, freeText);
	  };
	  webOS.critical = function (messageId, keyVals, freeText) {
	    log(levelCritical, messageId, keyVals, freeText);
	  };
	  webOS.error = function (messageId, keyVals, freeText) {
	    log(levelError, messageId, keyVals, freeText);
	  };
	  webOS.warning = function (messageId, keyVals, freeText) {
	    log(levelWarning, messageId, keyVals, freeText);
	  };
	  webOS.notice = function (messageId, keyVals, freeText) {
	    log(levelNotice, messageId, keyVals, freeText);
	  };
	  webOS.info = function (messageId, keyVals, freeText) {
	    log(levelInfo, messageId, keyVals, freeText);
	  };
	  webOS.debug = function (freeText) {
	    log(levelDebug, "", "", freeText);
	  };
	})();
	
	// service.js
	(function () {
	  function LS2Request(uri, params) {
	    this.uri = uri;
	    params = params || {};
	    if (params.method) {
	      if (this.uri.charAt(this.uri.length - 1) != "/") {
	        this.uri += "/";
	      }
	      this.uri += params.method;
	    }
	    if (typeof params.onSuccess === "function") {
	      this.onSuccess = params.onSuccess;
	    }
	    if (typeof params.onFailure === "function") {
	      this.onFailure = params.onFailure;
	    }
	    if (typeof params.onComplete === "function") {
	      this.onComplete = params.onComplete;
	    }
	    this.params = _typeof(params.parameters) === "object" ? params.parameters : {};
	    this.subscribe = params.subscribe || false;
	    if (this.subscribe) {
	      this.params.subscribe = params.subscribe;
	    }
	    if (this.params.subscribe) {
	      this.subscribe = this.params.subscribe;
	    }
	    this.resubscribe = params.resubscribe || false;
	    this.send();
	  }
	
	  LS2Request.prototype.send = function () {
	    if (!window.PalmServiceBridge) {
	      console.error("PalmServiceBridge not found.");
	      return;
	    }
	    this.bridge = new PalmServiceBridge();
	    var self = this;
	    this.bridge.onservicecallback = this.callback = function (msg) {
	      var parsedMsg;
	      if (self.cancelled) {
	        return;
	      }
	      try {
	        parsedMsg = JSON.parse(msg);
	      } catch (e) {
	        parsedMsg = { errorCode: -1, errorText: msg };
	      }
	      if ((parsedMsg.errorCode || parsedMsg.returnValue === false) && self.onFailure) {
	        self.onFailure(parsedMsg);
	        if (self.resubscribe && self.subscribe) {
	          self.delayID = setTimeout(function () {
	            self.send();
	          }, LS2Request.resubscribeDelay);
	        }
	      } else if (self.onSuccess) {
	        self.onSuccess(parsedMsg);
	      }
	      if (self.onComplete) {
	        self.onComplete(parsedMsg);
	      }
	      if (!self.subscribe) {
	        self.cancel();
	      }
	    };
	    this.bridge.call(this.uri, JSON.stringify(this.params));
	  };
	  LS2Request.prototype.cancel = function () {
	    this.cancelled = true;
	    if (this.resubscribeJob) {
	      clearTimeout(this.delayID);
	    }
	    if (this.bridge) {
	      this.bridge.cancel();
	      this.bridge = undefined;
	    }
	  };
	  LS2Request.prototype.toString = function () {
	    return "[LS2Request]";
	  };
	  LS2Request.resubscribeDelay = 1e4;
	  webOS.service = {
	    request: function request(uri, params) {
	      return new LS2Request(uri, params);
	    },
	    systemPrefix: webOS.platform.legacy || webOS.platform.open ? "com.palm" : "com.webos",
	    protocol: webOS.platform.legacy && webOS.device.platformVersionMajor && parseInt(webOS.device.platformVersionMajor) <= 1 ? "palm://" : "luna://"
	  };
	  navigator.service = { request: webOS.service.request };
	  navigator.service.Request = navigator.service.request;
	})();
	
	// version.js
	(function () {
	  webOS.libVersion = "0.1.0";
	})();
	
	// window.js
	(function () {
	  webOS.window = {
	    launchParams: function launchParams(inWindow) {
	      inWindow = inWindow || window;
	      if (inWindow.PalmSystem) {
	        return JSON.parse(inWindow.PalmSystem.launchParams || "{}") || {};
	      }
	      return {};
	    }, isActivated: function isActivated(inWindow) {
	      inWindow = inWindow || window;
	      if (inWindow.PalmSystem) {
	        return inWindow.PalmSystem.isActivated;
	      }
	      return false;
	    }, activate: function activate(inWindow) {
	      inWindow = inWindow || window;
	      if (inWindow.PalmSystem) {
	        inWindow.PalmSystem.activate();
	      }
	    }, deactivate: function deactivate(inWindow) {
	      inWindow = inWindow || window;
	      if (inWindow.PalmSystem) {
	        inWindow.PalmSystem.deactivate();
	      }
	    }, newCard: function newCard(url, html) {
	      if (!url && !(webOS.platform.legacy || webOS.platform.open)) {
	        url = "about:blank";
	      }
	      var child = window.open(url);
	      if (html) {
	        child.document.write(html);
	      }
	      if (child.PalmSystem) {
	        child.PalmSystem.stageReady();
	      }
	      return child;
	    }, setFullScreen: function setFullScreen(state) {
	      if (window.PalmSystem && PalmSystem.enableFullScreenMode) {
	        PalmSystem.enableFullScreenMode(state);
	      }
	    }, setWindowProperties: function setWindowProperties(inWindow, inProps) {
	      if (arguments.length == 1) {
	        inProps = inWindow;
	        inWindow = window;
	      }
	      if (inWindow.PalmSystem && inWindow.PalmSystem.setWindowProperties) {
	        inWindow.webOS.window.properties = inProps = inProps || {};
	        inWindow.PalmSystem.setWindowProperties(inProps);
	      }
	    }, getWindowProperties: function getWindowProperties(inWindow) {
	      inWindow = inWindow || window;
	      inWindow.webOS.window.properties = inWindow.webOS.window.properties || {};
	      return inWindow.webOS.window.properties;
	    }, blockScreenTimeout: function blockScreenTimeout(state) {
	      webOS.window.properties.blockScreenTimeout = state;
	      this.setWindowProperties(navigator.windowProperties);
	    }, setSubtleLightbar: function setSubtleLightbar(state) {
	      webOS.window.properties.setSubtleLightbar = state;
	      this.setWindowProperties(webOS.window.properties);
	    }, setFastAccelerometer: function setFastAccelerometer(state) {
	      webOS.window.properties.fastAccelerometer = state;
	      this.setWindowProperties(webOS.window.properties);
	    }
	  };
	})();

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smarttv-framework.js.map