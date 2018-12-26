/**
 *
 */
export default class GAnalytics {
  constructor() {
    this.KEY = 'ga:user';
    this.DNT = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
    this.UID = (window.localStorage) ? (window.localStorage[this.KEY] = window.localStorage[this.KEY] || `${Math.random()}.${Math.random()}`) : '';
  }

  setAnalytics(ua, opts) {
    opts = opts || {};
    this.args = Object.assign({ tid: ua, cid: this.UID }, opts);
    this.send('pageview');
  }

  send(type, opts) {
    if (this.DNT) return;
    if (type === 'pageview' && !opts) {
      opts = { dl: location.href, dt: document.title };
    }
    const obj = Object.assign({ t: type }, this.args, opts, { z: Date.now() });
    new Image().src = this.encode(obj); // dispatch a GET
  }

  encode(obj) {
    let k, str = 'https://www.google-analytics.com/collect?v=1';
    for (k in obj) {
      if (obj[k]) {
        str += (`&${k}=${encodeURIComponent(obj[k])}`);
      }
    }
    return str;
  }
}
