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
	
	Math.trunc = Math.trunc || function (x) {
	  var n = x - x % 1;
	  return n === 0 && (x < 0 || x === 0 && 1 / x !== 1 / 0) ? -0 : n;
	};
	
	var device = new _device2.default();
	var currentDeviceName = device.currentDevice.brandName;
	var currentDevice = __webpack_require__(39)("./" + currentDeviceName);
	
	window.___SMARTTV_FRAMEWORK = {
	  Device: currentDevice
	};
	
	exports.Device = currentDevice; // eslint-disable-line

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _smarttvDeviceRecognizer = __webpack_require__(2);
	
	var _smarttvDeviceRecognizer2 = _interopRequireDefault(_smarttvDeviceRecognizer);
	
	var _player = __webpack_require__(3);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _logger = __webpack_require__(5);
	
	var _logger2 = _interopRequireDefault(_logger);
	
	var _events = __webpack_require__(7);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _config = __webpack_require__(8);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _network = __webpack_require__(9);
	
	var _network2 = _interopRequireDefault(_network);
	
	var _storage = __webpack_require__(37);
	
	var _storage2 = _interopRequireDefault(_storage);
	
	var _index = __webpack_require__(38);
	
	var _index2 = _interopRequireDefault(_index);
	
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
	    this.currentDevice = _smarttvDeviceRecognizer2.default.setCurrentDevice();
	    this.Player = 'Player is ready to attach';
	    this.Events = 'Events mechanism ready to start';
	    this.Network = 'Network is not initialized yet';
	    this.Config = _config2.default;
	    this.Storage = _storage2.default;
	  }
	
	  /**
	   * Events are based on class. So it have to be constructed.
	   *
	   * @method initEvents
	   * @for Device
	   * @return {Object} It returns Events class
	   */
	
	
	  _createClass(Device, [{
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
	  }, {
	    key: 'initNetworkClass',
	    value: function initNetworkClass() {
	      this.Network = new _network2.default();
	    }
	  }, {
	    key: 'initKeyListener',
	    value: function initKeyListener() {
	      this.Keyboard = new _index2.default(this.Events, this.currentDevice);
	    }
	  }]);
	
	  return Device;
	}();
	
	exports.default = Device;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define("smarttv-device-recognizer", [], factory);
		else if(typeof exports === 'object')
			exports["smarttv-device-recognizer"] = factory();
		else
			root["smarttv-device-recognizer"] = factory();
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
		
		var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
		
		var _platforms = __webpack_require__(1);
		
		var _platforms2 = _interopRequireDefault(_platforms);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		var Recognizer = function () {
		  function Recognizer() {
		    _classCallCheck(this, Recognizer);
		  }
		
		  _createClass(Recognizer, null, [{
		    key: 'setCurrentDevice',
		    value: function setCurrentDevice() {
		      var userAgent = navigator.userAgent;
		      var currentDevice = {
		        agentIndex: 'browserDefault',
		        brandName: 'web',
		        modelYear: '2017',
		        displayName: 'Default Browser'
		      };
		      for (var platform = 0; platform < _platforms2.default.length; platform += 1) {
		        if (userAgent.indexOf(_platforms2.default[platform].agentIndex) >= 0) {
		          currentDevice = _platforms2.default[platform];
		          break;
		        }
		      }
		      return currentDevice;
		    }
		  }, {
		    key: 'getKeyCodes',
		    value: function getKeyCodes(brandName) {
		      return __webpack_require__(2)("./" + brandName);
		    }
		  }]);
		
		  return Recognizer;
		}();
		
		exports.default = Recognizer;
		module.exports = exports['default'];
	
	/***/ },
	/* 1 */
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
		}, {
		  agentIndex: 'VESTEL',
		  brandName: 'vestel',
		  modelYear: 'undefined',
		  displayName: 'Vestel SmartTV'
		}, {
		  agentIndex: 'VSTVB',
		  brandName: 'vestel',
		  modelYear: 'undefined',
		  displayName: 'Vestel SmartTV'
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
		},
		/*  {
		   agentIndex: 'SmartTvA\/',
		   brandName: 'alliance',
		   modelYear: 'generic',
		   displayName: 'Alliance SmartTV | Generic'
		 },
		 {
		   agentIndex: 'ToshibaTP\/',
		   brandName: 'alliance',
		   modelYear: 'toshiba',
		   displayName: 'Alliance SmartTV | Toshiba'
		 },*/
		{
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
	/* 2 */
	/***/ function(module, exports, __webpack_require__) {
	
		var map = {
			"./web": 3,
			"./web.js": 3,
			"./webos": 4,
			"./webos.js": 4
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
		webpackContext.id = 2;
	
	
	/***/ },
	/* 3 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = {
		  RIGHT: 39,
		  LEFT: 37,
		  UP: 38,
		  DOWN: 40,
		  RETURN: 8,
		  ENTER: 13,
		  PLAY: 415,
		  PAUSE: 19,
		  STOP: 413,
		  FF: 417,
		  RW: 412,
		  RED: 403,
		  GREEN: 404,
		  YELLOW: 405,
		  BLUE: 406,
		  ZERO: 96,
		  ONE: 97,
		  TWO: 98,
		  THREE: 99,
		  FOUR: 100,
		  FIVE: 101,
		  SIX: 102,
		  SEVEN: 103,
		  EIGHT: 104,
		  NINE: 105,
		  PUP: 33,
		  PDOWN: 34,
		  PRECH: 46, // Delete
		  TXTMIX: 110 // ,Del
		};
		module.exports = exports["default"];
	
	/***/ },
	/* 4 */
	/***/ function(module, exports) {
	
		"use strict";
		
		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		exports.default = {
		  RIGHT: 39, //0x27	*
		  LEFT: 37, //0x25	*
		  UP: 38, //0x26	*
		  DOWN: 40, //0x28	*
		  RETURN: 461, //		*
		  ENTER: 13, //		*
		  PLAY: 415, //0x19F	*
		  PAUSE: 19, //0x13	*
		  STOP: 413, //0x19D	*
		  FF: 417, //0x1A1	*
		  RW: 412, //0x19C	*
		  RED: 403, //0x193	*
		  GREEN: 404, //0x194	*
		  YELLOW: 405, //0x195	*
		  BLUE: 406, //0x196	*
		  ZERO: 48, //		*
		  ONE: 49, //		*
		  TWO: 50, //		*
		  THREE: 51, //		*
		  FOUR: 52, //		*
		  FIVE: 53, //		*
		  SIX: 54, //		*
		  SEVEN: 55, //		*
		  EIGHT: 56, //		*
		  NINE: 57, //		*
		
		  NUMERIC_ZERO: 96, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_ONE: 97, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_TWO: 98, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_THREE: 99, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_FOUR: 100, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_FIVE: 101, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_SIX: 102, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_SEVEN: 103, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_EIGHT: 104, // keyCode of numeric keys on External USB keyboard
		  NUMERIC_NINE: 105, // keyCode of numeric keys on External USB keyboard
		
		  PUP: 33, //		*
		  PDOWN: 34, //		*
		  PRECH: 46, // Delete
		  TXTMIX: 110, // Del
		  INFO: 457, //
		  CHLIST: -1, //
		  FAVCH: -1, //
		  EXIT: -1, //
		  TOOLS: -1 //
		};
		module.exports = exports["default"];
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=smarttv-device-recognizer.min.js.map

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
	      this.autoLoop = false;
	      // this.Events.removeAllListeners();
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
	     * Stop trigger for videoElement
	     * it removes video element from dom
	     *
	     * @for Player
	     * @method stop
	     */
	
	  }, {
	    key: 'stop',
	    value: function stop() {
	      // this.videoElement.remove();
	      this.Events.removeAllListeners();
	      this.addVideoSource('');
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
	     * Play trigger for a video element with endless autoloop
	     * you can use this feature to enable silent background videos
	     *
	     * @for Player
	     * @method playWithLoop
	     */
	
	  }, {
	    key: 'playWithLoop',
	    value: function playWithLoop() {
	      if (this.videoElement) {
	        this.autoLoop = true;
	        this.play();
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
	      var _this2 = this;
	
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
	        _this.Events.triggerEvent('player_onDurationChange', [Math.trunc(_this.videoElement.duration)]);
	        _this.playerInfo.duration = _this.videoElement.duration;
	      };
	
	      this.videoElement.onended = function () {
	        _this.playerInfo.currentState = 'Finished';
	        _this.Events.triggerEvent('player_onEnded', ['Video Finished']);
	        if (_this2.autoLoop) {
	          _this2.playWithLoop();
	        }
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
	        _this.Events.triggerEvent('player_onTimeUpdate', [Math.trunc(_this.videoElement.currentTime)]);
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
	  width: '100%',
	  height: '100%',
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

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _axios = __webpack_require__(10);
	
	var _axios2 = _interopRequireDefault(_axios);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Network = function () {
	  function Network() {
	    _classCallCheck(this, Network);
	
	    this.isOnline = navigator.onLine;
	    this.setNetworkListener();
	    this.request = _axios2.default;
	    this.axios = this.request;
	  }
	
	  _createClass(Network, [{
	    key: 'setNetworkListener',
	    value: function setNetworkListener() {
	      window.addEventListener('online', this.updateNetworkStatus.bind(this));
	      window.addEventListener('offline', this.updateNetworkStatus.bind(this));
	    }
	  }, {
	    key: 'updateNetworkStatus',
	    value: function updateNetworkStatus() {
	      this.isOnline = navigator.onLine;
	    }
	  }]);
	
	  return Network;
	}();
	
	exports.default = Network;
	module.exports = exports['default'];

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(11);

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	var bind = __webpack_require__(13);
	var Axios = __webpack_require__(15);
	var defaults = __webpack_require__(16);
	
	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios(defaultConfig);
	  var instance = bind(Axios.prototype.request, context);
	
	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios.prototype, context);
	
	  // Copy context to instance
	  utils.extend(instance, context);
	
	  return instance;
	}
	
	// Create the default instance to be exported
	var axios = createInstance(defaults);
	
	// Expose Axios class to allow class inheritance
	axios.Axios = Axios;
	
	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults, instanceConfig));
	};
	
	// Expose Cancel & CancelToken
	axios.Cancel = __webpack_require__(34);
	axios.CancelToken = __webpack_require__(35);
	axios.isCancel = __webpack_require__(31);
	
	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = __webpack_require__(36);
	
	module.exports = axios;
	
	// Allow use of default import syntax in TypeScript
	module.exports.default = axios;


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var bind = __webpack_require__(13);
	var isBuffer = __webpack_require__(14);
	
	/*global toString:true*/
	
	// utils is a library of generic helper functions non-specific to axios
	
	var toString = Object.prototype.toString;
	
	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray(val) {
	  return toString.call(val) === '[object Array]';
	}
	
	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString.call(val) === '[object ArrayBuffer]';
	}
	
	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}
	
	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}
	
	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}
	
	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}
	
	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}
	
	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject(val) {
	  return val !== null && typeof val === 'object';
	}
	
	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString.call(val) === '[object Date]';
	}
	
	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString.call(val) === '[object File]';
	}
	
	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString.call(val) === '[object Blob]';
	}
	
	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString.call(val) === '[object Function]';
	}
	
	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject(val) && isFunction(val.pipe);
	}
	
	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}
	
	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}
	
	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}
	
	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }
	
	  // Force an array if not already something iterable
	  if (typeof obj !== 'object' && !isArray(obj)) {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }
	
	  if (isArray(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}
	
	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }
	
	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}
	
	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}
	
	module.exports = {
	  isArray: isArray,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	
	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	module.exports = function (obj) {
	  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	}
	
	function isBuffer (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}
	
	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var defaults = __webpack_require__(16);
	var utils = __webpack_require__(12);
	var InterceptorManager = __webpack_require__(28);
	var dispatchRequest = __webpack_require__(29);
	
	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager(),
	    response: new InterceptorManager()
	  };
	}
	
	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }
	
	  config = utils.merge(defaults, this.defaults, { method: 'get' }, config);
	  config.method = config.method.toLowerCase();
	
	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);
	
	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });
	
	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }
	
	  return promise;
	};
	
	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});
	
	module.exports = Axios;


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(12);
	var normalizeHeaderName = __webpack_require__(18);
	
	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};
	
	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}
	
	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = __webpack_require__(19);
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = __webpack_require__(19);
	  }
	  return adapter;
	}
	
	var defaults = {
	  adapter: getDefaultAdapter(),
	
	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],
	
	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],
	
	  timeout: 0,
	
	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',
	
	  maxContentLength: -1,
	
	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};
	
	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};
	
	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});
	
	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});
	
	module.exports = defaults;
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 17 */
/***/ function(module, exports) {

	// shim for using process in browser
	var process = module.exports = {};
	
	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.
	
	var cachedSetTimeout;
	var cachedClearTimeout;
	
	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ())
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	
	
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	
	
	
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;
	
	process.listeners = function (name) { return [] }
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';
	
	var utils = __webpack_require__(12);
	var settle = __webpack_require__(20);
	var buildURL = __webpack_require__(23);
	var parseHeaders = __webpack_require__(24);
	var isURLSameOrigin = __webpack_require__(25);
	var createError = __webpack_require__(21);
	var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(26);
	
	module.exports = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;
	
	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }
	
	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;
	
	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (!window.XMLHttpRequest &&
	        process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }
	
	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
	    }
	
	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);
	
	    // Set the request timeout in MS
	    request.timeout = config.timeout;
	
	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }
	
	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }
	
	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };
	
	      settle(resolve, reject, response);
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));
	
	      // Clean up request
	      request = null;
	    };
	
	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies = __webpack_require__(27);
	
	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies.read(config.xsrfCookieName) :
	          undefined;
	
	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }
	
	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }
	
	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }
	
	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }
	
	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }
	
	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }
	
	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }
	
	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }
	
	    if (requestData === undefined) {
	      requestData = null;
	    }
	
	    // Send the request
	    request.send(requestData);
	  });
	};
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var createError = __webpack_require__(21);
	
	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	module.exports = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var enhanceError = __webpack_require__(22);
	
	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	module.exports = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};


/***/ },
/* 22 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	module.exports = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	function encode(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}
	
	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	module.exports = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }
	
	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];
	
	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }
	
	      if (utils.isArray(val)) {
	        key = key + '[]';
	      }
	
	      if (!utils.isArray(val)) {
	        val = [val];
	      }
	
	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode(key) + '=' + encode(v));
	      });
	    });
	
	    serializedParams = parts.join('&');
	  }
	
	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }
	
	  return url;
	};


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];
	
	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	module.exports = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;
	
	  if (!headers) { return parsed; }
	
	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));
	
	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });
	
	  return parsed;
	};


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;
	
	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;
	
	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }
	
	      urlParsingNode.setAttribute('href', href);
	
	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }
	
	    originURL = resolveURL(window.location.href);
	
	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :
	
	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js
	
	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
	
	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';
	
	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}
	
	module.exports = btoa;


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	module.exports = (
	  utils.isStandardBrowserEnv() ?
	
	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));
	
	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }
	
	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }
	
	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }
	
	        if (secure === true) {
	          cookie.push('secure');
	        }
	
	        document.cookie = cookie.join('; ');
	      },
	
	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },
	
	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :
	
	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	function InterceptorManager() {
	  this.handlers = [];
	}
	
	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};
	
	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};
	
	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};
	
	module.exports = InterceptorManager;


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	var transformData = __webpack_require__(30);
	var isCancel = __webpack_require__(31);
	var defaults = __webpack_require__(16);
	var isAbsoluteURL = __webpack_require__(32);
	var combineURLs = __webpack_require__(33);
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}
	
	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	module.exports = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);
	
	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }
	
	  // Ensure headers exist
	  config.headers = config.headers || {};
	
	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );
	
	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );
	
	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );
	
	  var adapter = config.adapter || defaults.adapter;
	
	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);
	
	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );
	
	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);
	
	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }
	
	    return Promise.reject(reason);
	  });
	};


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var utils = __webpack_require__(12);
	
	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	module.exports = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });
	
	  return data;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};


/***/ },
/* 32 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	module.exports = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};


/***/ },
/* 33 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	module.exports = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};


/***/ },
/* 34 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}
	
	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};
	
	Cancel.prototype.__CANCEL__ = true;
	
	module.exports = Cancel;


/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Cancel = __webpack_require__(34);
	
	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }
	
	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });
	
	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }
	
	    token.reason = new Cancel(message);
	    resolvePromise(token.reason);
	  });
	}
	
	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};
	
	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};
	
	module.exports = CancelToken;


/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	module.exports = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};


/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Storage = function () {
	  function Storage() {
	    _classCallCheck(this, Storage);
	  }
	
	  _createClass(Storage, null, [{
	    key: 'set',
	
	
	    /**
	     * Set value to the storage
	     *
	     * @param {String} name
	     * @param {Object/String/Number} value
	     * @returns {Boolean}
	     */
	    value: function set(name, value) {
	      if (window.localStorage) {
	        return window.localStorage.setItem(name, JSON.stringify(value));
	      }
	    }
	
	    /**
	     * Get value from the storage
	     *
	     * @param {String} name
	     * @returns {Object/String/Number} Retrurns FALSE
	     */
	
	  }, {
	    key: 'get',
	    value: function get(name) {
	      var value = void 0;
	
	      if (window.localStorage) {
	        value = window.localStorage.getItem(name);
	        if (typeof value !== 'undefined') {
	          try {
	            return JSON.parse(value);
	          } catch (e) {
	            return value;
	          }
	        }
	      }
	      return false;
	    }
	
	    /**
	     * Clear all stored data
	     *
	     * @returns {Boolean}
	     */
	
	  }, {
	    key: 'clear',
	    value: function clear() {
	      if (window.localStorage) {
	        return window.localStorage.clear();
	      }
	
	      return false;
	    }
	  }]);
	
	  return Storage;
	}();
	
	exports.default = Storage;
	module.exports = exports['default'];

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _smarttvDeviceRecognizer = __webpack_require__(2);
	
	var _smarttvDeviceRecognizer2 = _interopRequireDefault(_smarttvDeviceRecognizer);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Keyboard = function () {
	  function Keyboard(Events, currentDevice) {
	    _classCallCheck(this, Keyboard);
	
	    this.Events = Events;
	    this.currentDevice = currentDevice;
	    this.keyList = _smarttvDeviceRecognizer2.default.getKeyCodes(currentDevice.brandName);
	    this.attachKeyListeners();
	  }
	
	  _createClass(Keyboard, [{
	    key: 'attachKeyListeners',
	    value: function attachKeyListeners() {
	      var _this = this;
	
	      window.addEventListener('keydown', function (e) {
	        e.preventDefault();
	        switch (e.keyCode) {
	          case _this.keyList.LEFT:
	            _this.Events.triggerEvent('keyDown', ['LEFT']);
	            break;
	          case _this.keyList.UP:
	            _this.Events.triggerEvent('keyDown', ['UP']);
	            break;
	          case _this.keyList.DOWN:
	            _this.Events.triggerEvent('keyDown', ['DOWN']);
	            break;
	          case _this.keyList.RIGHT:
	            _this.Events.triggerEvent('keyDown', ['RIGHT']);
	            break;
	          case _this.keyList.ENTER:
	            _this.Events.triggerEvent('keyDown', ['ENTER']);
	            break;
	          default:
	            _this.Events.triggerEvent('keyDown', [e.keyCode]);
	            break;
	        }
	      });
	    }
	  }]);
	
	  return Keyboard;
	}();
	
	exports.default = Keyboard;
	module.exports = exports['default'];

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var map = {
		"./arcelik": 40,
		"./arcelik.js": 40,
		"./lg": 41,
		"./lg.js": 41,
		"./philips": 42,
		"./philips.js": 42,
		"./samsung": 43,
		"./samsung.js": 43,
		"./tizen": 44,
		"./tizen.js": 44,
		"./vestel": 45,
		"./vestel.js": 45,
		"./web": 46,
		"./web.js": 46,
		"./webos": 47,
		"./webos.js": 47
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
	webpackContext.id = 39;


/***/ },
/* 40 */
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
	    _this.initNetworkClass();
	    _this.initKeyListener();
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
/* 41 */
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
/* 42 */
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
/* 43 */
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
/* 44 */
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
/* 45 */
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
	    _this.initNetworkClass();
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
/* 46 */
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
	    _this.initNetworkClass();
	    _this.initKeyListener();
	    _logger2.default.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
	    _this.Player.createVideoElement = _this.createVideoElement;
	    _this.Config = Object.assign(_this.Config, config); // Merges default config with user config
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
/* 47 */
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
	
	// const WebOsLibrary = require('../../helpers/WebOS.js');
	
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
	    _this.initNetworkClass();
	    _this.initKeyListener();
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
	      // this.WebOsLibrary = WebOsLibrary;
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

/***/ }
/******/ ])
});
;
//# sourceMappingURL=smarttv-framework.js.map