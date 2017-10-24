import CoreDevice from './core/device';

// import Storage from './service/storage';

if (typeof Object.assign !== 'function') {
  Object.assign = function(target, varArgs) { // .length of function is 2
    if (target == null) { // TypeError if undefined or null
      throw new TypeError('Cannot convert undefined or null to object');
    }

    const to = Object(target);

    for (let index = 1; index < arguments.length; index += 1) {
      const nextSource = arguments[index]; // eslint-disable-line prefer-rest-params

      if (nextSource != null) { // Skip over if undefined or null
        for (const nextKey in nextSource) {
          // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

Math.trunc = Math.trunc || function(x) {
    const n = x - x%1;
    return n===0 && (x<0 || (x===0 && (1/x !== 1/0))) ? -0 : n;
  };

const device = new CoreDevice();
const currentDeviceName = device.currentDevice.brandName;
const currentDevice = require(`./core/devices/${currentDeviceName}`);

window.DOGANTV = currentDevice;

export { currentDevice as Device }; // eslint-disable-line
