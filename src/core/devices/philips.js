import Device from '../device';
import Logger from '../../service/logger';

class DevicePhilips extends Device {
  /**
   * This is extendable class for Philips devices
   *
   * @class Device_Philips
   * @extends Device
   * @constructor
   */
  constructor() {
    super();
    this.initEvents();
    this.initPlayerClass();
    this.initNetworkClass();
    this.initKeyListener();
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window['isDebugEnabled'] = this.Config.debug;
    Logger.addLog('Device_Philips', 'info', 'Philips device is in progress');

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

export default DevicePhilips;
