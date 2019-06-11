import Device from '../device';
import Logger from '../../service/logger';

class DeviceTizen extends Device {
  /**
   * This is extendable class for Samsung Tizen devices
   *
   * @class Device_Tizen
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    Logger.addLog('Device_Tizen', 'info', 'Samsung Tizen Initialized');
    this.initNetworkClass();
    this.initKeyListener();
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window.isDebugEnabled = this.Config.debug;
    this.addTizenLib();
  }

  addTizenLib() {
    const scriptfile = document.createElement('script');
    scriptfile.src = '$WEBAPIS/webapis/webapis.js';
    document.head.appendChild(scriptfile);
    Logger.addLog('Device_Tizen', 'info', 'Tizen Library loaded successfully');
  }

  createVideoElement() {
    if (this.videoElement) {
      this.deleteVideoElement();
    }
    this.videoElement = document.createElement('object');
    this.videoElement.id = this.Config.videoPlayerId;
    this.videoElement.setAttribute('type', 'application/avplayer');
    this.videoElement.setAttribute('class', 'player');
    this.videoElement.style.position = 'absolute';
    this.videoElement.style.width = this.Config.width;
    this.videoElement.style.height = this.Config.height;
    this.videoElement.style.left = '0px';
    this.videoElement.style.top = '0px';
    document.body.appendChild(this.videoElement);
    this.setPlayerInfo('PLAYREADY', 'TIZEN');
    this.videoElement.style.visibility = 'hidden';
    this.tizenRegisterEvents();
    Logger.addLog('Device_Tizen', 'info', 'Samsung Tizen Created and Registered Video Events');
    this.initAudioClass();
  }
}

export default DeviceTizen;
