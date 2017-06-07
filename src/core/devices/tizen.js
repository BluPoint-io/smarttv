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
    // this.Player.createVideoElement = this.createVideoElement;
    this.Config = Object.assign(this.Config, config);
  }
}

export default DeviceTizen;
