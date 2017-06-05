import Device from '../device';
import Logger from '../../service/logger';

/**
 * Device class for LG NetCast Devices
 *
 * @extends Device
 */
class DeviceLG extends Device {
  constructor() {
    super();
    Logger.addLog('Device_LG', 'info', 'LG NetCast device is in progress');
  }
}

export default DeviceLG;
