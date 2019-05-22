/**
 *
 */
import mux from 'mux-embed';

class Mux {
  constructor(configClass) {
    this.Config = configClass;
    this.mux = this.Config.mux || null;
  }

  setMux(options) {
    if (!this.mux) return;
    window.mux = mux;
    window.mux.init(this.Config.mux.playerId, options);
  }

  send(type, data = null) {
    if (!this.mux) return;
    window.mux.emit(this.mux.playerId, type, data);
  }
}

export default Mux;
