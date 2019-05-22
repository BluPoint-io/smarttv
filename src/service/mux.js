/**
 *
 */
import mux from 'mux-embed';

export default class Mux {
  constructor(configClass) {
    this.Config = configClass;
    this.mux = this.Config.mux || {};
  }

  static setMux(options) {
    // if (!this.mux.active) return;
    // window.mux = mux;
    // window.mux.init(this.Config.mux.playerId, options);
  }

  static send(type, data = null) {
    // if (!this.mux.active) return;
    // window.mux.emit(this.mux.playerId, type, data);
  }
}
