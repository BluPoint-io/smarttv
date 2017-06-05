import util from '../engine/util';
const Global = util.Global;

/**
 *
 * @return {Storage}
 */
function localStorage() {
  return Global.localStorage;
}

/**
 *
 * @param key
 */
function read(key) {
  return localStorage().getItem(key);
}

/**
 *
 * @param key
 * @param data
 */
function write(key, data) {
  return localStorage().setItem(key, data);
}

/**
 *
 * @param fn
 */
function each(fn) {
  for (let i = localStorage().length - 1; i >= 0; i -= 1) {
    const key = localStorage().key(i);
    fn(read(key), key);
  }
}

/**
 *
 * @param key
 */
function remove(key) {
  return localStorage().removeItem(key);
}

/**
 *
 */
function clearAll() {
  return localStorage().clear();
}

/**
 *
 */
export default {
  name: 'localStorage',
  read,
  write,
  each,
  remove,
  clearAll
};
