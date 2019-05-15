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
    let value = 0;
    if (window.localStorage) {
      value = window.localStorage.getItem(name);
      if (typeof value !== 'undefined') {
        try {
          return JSON.parse(value);
        } catch (e) {
          return value;
        }
      }
    }
    return false;
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
