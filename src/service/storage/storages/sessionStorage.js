import util from '../engine/util';
const Global = util.Global;
/**
 *
 * @return {Storage}
 */
function sessionStorage() {
  return Global.sessionStorage;
}

/**
 *
 * @param key
 */
function read(key) {
  return sessionStorage().getItem(key);
}

/**
 *
 * @param key
 * @param data
 */
function write(key, data) {
  return sessionStorage().setItem(key, data);
}

/**
 *
 * @param fn
 */
function each(fn) {
  for (let i = sessionStorage().length - 1; i >= 0; i -= 1) {
    const key = sessionStorage().key(i);
    fn(read(key), key);
  }
}

/**
 *
 * @param key
 */
function remove(key) {
  return sessionStorage().removeItem(key);
}

/**
 *
 */
function clearAll() {
  return sessionStorage().clear();
}

export default {
  name: 'sessionStorage',
  read,
  write,
  each,
  remove,
  clearAll
};

