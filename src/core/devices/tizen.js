import Device from '../device';
import Logger from '../../service/logger';

/**
 * Device class for Samsung Tizen devices
 *
 * @extends Device
 */
class DeviceTizen extends Device {
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
