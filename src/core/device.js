import Recognizer from 'smarttv-device-recognizer';
import Player from '../player/player';
import Logger from '../service/logger';
import Events from '../service/events';
import Config from '../statics/config';
import Network from '../service/network/network';
import Storage from '../service/storage';
import Keyboard from '../service/keyboard/index';


class Device {
  /**
   * Class representing Device
   *
   * @class Device
   * @constructor
   */
  constructor() {
    this.userAgent = navigator.userAgent;
    this.currentDevice = Recognizer.setCurrentDevice();
    this.Player = 'Player is ready to attach';
    this.Events = 'Events mechanism ready to start';
    this.Network = 'Network is not initialized yet';
    this.Config = Config;
    this.Storage = Storage;
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


  initNetworkClass() {
    this.Network = new Network();
  }

  initKeyListener() {
    this.Keyboard = new Keyboard(this.Events, this.currentDevice);
  }

}

export default Device;
