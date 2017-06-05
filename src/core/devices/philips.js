import Device from '../device';
import Logger from '../../service/logger';

/**
 * Device class for Philips devices
 *
 * @extends Device
 */
class DevicePhilips extends Device {
  constructor() {
    super();
    Logger.addLog('Device_Philips', 'info', 'Philips device is in progress');
  }
}

export default DevicePhilips;
