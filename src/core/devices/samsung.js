import Device from '../device';
import Logger from '../../service/logger';

class DeviceSamsung extends Device {

  /**
   * This is extendable class for Samsung Orsay devices
   *
   * @class Device_Samsung
   * @extends Device
   * @constructor
   */
  constructor() {
    super();
    Logger.addLog('Device_Samsung', 'info', 'Samsung device is in progress');
  }
}

export default DeviceSamsung;
