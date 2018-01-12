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
    Logger.addLog('Device_Philips', 'info', 'Philips device is in progress');

  }
}

export default DevicePhilips;
