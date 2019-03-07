export default class Storage {
  /**
   * Set value to the storage
   *
   * @param {String} name
   * @param {Object/String/Number} value
   */
  static set(name, value) {
    window.localStorage && window.localStorage.setItem(name, JSON.stringify(value));
  }

  /**
   * Get value from the storage
   *
   * @param {String} name
   * @returns {Object/String/Number} value
   */
  static get(name) {
    const value = window.localStorage && window.localStorage.getItem(name);
    return value && JSON.parse(value);
  }

  /**
   * Clear all stored data
   *
   * @returns {Boolean}
   */
  static clear() {
    window.localStorage && window.localStorage.clear();
  }
}
