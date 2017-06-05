// cookieStorage is useful Safari private browser mode, where localStorage
// doesn't work but cookies do. This implementation is adopted from
// https://developer.mozilla.org/en-US/docs/Web/API/Storage/LocalStorage

import util from '../engine/util';

const Global = util.Global;
const trim = util.trim;
const doc = Global.document;

/**
 *
 * @param key
 * @return {boolean}
 * @private
 */
function _has(key) {
  return (new RegExp(`(?:^|;\\s*)${escape(key).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=`)).test(doc.cookie); // eslint-disable-line no-useless-escape
}

/**
 *
 * @param key
 * @return {null}
 */
function read(key) {
  if (!key || !_has(key)) {
    return null;
  }
  const regexpStr = `(?:^|.*;\\s*)${escape(key).replace(/[\-\.\+\*]/g, '\\$&')}\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*`; // eslint-disable-line no-useless-escape
  return unescape(doc.cookie.replace(new RegExp(regexpStr), '$1'));
}

/**
 *
 * @param callback
 */
function each(callback) {
  const cookies = doc.cookie.split(/; ?/g);
  for (let i = cookies.length - 1; i >= 0; i -= 1) {
    if (!trim(cookies[i])) {
      continue;
    }
    const kvp = cookies[i].split('=');
    const key = unescape(kvp[0]);
    const val = unescape(kvp[1]);
    callback(val, key);
  }
}

/**
 *
 * @param key
 * @param data
 */
function write(key, data) {
  if (!key) {
    return;
  }
  doc.cookie = `${escape(key)}=${escape(data)}; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`;
}

/**
 *
 * @param key
 */
function remove(key) {
  if (!key || !_has(key)) {
    return;
  }
  doc.cookie = `${escape(key)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
}

/**
 *
 */
function clearAll() {
  each((_, key) => {
    remove(key);
  });
}

export default {
  name: 'cookieStorage',
  read,
  write,
  each,
  remove,
  clearAll
};
