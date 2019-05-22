import Device from '../device';
import Logger from '../../service/logger';
import Mux from '../../service/mux';

class DeviceWeb extends Device {
  /**
   * This is extendable class for Web Development Environment
   *
   * @class Device_Web
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    this.initNetworkClass();
    this.initKeyListener();
    this.initMux();
    Logger.addLog('Device_Web', 'info', 'Web Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window.isDebugEnabled = this.Config.debug;
  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
   * @for Device_Web
   * @method createVideoElement
   * @return {Boolean} true
   */
  createVideoElement() {
    this.videoElement = document.createElement('video');
    this.videoElement.style.position = 'absolute';
    this.videoElement.setAttribute('width', this.Config.width);
    this.videoElement.setAttribute('height', this.Config.height);
    this.videoElement.setAttribute('data', '');
    this.videoElement.setAttribute('id', this.Config.videoPlayerId);
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.style.visibility = 'hidden';
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('NULL', 'WEB');
    this.registerVideoEvents();
    Logger.addLog('Device_Web', 'info', 'Player Element Created and Registered Video Events');
    this.initAudioClass();
  }
}

export default DeviceWeb;
