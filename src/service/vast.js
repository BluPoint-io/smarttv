/**
 * Parses VMAP Ad Source
 * TODO Detailed documentation can be written
 * @param xml
 * @constructor
 */
function VMAPAdSource(xml) {
  let i;
  let len;
  let node;
  this.id = xml.getAttribute('id');
  this.allowMultipleAds = xml.getAttribute('allowMultipleAds');
  this.followRedirects = xml.getAttribute('followRedirects');
  this.vastAdData = null;
  this.adTagURI = null;
  this.customData = null;
  const ref = xml.childNodes;
  for (i = 0, len = ref.length; i < len; i += 1) {
    node = ref[i];
    switch (node.localName) {
      case 'AdTagURI':
        this.adTagURI = {
          templateType: node.getAttribute('templateType'),
          uri: (node.textContent || node.text || '').trim()
        };
        break;
      case 'VASTAdData':
        this.vastAdData = node.firstChild;
        while (this.vastAdData && this.vastAdData.nodeType !== 1) {
          this.vastAdData = this.vastAdData.nextSibling;
        }
        break;
      case 'CustomAdData':
        this.customData = node;
        break;
      default:
        break;
    }
  }
}

/**
 * Parses VMAP AdBreaks
 * TODO Detailed documentation can be written
 * @param xml
 * @constructor
 */
function VMAPAdBreak(xml) {
  let j;
  let k;
  let len;
  let len1;
  let node;
  let ref1;
  let subnode;
  const pseudoVast = {};
  this.timeOffset = xml.getAttribute('timeOffset');
  this.breakType = xml.getAttribute('breakType');
  pseudoVast.breakType = this.breakType;
  this.breakId = xml.getAttribute('breakId');
  this.repeatAfter = xml.getAttribute('repeatAfter');
  this.adSource = null;
  this.trackingEvents = [];
  const ref = xml.childNodes;
  for (j = 0, len = ref.length; j < len; j += 1) {
    node = ref[j];
    switch (node.localName) {
      case 'AdSource':
        this.adSource = new VMAPAdSource(node);
        break;
      case 'TrackingEvents':
        ref1 = node.childNodes;
        for (k = 0, len1 = ref1.length; k < len1; k += 1) {
          subnode = ref1[k];
          if (subnode.localName === 'Tracking') {
            this.trackingEvents.push({
              event: subnode.getAttribute('event'),
              uri: (subnode.textContent || subnode.text || '').trim()
            });
          }
        }
        break;
      case 'Extensions':
        if (node.childNodes[1].tagName === 'vmap:Extension') {
          this.extensions = {};
          this.extensions.type = node.childNodes[1].getAttribute('type');
          this.extensions.supress_bumper = node.childNodes[1].getAttribute('suppress_bumper') === 'true';
        } else {
          this.extensions = null;
        }
        break;
      default:
        break;
    }
  }
  if (typeof this.extensions !== 'undefined' && this.extensions.type === 'bumper') {
    pseudoVast.bumper = true;
  }
  if (this.adSource.adTagURI.templateType === 'vast3' && this.adSource.adTagURI.uri) {
    pseudoVast.url = this.adSource.adTagURI.uri;
  }
  switch (this.timeOffset) {
    case 'start': {
      pseudoVast.time = 0;
      Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
      break;
    }
    case 'end': {
      pseudoVast.time = 'end';
      Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
      break;
    }
    default: {
      const arrTime = this.timeOffset.split(':');
      let msTime = 0;
      msTime = (arrTime[0] * 60 * 60) + (arrTime[1] * 60) + Math.floor(arrTime[2]);
      pseudoVast.time = msTime;
      Vast.vastArray.push(pseudoVast); // eslint-disable-line no-use-before-define
      break;
    }
  }
}

/**
 * TODO Detailed documentation can be written
 * @param event
 * @param errorCode
 * @return {Array}
 */
VMAPAdBreak.prototype.track = function(event, errorCode) {
  let j;
  let len;
  let tracker;
  let uri;
  const ref = this.trackingEvents;
  const results = [];
  for (j = 0, len = ref.length; j < len; j += 1) {
    tracker = ref[j];
    if (tracker.event !== event) {
      continue;
    }
    uri = tracker.uri;
    if (tracker.event === 'error') {
      uri = uri.replace('[ERRORCODE]', errorCode);
    }
    results.push(this.tracker(uri));
  }
  return results;
};

/**
 * TODO Detailed documentation can be written
 * @param uri
 * @return {*}
 */
VMAPAdBreak.prototype.tracker = function(uri) {
  let i;
  if (typeof window !== 'undefined' && window !== null) {
    i = new Image();
    i.src = uri;
    return uri;
  }
};

/**
 *
 * @type {{parseVMAP: ((xml, Events)), parsedVMAP: {}, vastArray: Array}}
 */
const Vast = {
  parseVMAP(xml, Events) {
    let i;
    let len;
    let node;
    if (!(((xml != null ? xml.documentElement : undefined) != null) && xml.documentElement.localName === 'VMAP')) {
      throw new Error('Not a VMAP document');
    }
    this.parsedVMAP.version = xml.documentElement.getAttribute('version');
    this.parsedVMAP.adBreaks = [];
    this.parsedVMAP.extensions = [];
    const ref = xml.documentElement.childNodes;
    for (i = 0, len = ref.length; i < len; i += 1) {
      node = ref[i];
      switch (node.localName) {
        case 'AdBreak':
          this.parsedVMAP.adBreaks.push(new VMAPAdBreak(node));
          break;
        case 'Extensions':
          this.parsedVMAP.extensions = node.childNodes;
          break;
        default:
          break;
      }
    }
    Events.triggerEvent('vmapLoaded', [this.vastArray]);
    return this.parsedVMAP;
  },
  parsedVMAP: {},
  vastArray: []
};

export default Vast;
