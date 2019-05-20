import Device from '../device';
import Logger from '../../service/logger';
import Mux from "../../service/mux";

class DeviceVestel extends Device {

  /**
   * This is extendable class for Vestel group devices
   *
   * @class Device_Vestel
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    this.initNetworkClass();
    this.initKeyListener();
    Logger.addLog('Device_Vestel', 'info', 'Vestel Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    this.Mux = new Mux(this.Config);
    window.isDebugEnabled = this.Config.debug;

  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
   * @for Device_Vestel
   * @method createVideoElement
   * @return {Boolean} true
   */
  createVideoElement() {
    if (this.videoElement) {
      this.deleteVideoElement();
    }
    this.createOIPFDrmAgent();
    this.videoElement = document.createElement('video');
    this.videoElement.style.position = 'absolute';
    this.videoElement.setAttribute('width', this.Config.width);
    this.videoElement.setAttribute('height', this.Config.height);
    this.videoElement.setAttribute('data', '');
    this.videoElement.setAttribute('id', this.Config.videoPlayerId);
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.style.visibility = 'hidden';
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('playready', 'OIPF');
    this.registerVideoEvents();
    Logger.addLog('Device_Vestel', 'info', 'Player Element Created and Registered Video Events');;
  }
}

export default DeviceVestel;
