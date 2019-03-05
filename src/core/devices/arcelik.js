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
    this.initNetworkClass();
    this.initKeyListener();
    Logger.addLog('Device_Arcelik', 'info', 'Arcelik Device Initialized');
    this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config); // Merges default config with user config
    window.isDebugEnabled = this.Config.debug;
  }

  /**
   * Abstract Player createVideoElement function.
   *
   * @abstract
   * @for Device_Arcelik
   * @method createVideoElement
   * @return {Boolean} true
   */
  createVideoElement() {
    if (this.objectPlayer) {
      this.deleteVideoElement();
    }
    this.createOIPFDrmAgent();
    this.setPlayerInfo('playready', 'OIPF');
    Logger.addLog('Device_Arcelik', 'info', 'Arcelik Player Element Created and Registered Video Events');
    this.initAudioClass();
    if (!this.arcelikAudio) {
      this.arcelikAudio = document.createElement('audio');
      this.arcelikAudio.setAttribute('class', 'player-audio');
      this.arcelikAudio.style.position = 'absolute';
      document.body.appendChild(this.arcelikAudio);
      Logger.addLog('Device_Arcelik', 'info', 'Arcelik Audio Player Created');
    }
    this.createObjectPlayer('arcelikPlayer');
    if (window.arSmartTV) {
      window.arSmartTV.init(
        () => {
          Logger.addLog('Device_Arcelik', 'info', 'sdk initialized');
        },
        () => {
          Logger.addLog('Device_Arcelik', 'info', 'sdk not initialized');
        }
      );
    } else {
      Logger.addLog('Device_Arcelik', 'warn', 'sdk not found');
    }
  }

}

export default DeviceArcelik;

