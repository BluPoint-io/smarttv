/**
 *
 */
class GAnalytics {
  constructor(config) {
    this.KEY = 'ga:user';
    this.DNT = navigator.doNotTrack || navigator.msDoNotTrack || window.doNotTrack;
    this.UID = (localStorage[this.KEY] = localStorage[this.KEY] || Math.random() + '.' + Math.random());
  }

  setAnalytics(ua, opts) {
    opts = opts || {};
    this.args = Object.assign({ tid:ua, cid:UID }, opts);
    this.send('pageview');
  }

  send(type, opts) {
    if (DNT) return;
    if (type === 'pageview' && !opts) {
      opts = { dl:location.href, dt:document.title };
    }
    var obj = Object.assign({ t:type }, this.args, opts, { z:Date.now() });
    new Image().src = encode(obj); // dispatch a GET
  }

  encode(obj) {
    var k, str='https://www.google-analytics.com/collect?v=1';
    for (k in obj) {
      if (obj[k]) {
        str += ('&' + k + '=' + encodeURIComponent(obj[k]));
      }
    }
    return str;
  }
}

export default GAnalytics;
