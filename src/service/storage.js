import engine from './storage/engine/store-engine';

/**
 * Initialize Storage adapters for Storage
 *
 * @type {[*]} - Require storages
 */
const storages = [
  require('./storage/storages/localStorage'),
  require('./storage/storages/sessionStorage'),
  require('./storage/storages/cookieStorage'),
  require('./storage/storages/memoryStorage')
];

/**
 * Initialize Plugin adapters for Storage
 *
 * @type {[*]} - Require plugins
 */
const plugins = [
  require('./storage/plugins/defaults'),
  require('./storage/plugins/update')
];
/**
 * Initializes Storage Class
 * This class have private methods
 * @class Storage
 * @constructor Storage
 *
 * @param {Array} storages
 * @param {Array} plugins
 */
export default engine.createStore(storages, plugins);
