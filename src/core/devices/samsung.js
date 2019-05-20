import Device from '../device';
import Logger from '../../service/logger';
import Mux from '../../service/mux';

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
    this.Mux = new Mux(this.Config);
    Logger.addLog('Device_Samsung', 'info', 'Samsung device is in progress');

  }
}

export default DeviceSamsung;
