/**
 * Alias a method while keeping the context correct, to allow for overwriting of target method.
 *
 * @param {String} name The name of the target method.
 * @return {Function} The aliased method
 * @api private
 * @for Events
 * @method alias
 */
const alias = (name) => { // eslint-disable-line arrow-body-style
  return function aliasClosure() {
    return this[name](...arguments); // eslint-disable-line prefer-rest-params
  };
};

/**
 *
 * @param listener
 *
 * @for Events
 * @method isValidListener
 * @return {*}
 */
const isValidListener = (listener) => {
  let returnValue;
  if (typeof listener === 'function' || listener instanceof RegExp) {
    returnValue = true;
  } else if (listener && typeof listener === 'object') {
    returnValue = isValidListener(listener.listener);
  } else {
    returnValue = false;
  }
  return returnValue;
};

/**
 * Finds the index of the listener for the event in its storage array.
 *
 * @param {Function[]} listeners Array of listeners to search through.
 * @param {Function} listener Method to look for.
 *
 * @for Events
 * @method indexOfListener
 * @return {Number} Index of the specified listener, -1 if not found
 * @api private
 */
const indexOfListener = (listeners, listener) => {
  let i = listeners.length;
  while (i--) {  // eslint-disable-line no-plusplus
    if (listeners[i].listener === listener) {
      return i;
    }
  }

  return -1;
};


class Events {
  /**
   *
   * @param loggerClass
   * @class Events
   * @constructor
   */
  constructor(loggerClass) {
    this.logger = loggerClass;
    this.logger.addLog('Events', 'create', 'Events Class Initialized');
    this.on = alias('addListener');
    this.once = alias('addOnceListener');
    this.off = alias('removeListener');
    this.removeAllListeners = alias('removeEvent');
    this.trigger = alias('triggerEvent');
  }

  /**
   * Returns the listener array for the specified event.
   * Will initialise the event object and listener arrays if required.
   * Will return an object if you use a regex search.
   * The object contains keys for each matched event.
   * So /ba[rz]/ might return an object containing bar and baz.
   * But only if you have either defined them with defineEvent or added some listeners to them.
   * Each property in the object response is an array of listener functions.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   *
   * @for Events
   * @method getListeners
   * @return {Function[]|Object} All listener functions for the event.
   */
  getListeners(evt) {
    const events = this._getEvents();
    let response;
    let key;

    // Return a concatenated array of all matching events if
    // the selector is a regular expression.
    if (evt instanceof RegExp) {
      response = {};
      for (key in events) {
        if (Object.prototype.hasOwnProperty.call(events, key) && evt.test(key)) {
          response[key] = events[key];
        }
      }
    } else {
      response = events[evt] || (events[evt] = []);
    }

    return response;
  }

  /**
   * Takes a list of listener objects and flattens it into a list of listener functions.
   *
   * @param {Object[]} listeners Raw listener objects.
   *
   * @for Events
   * @method flattenListeners
   * @return {Function[]} Just the listener functions.
   */
  flattenListeners(listeners) { /*
  eslint class-methods-use-this: ["error", { "exceptMethods": ["flattenListeners"] }] */
    const flatListeners = [];
    let i;

    for (i = 0; i < listeners.length; i += 1) {
      flatListeners.push(listeners[i].listener);
    }

    return flatListeners;
  }

  /**
   * Fetches the requested listeners via getListeners
   * but will always return the results inside an object.
   * This is mainly for internal use but others may find it useful.
   *
   * @param {String|RegExp} evt Name of the event to return the listeners from.
   * @for Events
   * @method getListenersAsObject
   * @return {Object} All listener functions for an event in an object.
   */
  getListenersAsObject(evt) {
    const listeners = this.getListeners(evt);
    let response;

    if (listeners instanceof Array) {
      response = {};
      response[evt] = listeners;
    }

    return response || listeners;
  }

  /**
   * Adds a listener function to the specified event.
   * The listener will not be added if it is a duplicate.
   * If the listener returns true then;
   * it will be removed after it is called.
   * If you pass a regular expression as the event name then;
   * the listener will be added to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted.
   * If the function returns true then it will be removed after calling.
   * @for Events
   * @method addListener
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  addListener(evt, listener) {
    if (!isValidListener(listener)) {
      throw new TypeError('listener must be a function');
    }

    const listeners = this.getListenersAsObject(evt);
    const listenerIsWrapped = typeof listener === 'object';
    let key;

    for (key in listeners) {
      const propertyCheck = Object.prototype.hasOwnProperty.call(listeners, key);
      const checkIndexOfListener = indexOfListener(listeners[key], listener);
      if (propertyCheck && checkIndexOfListener === -1) {
        listeners[key].push(listenerIsWrapped ? listener : {
          listener,
          once: false
        });
      }
    }
    return this;
  }

  /**
   * Semi-alias of addListener. It will add a listener that will be
   * automatically removed after its first execution.
   *
   * @param {String|RegExp} evt Name of the event to attach the listener to.
   * @param {Function} listener Method to be called when the event is emitted.
   * If the function returns true then it will be removed after calling.
   * @for Events
   * @method addOnceListener
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  addOnceListener(evt, listener) {
    return this.addListener(evt, {
      listener,
      once: true
    });
  }

  /**
   * Defines an event name.
   * This is required if you want to use a regex to add a listener to multiple events at once.
   * If you don't do this then how do you expect it to know what event to add to?
   * Should it just add to every possible match for a regex? No. That is scary and bad.
   * You need to tell it what event names should be matched by a regex.
   *
   * @param {String} evt Name of the event to create.
   * @for Events
   * @method defineEvent
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  defineEvent(evt) {
    this.getListeners(evt);
    return this;
  }

  /**
   * Uses defineEvent to define multiple events.
   *
   * @param {String[]} evts An array of event names to define.
   * @for Events
   * @method defineEvents
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  defineEvents(evts) {
    for (let i = 0; i < evts.length; i += 1) {
      this.defineEvent(evts[i]);
    }
    return this;
  }

  /**
   * Removes a listener function from the specified event.
   * When passed a regular expression as the event name,
   * it will remove the listener from all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to remove the listener from.
   * @param {Function} listener Method to remove from the event.
   * @for Events
   * @method removeListener
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  removeListener(evt, listener) {
    const listeners = this.getListenersAsObject(evt);
    let index;
    let key;

    for (key in listeners) {
      if (Object.prototype.hasOwnProperty.call(listeners, key)) {
        index = indexOfListener(listeners[key], listener);

        if (index !== -1) {
          listeners[key].splice(index, 1);
        }
      }
    }

    return this;
  }

  /**
   * Adds listeners in bulk using the manipulateListeners method.
   * If you pass an object as the first argument you can add to multiple events at once.
   * The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added.
   * Can pass it a regular expression to add the array of listeners to all events that match it.
   * Yeah, this function does quite a bit. That's probably a bad thing.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
   * An object if you wish to add to multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to add.
   * @for Events
   * @method addListeners
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  addListeners(evt, listeners) {
    return this.manipulateListeners(false, evt, listeners);
  }

  /**
   * Removes listeners in bulk using the manipulateListeners method.
   * If you pass an object as the first argument you can remove from multiple events at once.
   * The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be removed.
   * You can also pass it a regular expression to
   * remove the listeners from all events that match it.
   *
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
   * An object if you wish to remove from multiple events at once.
   * @param {Function[]} [listeners] An optional array of listener functions to remove.
   * @for Events
   * @method removeListeners
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  removeListeners(evt, listeners) {
    return this.manipulateListeners(true, evt, listeners);
  }

  /**
   * Edits listeners in bulk.
   * The addListeners and removeListeners methods both use this to do their job.
   * You should really use those instead, this is a little lower level.
   * The first argument will determine if the listeners are removed (true) or added (false).
   * If you pass an object as the second argument you can add/remove from multiple events at once.
   * The object should contain key value pairs of events and listeners or listener arrays.
   * You can also pass it an event name and an array of listeners to be added/removed.
   * You can pass it a regular expression to manipulate the listeners of all events that match it.
   *
   * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
   * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next.
   * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
   * @for Events
   * @method manipulateListeners
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  manipulateListeners(remove, evt, listeners) {
    let i;
    let value;
    const single = remove ? this.removeListener : this.addListener;
    const multiple = remove ? this.removeListeners : this.addListeners;

    // If evt is an object then pass each of its properties to this method
    if (typeof evt === 'object' && !(evt instanceof RegExp)) {
      for (i in evt) {
        value = evt[i];
        if (Object.prototype.hasOwnProperty.call(evt, i) && value) {
          // Pass the single listener straight through to the singular method
          if (typeof value === 'function') {
            single.call(this, i, value);
          } else {
            // Otherwise pass back to the multiple function
            multiple.call(this, i, value);
          }
        }
      }
    } else {
      // So evt must be a string
      // And listeners must be an array of listeners
      // Loop over it and pass each one to the multiple method
      i = listeners.length - 1;
      while (i) {
        single.call(this, evt, listeners[i]);
        i -= 1;
      }
    }

    return this;
  }

  /**
   * Removes all listeners from a specified event.
   * If you do not specify an event then all listeners will be removed.
   * That means every event will be emptied.
   * You can also pass a regex to remove all events that match it.
   *
   * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for.
   * @for Events
   * @method removeEvent
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  removeEvent(evt) {
    const type = typeof evt;
    const events = this._getEvents();
    let key;

    // Remove different things depending on the state of evt
    if (type === 'string') {
      // Remove all listeners for the specified event
      delete events[evt];
    } else if (evt instanceof RegExp) {
      // Remove all events matching the regex.
      for (key in events) {
        if (Object.prototype.hasOwnProperty.call(events, key) && evt.test(key)) {
          delete events[key];
        }
      }
    } else {
      // Remove all listeners in all events
      delete this._events;
    }

    return this;
  }

  /**
   * Emits an event of your choice.
   * When emitted, every listener attached to that event will be executed.
   * If you pass the optional argument array then those arguments
   * will be passed to every listener upon execution.
   * Because it uses `apply`, your array of arguments will be passed as
   * if you wrote them out separately.
   * So they will not arrive within the array on the other side, they will be separate.
   * You can also pass a regular expression to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {Array} [args] Optional array of arguments to be passed to each listener.
   * @for Events
   * @method triggerEvent
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  triggerEvent(evt, args) {
    const listenersMap = this.getListenersAsObject(evt);
    let listeners;
    let listener;
    let i;
    let key;
    let response;

    for (key in listenersMap) {
      if (Object.prototype.hasOwnProperty.call(listenersMap, key)) {
        listeners = listenersMap[key].slice(0);

        for (i = 0; i < listeners.length; i += 1) {
          // If the listener returns true then it shall be removed from the event
          // The function is executed either with a basic call or an apply if there is an args array
          listener = listeners[i];

          if (listener.once === true) {
            this.removeListener(evt, listener.listener);
          }

          response = listener.listener.apply(this, args || []);

          if (response === this._getOnceReturnValue()) {
            this.removeListener(evt, listener.listener);
          }
        }
      }
    }

    return this;
  }

  /**
   * Subtly different from emitEvent in that it will pass its arguments on to the listeners,
   * as opposed to taking a single array of arguments to pass on.
   * you can pass a regex in place of the event name to emit to all events that match it.
   *
   * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
   * @param {...*} Optional additional arguments to be passed to each listener.
   * @for Events
   * @method emit
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  emit(evt) {
    const args = Array.prototype.slice.call(arguments, 1); // eslint-disable-line prefer-rest-params
    return this.triggerEvent(evt, args);
  }

  /**
   * Sets the current value to check against when executing listeners. If a
   * listeners return value matches the one set here then it will be removed
   * after execution. This value defaults to true.
   *
   * @param {*} value The new value to check for when executing listeners.
   * @for Events
   * @method setOnceReturnValue
   * @return {Object} Current instance of EventEmitter for chaining.
   */
  setOnceReturnValue(value) {
    this._onceReturnValue = value;
    return this;
  }

  /**
   * Fetches the current value to check against when executing listeners. If
   * the listeners return value matches this one then it should be removed
   * automatically. It will return true by default.
   *
   * @for Events
   * @method _getOnceReturnValue
   * @return {*|Boolean} The current value to check for or the default, true.
   * @api private
   */
  _getOnceReturnValue() {
    let returnValue;
    if (Object.prototype.hasOwnProperty.call(this, '_onceReturnValue')) {
      returnValue =  this._onceReturnValue;
    } else {
      returnValue = true;
    }
    return returnValue;
  }

  /**
   * Fetches the events object and creates one if required.
   *
   * @for Events
   * @method _getEvents
   * @return {Object} The events storage object.
   * @api private
   */
  _getEvents() {
    return this._events || (this._events = {});
  }

}


export default Events;
