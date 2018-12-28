import Device from '../device';
import Logger from '../../service/logger';

class DeviceSeraphic extends Device {

  /**
   * This is extendable class for LG WebOs devices
   *
   * @class Device_Seraphic
   * @extends Device
   * @constructor
   */
  constructor(config) {
    super();
    this.initEvents();
    this.initPlayerClass();
    this.initNetworkClass();
    this.initKeyListener();
    Logger.addLog('Device_Seraphic', 'info', 'Seraphic Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window['isDebugEnabled'] = this.Config.debug;
  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
   * @for Device_Seraphic
   * @method createVideoElement
   * @return {Boolean} true
   */
  createVideoElement() {
    if (this.objectPlayer) {
      this.deleteVideoElement();
    }
    this.createOIPFDrmAgent();
    this.setPlayerInfo('PLAYREADY', 'OIPF');
    this.initAudioClass();
    this.createObjectPlayer('sraf_av');
    Logger.addLog('Player', 'info', 'Seraphic Player Element Created and Registered Video Events');
    return null;
  }
}

export default DeviceSeraphic;
