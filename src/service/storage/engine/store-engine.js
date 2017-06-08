import util from './util';
const slice = util.slice;
const pluck = util.pluck;
const each = util.each;
const create = util.create;
const isList = util.isList;
const isFunction = util.isFunction;
const isObject = util.isObject;

/**
 * It reads and create related stores
 *
 * @param {Array} storages
 * @param {Array} plugins
 * @for Storage
 * @method createStore
 * @return {*} store
 */
function createStore(storages, plugins) {
  const _privateStoreProps = {
    _seenPlugins: [],
    _namespacePrefix: '',
    _namespaceRegexp: null,
    _legalNamespace: /^[a-zA-Z0-9_\-]+$/, // eslint-disable-line no-useless-escape

    /**
     *
     * @return {*}
     * @private
     */
    _storage() {
      if (!this.enabled) {
        throw new Error('store.js: No supported storage has been added! ' +
          'Add one (e.g store.addStorage(require("store/storages/cookieStorage")) ' +
          'or use a build with more built-in storages (e.g ' +
          'https://github.com/marcuswestin/store.js/tree/master/dist/store.legacy.min.js)');
      }
      return this._storage.resolved;
    },

    /**
     *
     * @param storage
     * @return {boolean}
     * @private
     */
    _testStorage(storage) {
      try {
        const testStr = '__storejs__test__';
        storage.write(testStr, testStr);
        const ok = (storage.read(testStr) === testStr);
        storage.remove(testStr);
        return ok;
      } catch (e) {
        return false;
      }
    },

    /**
     *
     * @param pluginFnProp
     * @param propName
     * @private
     */
    _assignPluginFnProp(pluginFnProp, propName) {
      const oldFn = this[propName];
      this[propName] = function pluginFn() {
        const args = slice(arguments, 0); // eslint-disable-line prefer-rest-params
        const self = this;

        // superFn calls the old function which was overwritten by
        // this mixin.
        function superFn() {
          if (!oldFn) {
            return;
          }
          each(arguments, (arg, i) => { // eslint-disable-line prefer-rest-params
            args[i] = arg;
          });
          return oldFn.apply(self, args);
        }

        // Give mixing function access to superFn by prefixing all mixin function
        // arguments with superFn.
        const newFnArgs = [superFn].concat(args);

        return pluginFnProp.apply(self, newFnArgs);
      };
    },

    /**
     *
     * @param obj
     * @private
     */
    _serialize(obj) {
      return JSON.stringify(obj);
    },

    /**
     *
     * @param strVal
     * @param defaultVal
     * @return {*}
     * @private
     */
    _deserialize(strVal, defaultVal) {
      if (!strVal) {
        return defaultVal;
      }
      // It is possible that a raw string value has been previously stored
      // in a storage without using store.js, meaning it will be a raw
      // string value instead of a JSON serialized string. By defaulting
      // to the raw string value in case of a JSON parse error, we allow
      // for past stored values to be forwards-compatible with store.js
      let val = '';
      try {
        val = JSON.parse(strVal);
      } catch (e) {
        val = strVal;
      }

      return (val !== undefined ? val : defaultVal);
    }
  };

  const store = create(_privateStoreProps, storeAPI); // eslint-disable-line no-use-before-define
  each(storages, storage => { // eslint-disable-line arrow-parens
    store.addStorage(storage);
  });
  each(plugins, plugin => { // eslint-disable-line arrow-parens
    store.addPlugin(plugin);
  });
  return store;
}

/**
 * @for Storage
 * @private
 * @protected
 * @type {{version: string, enabled: boolean, addStorage: ((storage?)), addPlugin: ((plugin?)), get: ((key, optionalDefaultValue?)=>*), set: ((key?, value?)=>*), remove: ((key)), each: ((callback)), clearAll: (()), hasNamespace: ((namespace)=>boolean), namespace: ((namespace?)), createStore: ((storages?, plugins?)=>*)}}
 */
const storeAPI = {
  version: '2.0.3',
  enabled: false,


  /**
   * addStorage adds another storage to this store.
   * The store will use the first storage it receives that is enabled,
   * call addStorage in the order of preferred storage.
   * @param storage
   */
  addStorage(storage) {
    if (this.enabled) {
      return;
    }
    if (this._testStorage(storage)) {
      this._storage.resolved = storage;
      this.enabled = true;
    }
  },

  // addPlugin will add a plugin to this store.
  /**
   *
   * @param plugin
   */
  addPlugin(plugin) {
    const self = this;

    // If the plugin is an array, then add all plugins in the array.
    // This allows for a plugin to depend on other plugins.
    if (isList(plugin)) {
      each(plugin, plugin => { // eslint-disable-line arrow-parens
        self.addPlugin(plugin);
      });
      return;
    }

    // Keep track of all plugins we've seen so far, so that we
    // don't add any of them twice.
    const seenPlugin = pluck(this._seenPlugins, seenPlugin => plugin === seenPlugin);
    if (seenPlugin) {
      return;
    }
    this._seenPlugins.push(plugin);

    // Check that the plugin is properly formed
    if (!isFunction(plugin)) {
      throw new Error('Plugins must be function values that return objects');
    }

    const pluginProperties = plugin.call(this);
    if (!isObject(pluginProperties)) {
      throw new Error('Plugins must return an object of function properties');
    }

    // Add the plugin function properties to this store instance.
    each(pluginProperties, (pluginFnProp, propName) => {
      if (!isFunction(pluginFnProp)) {
        throw new Error(`Bad plugin property: ${propName} from plugin ${plugin.name}. Plugins should only return functions.`);
      }
      self._assignPluginFnProp(pluginFnProp, propName);
    });
  },

  // get returns the value of the given key. If that value
  // is undefined, it returns optionalDefaultValue instead.
  /**
   *
   * @param key
   * @param optionalDefaultValue
   * @return {*}
   */
  get(key, optionalDefaultValue) {
    const data = this._storage().read(this._namespacePrefix + key);
    return this._deserialize(data, optionalDefaultValue);
  },

  // set will store the given value at key and returns value.
  // Calling set with value === undefined is equivalent to calling remove.
  /**
   *
   * @param key
   * @param value
   * @return {*}
   */
  set(key, value) {
    if (value === undefined) {
      return this.remove(key);
    }
    this._storage().write(this._namespacePrefix + key, this._serialize(value));
    return value;
  },

  // remove deletes the key and value stored at the given key.
  /**
   *
   * @param key
   */
  remove(key) {
    this._storage().remove(this._namespacePrefix + key);
  },

  // each will call the given callback once for each key-value pair
  // in this store.
  each(callback) {
    const self = this;
    this._storage().each((val, namespacedKey) => {
      callback(self._deserialize(val), namespacedKey.replace(self._namespaceRegexp, ''));
    });
  },

  // clearAll will remove all the stored key-value pairs in this store.
  /**
   *
   */
  clearAll() {
    this._storage().clearAll();
  },

  // additional functionality that can't live in plugins
  // ---------------------------------------------------

  // hasNamespace returns true if this store instance has the given namespace.
  /**
   *
   * @param namespace
   * @return {boolean}
   */
  hasNamespace(namespace) {
    return (this._namespacePrefix === `__storejs_${namespace}_`);
  },

  // namespace clones the current store and assigns it the given namespace
  /**
   *
   * @param namespace
   */
  namespace(namespace) {
    if (!this._legalNamespace.test(namespace)) {
      throw new Error('store.js namespaces can only have alhpanumerics + underscores and dashes');
    }
    // create a prefix that is very unlikely to collide with un-namespaced keys
    const namespacePrefix = `__storejs_${namespace}_`;
    return create(this, {
      _namespacePrefix: namespacePrefix,
      _namespaceRegexp: namespacePrefix ? new RegExp(`^${namespacePrefix}`) : null
    });
  },

  // createStore creates a store.js instance with the first
  // functioning storage in the list of storage candidates,
  // and applies the the given mixins to the instance.
  /**
   *
   * @param storages
   * @param plugins
   * @return {*}
   */
  createStore(storages, plugins) {
    return createStore(storages, plugins);
  }
};

export default {
  createStore
};

