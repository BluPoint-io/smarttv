import platforms from '../statics/platforms';
import Player from '../player/player';
import Logger from '../service/logger';
import Events from '../service/events';
import Config from '../statics/config';

class Device {
  /**
   * Class representing Device
   *
   * @class Device
   * @constructor
   */
  constructor() {
    this.userAgent = navigator.userAgent;
    this.currentDevice = {
      agentIndex: 'browserDefault',
      brandName: 'web',
      modelYear: '2016',
      displayName: 'Apple Macbook Pro 17'
    };
    this.setCurrentDevice(platforms);
    this.Player = 'Player is ready to attach';
    this.Events = 'Events mechanism ready to start';
    this.Config = Config;
  }

  /**
   * Sets currentDevice which needs to identicate which platform we are running on it
   * Uses browser User Agent to identicate device. Platforms list have to be updated. (PR Welcomed)
   * This function have to be worked before all operations.
   * Because other classes and objects are includes device specific blocks
   *
   * @method setCurrentDevice
   * @for Device
   * @param {Array} [platforms] Platforms list to compare userAgent.
   * @return {Object} It returns currentDevice and sets it to Device class
   */

  setCurrentDevice(platforms) {
    for (let platform = 0; platform < platforms.length; platform += 1) {
      if (this.userAgent.indexOf(platforms[platform].agentIndex) >= 0) {
        this.currentDevice = platforms[platform];
        break;
      }
    }
    return this.currentDevice;
  }

  /**
   * Events are based on class. So it have to be constructed.
   *
   * @method initEvents
   * @for Device
   * @return {Object} It returns Events class
   */
  initEvents() {
    Logger.addLog('Device', 'progress', 'Events Class Initialization Started');
    this.Events = new Events(Logger);
    return this.Events;
  }

  /**
   * This function stands for initializing Player class
   * It uses currentDevice and config info (extended during device extending)
   * It pass Events to Player class to use same initialized class
   *
   * @method initPlayerClass
   * @for Device
   * @return {Object} It returns Events class
   */
  initPlayerClass() {
    Logger.addLog('Device', 'progress', 'Player Class Initialization Started');
    this.Player = new Player(this.currentDevice, this.Events, this.Config);
    return this.Player;
  }

}

export default Device;
