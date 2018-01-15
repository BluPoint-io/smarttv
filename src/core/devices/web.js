import Device from '../device';
import Logger from '../../service/logger';

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
    Logger.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window['isDebugEnabled'] = this.Config.debug;
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
    this.videoElement.setAttribute('id', this.Config.videoPlayerId);
    this.videoElement.setAttribute('data', '');
    this.videoElement.setAttribute('class', 'player');
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo();
    this.registerVideoEvents();
    Logger.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
    this.initAudioClass();
    return null;
  }
}

export default DeviceWeb;
