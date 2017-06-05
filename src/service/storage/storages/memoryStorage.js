// memoryStorage is a useful last fallback to ensure that the store
// is functions (meaning store.get(), store.set(), etc will all function).
// However, stored values will not persist when the browser navigates to
// a new page or reloads the current page.

let memoryStorage = {};

/**
 *
 * @param key
 * @return {*}
 */
function read(key) {
  return memoryStorage[key];
}

/**
 *
 * @param key
 * @param data
 */
function write(key, data) {
  memoryStorage[key] = data;
}

/**
 *
 * @param callback
 */
function each(callback) {
  for (const key in memoryStorage) {
    if (Object.prototype.hasOwnProperty.call(memoryStorage, key)) {
      callback(memoryStorage[key], key);
    }
  }
}

/**
 *
 * @param key
 */
function remove(key) {
  delete memoryStorage[key];
}

/**
 *
 * @param key
 */
function clearAll(key) {
  memoryStorage = {};
}

export default {
  name: 'memoryStorage',
  read,
  write,
  each,
  remove,
  clearAll
};
