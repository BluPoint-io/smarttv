/**
 *
 */
import mux from 'mux-embed';

export default class Mux {
  constructor(configClass) {
    this.Config = configClass;
    this.mux = this.Config.mux || null;
    this.setMux();
  }

  setMux() {
    if (!this.mux.active) return;
    mux.init(this.Config.mux.playerId, this.Config.mux.options);
  }

  send(type, data = null) {
    if (!this.mux.active) return;
    window.mux.emit(this.mux.playerId, type, data);
  }
}
