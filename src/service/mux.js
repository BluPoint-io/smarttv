/**
 *
 */
import mux from 'mux-embed';

export default class Mux {
  init(configClass) {
    this.Config = configClass;
    this.mux = this.Config.mux || null;
  }

  static setMux(options) {
    if (!this.mux) return;
    window.mux = mux;
    window.mux.init(this.Config.mux.playerId, options);
  }

  static send(type, data = null) {
    if (!this.mux) return;
    window.mux.emit(this.mux.playerId, type, data);
  }
}
