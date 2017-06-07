import Device from '../device';
import Logger from '../../service/logger';

class DeviceArcelik extends Device {
  /**
   * This is extendable class for Arcelik group devices (includes Beko, Grundig etc)
   *
   * @class Device_Arcelik
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    Logger.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
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
    this.videoElement.setAttribute('id', 'dtv-video');
    this.videoElement.setAttribute('data', '');
    this.videoElement.setAttribute('class', 'player');
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('OIPF');
    this.registerVideoEvents();
    Logger.addLog('Player', 'info', 'Player Element Created and Registered Video Events');
    this.initAudioClass();
    return null;
  }

}

export default DeviceArcelik;

