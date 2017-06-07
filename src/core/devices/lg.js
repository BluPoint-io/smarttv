import Device from '../device';
import Logger from '../../service/logger';

class DeviceLG extends Device {
  /**
   * This is extendable class for LG NetCast devices
   *
   * @class Device_LG
   * @extends Device
   * @constructor
   */
  constructor() {
    super();
    Logger.addLog('Device_LG', 'info', 'LG NetCast device is in progress');
  }
}

export default DeviceLG;
