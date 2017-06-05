import Device from '../device';
import Logger from '../../service/logger';

/**
 * Device class for Samsung Orsay devices
 *
 * @extends Device
 */
class DeviceSamsung extends Device {
  constructor() {
    super();
    Logger.addLog('Device_Samsung', 'info', 'Samsung device is in progress');
  }
}

export default DeviceSamsung;
