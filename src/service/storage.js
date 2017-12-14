
export default class Storage {

  /**
   * Set value to the storage
   *
   * @param {String} name
   * @param {Object/String/Number} value
   * @returns {Boolean}
   */
  static set(name, value) {
    if(window.localStorage) {
      return window.localStorage.setItem(name, JSON.stringify(value));
    }
  }

  /**
   * Get value from the storage
   *
   * @param {String} name
   * @returns {Object/String/Number} Retrurns FALSE
   */
  static get(name) {
    let value;

    if (window.localStorage) {
      value = window.localStorage.getItem(name);
      if (typeof value !== 'undefined') {
        try {
          return JSON.parse(value);
        }
        catch (e) {
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
    if (window.localStorage) {
      return window.localStorage.clear();
    }

    return false;
  }
}
