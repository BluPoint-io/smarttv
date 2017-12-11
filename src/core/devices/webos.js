import Device from '../device';
import Logger from '../../service/logger';
// const WebOsLibrary = require('../../helpers/WebOS.js');

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
    Logger.addLog('Device_WebOS', 'info', 'Arcelik Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    this.addWebOSLib();
  }

  /**
   * WebOs native api's are required to use webos.js file.
   * This method provides necessary libraries.
   *
   * @for Device_WebOs
   * @method addWebOsLib
   * @return {Boolean} true
   */
  addWebOSLib() {
/*    this.webOSLibrary = document.createElement('script');
    this.webOSLibrary.setAttribute('type', 'text/javascript');
    this.webOSLibrary.setAttribute('src', 'lib/webOS.js');
    document.body.appendChild(this.webOSLibrary);*/
    // this.WebOsLibrary = WebOsLibrary;
    Logger.addLog('Device_WebOs', 'info', 'WebOs Library loaded successfully', this.WebOsLibrary);
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
  createVideoElement() {
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
    Logger.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
    this.initAudioClass();
    return null;
  }
}

export default DeviceWebOs;
