/**
 * @for Storage
 * @method isList
 * @private
 * @param val
 * @return {boolean}
 */
function isList(val) {
  return (val !== null && typeof val !== 'function' && typeof val.length === 'number');
}

/**
 * @for Storage
 * @private
 * @method pluck
 * @param obj
 * @param fn
 * @return {*}
 */
function pluck(obj, fn) {
  if (isList(obj)) {
    for (let i = 0; i < obj.length; i += 1) {
      if (fn(obj[i], i)) {
        return obj[i];
      }
    }
  } else {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        if (fn(obj[key], key)) {
          return obj[key];
        }
      }
    }
  }
}

/**
 * @for Storage
 * @private
 * @method each
 * @param obj
 * @param fn
 */
function each(obj, fn) {
  pluck(obj, (key, val) => {
    fn(key, val);
    return false;
  });
}

/**
 * @for Storage
 * @private
 * @method slice
 * @param arr
 * @param index
 * @return {*}
 */
function slice(arr, index) {
  return Array.prototype.slice.call(arr, index || 0);
}

/**
 * @for Storage
 * @private
 * @method makeAssign
 * @return {*}
 */
function makeAssign() {
  let returnValue;
  if (Object.assign) {
    returnValue = Object.assign;
  } else {
    return function shimAssign(obj, props1, props2, etc) {
      for (let i = 1; i < arguments.length; i += 1) {
        each(Object(arguments[i]), function(val, key) { //eslint-disable-line
          obj[key] = val;
        });
      }
      returnValue = obj;
    };
  }
  return returnValue;
}
const assign = makeAssign();

/**
 * @for Storage
 * @private
 * @method makeCreate
 * @return {*}
 */
function makeCreate() {
  let returnValue;
  if (Object.create) {
    returnValue = function create(obj, assignProps1, assignProps2, etc) {
      const assignArgsList = slice(arguments, 1); // eslint-disable-line prefer-rest-params
      return assign.apply(this, [Object.create(obj)].concat(assignArgsList));
    };
  } else {
    function F() { // eslint-disable-line no-inner-declarations
    }
    returnValue = function create(obj, assignProps1, assignProps2, etc) {
      const assignArgsList = slice(arguments, 1); // eslint-disable-line prefer-rest-params
      F.prototype = obj;
      return assign.apply(this, [new F()].concat(assignArgsList));
    };
  }
  return returnValue;
}

/**
 * @for Storage
 * @private
 * @method makeTrim
 * @return {*}
 */
function makeTrim() {
  let returnValue;
  if (String.prototype.trim) {
    returnValue = function trim(str) {
      return String.prototype.trim.call(str);
    };
  } else {
    returnValue = function trim(str) {
      return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
  return returnValue;
}


const create = makeCreate();
window.create = makeCreate();
const trim = makeTrim();
const Global = (typeof window !== 'undefined' ? window : global);

/**
 * @for Storage
 * @private
 * @method bind
 * @param obj
 * @param fn
 * @return {Function}
 */
function bind(obj, fn) {
  return function(...args) {
    return fn.apply(obj, Array.prototype.slice.call(args, 0));
  };
}

/**
 * @for Storage
 * @private
 * @method map
 * @param obj
 * @param fn
 * @return {*}
 */
function map(obj, fn) {
  const res = (isList(obj) ? [] : {});
  pluck(obj, (v, k) => {
    res[k] = fn(v, k);
    return false;
  });
  return res;
}

/**
 * @for Storage
 * @private
 * @method isFunction
 * @param val
 * @return {*|boolean}
 */
function isFunction(val) {
  return val && {}.toString.call(val) === '[object Function]';
}

/**
 * @for Storage
 * @private
 * @method isObject
 * @param val
 * @return {*|boolean}
 */
function isObject(val) {
  return val && {}.toString.call(val) === '[object Object]';
}

export default {
  assign,
  create,
  trim,
  bind,
  slice,
  each,
  map,
  pluck,
  isList,
  isFunction,
  isObject,
  Global
};
