require('regenerator-runtime/runtime');


class Abettor {
  constructor(option = {}) {
    option = Object.assign({typeCheck: true, async: true, blocking: false}, option);
    this.events = {};
    this.queue = [];
    this.inAction = false;
    this.async = option.async;
    this.blocking = option.blocking;
    this.typeCheck = option.typeCheck;
  }

  /**
   * Emitter to emit to on events
   * @param  {str} event -> emit event to be emitted
   * @param  {...} args  -> additional args to be passed onto the emited functiosn
   * @return {ref}       -> self refrance
   */
  emit(event = null, ...args) {
    if (this.typeCheck) {
      event = this._check({val: event, msg: 'First argument for the "event" method'});
      if (!event) { return this; }
    }
    const config = this._config(event, args);
    ({args} = config);
    const {events, async} = config;
    if (events && events.length) {
      if (async !== false && this.async) {
        //queue push to wait
        return this._emitAsync(events, event, ...args || []);
      }
      //queue push to wait
      this.queue.push({fn: this._emitSync, events, event, args: args || []});
      return this._checkQueue();
    }
  }


  /**
   * Emit function to be invoked on event
   * @param  {str} event  -> event key
   * @param  {fnc} fn     -> emit function to invoke
   * @param  {obj} option -> option associated/tied to function
   * @return {ref}        -> self reffrance
   */
  on(event = null, fn = null, option = {}) {
    if (this.typeCheck) {
      event = this._check({val: event, msg: 'First argument for the "on" method'});
      fn = this._check({val: fn, type: 'function', msg: 'Second argument for the "on" method'});
    }
    //create event or add to arrat
    if (event && fn) {
      option = Object.assign({once: false, args: [], order: null}, option);
      fn.__AbettorOpt__ = option;
      const order = option.order;
      this.events[event] = !this.events[event] ? [] : this.events[event];
      //no specified ordered
      if (order === null) {
        this.events[event] = this.events[event].push(fn) && this.events[event];
      }else if (order === -1) {
        //last
        this.events[event] = this.events[event].unshift(fn) && this.events[event];
      }else {
        //create indexes need be if order is larger then the length
        if (this.events[event].length < order) {
          this.events[event].length = order;
        }
        const insert = (arr, index, newItem) => {
          if (arr[index] === undefined) {
            arr[index] = newItem;
            return arr;
          }
          return [...arr.slice(0, index), newItem, ...arr.slice(index)];
        };
        this.events[event] = insert(this.events[event], order, fn);
      }
    }
    return this;
  }


  /**
   * Removes all emit events, a specific event, or specific emit fucntion of the event
   * @param  {str} event -> event key
   * @param  {fnc | num}  -> emit function or index to remove
   * @return {ref}       -> self reffrance
   */
  remove(event = null, elm = null) {
    if (this.typeCheck) {
      if (event !== null) { event = this._check({val: event, msg: 'First argument for the "delete" method'}); }
      if (elm !== null) { elm = this._check({val: elm, type: ['function', 'number'], msg: 'Second argument for the "delete" method'}); }
    }
    //delete all events
    if (event === null) {
      this.events = {};
    }else if (elm === null) {
      //delete specific event
      if (this.events[event]) { delete this.events[event]; }
    }else if (this.events[event]) {
      if (Number.isInteger(elm)) {
        this.events[event].splice(elm, 1);
      }else {
        this.events[event].splice(this.events[event].indexOf(elm), 1);
      }
    }
    return this;
  }


  /**
   * Thunk to "take" snapshot for current state to be called at a latter date
   * @param  {str} event  -> event to target
   * @param  {str} action -> method action to take
   * @return {fnc}        -> thunk
   */
  snapshot(event = null, action = null, ...args) {
    const self = this;
    if (self.typeCheck) {
      if (action !== null) { action = self._check({val: action, msg: 'First argument for the "snapshot" method'}); }
      if (event !== null) { event = self._check({val: event, msg: 'Section argument for the "snapshot" method'}); }
    }
    //assign action method
    let actionMethod = self[action].bind(self);
    if (self.typeCheck && !actionMethod) {
      actionMethod = self._check({val: actionMethod, type: 'function', msg: `Snapshot method not found for "${action}" which`});
    }
    if (event && actionMethod) {
      const events = self.events[event].slice(0);
      return function () {
        //if remove we need to cylce to only remove current fn's
        if (action === 'remove') {
          for (let i = 0; i < events.length; i++) {
            actionMethod(event, events[i]);
          }
        }else if (action === 'emit') {
          //need to push events on for reffrance
          args.push({events});
          actionMethod(event, ...args);
        }else {
          //default pass on args
          actionMethod(...[event, ...args]);
        }
      };
    }
    return self;
  }


  /**
   * Internal type check if typeCheck option
   * @param  {---} options.val  -> value to check
   * @param  {---} options.type -> type to check against
   * @param  {str} options.msg  -> error message
   * @return {---}              -> val || null
   */
  _check({val = null, type = 'string', msg = ''}) {
    type = Array.isArray(type) ? type : [type];
    let err = null;
    for (let i = 0; i < type.length; i++) {
      if (typeof val !== type[i]) {
        err = `Abettor Error: ${msg} must be a ${JSON.stringify(type)}.`;
      }else {
        return val;
      }
    }
    if (err) {
      console.error(err);
      return null;
    }
    return val;
  }


  /**
   * Configs the options/events/args for the emit method
   * @param  {str} event -> emit event
   * @param  {...} args  -> args passed to emit
   * @return {obj}       -> configed options/events/args
   */
  _config(event, args) {
    let option = args.length && args[args.length - 1];
    const config = {
      async: this.async,
      events: this.events[event],
      blocking: this.blocking
    };
    //clyce private removal options
    Object.keys(config).forEach(function (val) {
      if (option && option[val] !== undefined) {
        config[val] = option[val];
        //remove if only key since private
        if (Object.keys(option).length === 1) {
          args.pop();
          //reassign
          option = args.length && args[args.length - 1];
        }
      }
    });
    config.args = args;
    return config;
  }


  /**
   * Checks the sync function queue for next sync
   * @return {ref} -> reffrance
   */
  _checkQueue() {
    //check if events in queue and and sync is not in action
    if (this.queue.length && !this.inAction) {
      const fn = this.queue.shift();
      return fn.fn.apply(this, [fn.events, fn.event, ...fn.args]);
    }
    return this;
  }


  /**
   * Internal async event emitter
   * @param  {arr} events -> event array to emit to
   * @param  {str} event  -> specific event key
   * @param  {---} args   -> passed on args from emit method
   * @return {ref}        -> self reffrance
   */
  _emitAsync(events, event, ...args) {
    const self = this;
    //copy to break ref
    events = events.slice(0);
    let count = events.length;
    const option = args.length && args[args.length - 1];
    const done = option && option.done && typeof option.done === 'function' && args.pop().done;
    const rmQueue = [];

    /**
     * async wrapper to invoke emit functions
     * @param  {fnc} fn -> emit function
     */
    const emit = async function (fn) {
      let fnArgs = args || [];
      //only run if a function
      if (fn) {
        if (fn.__AbettorOpt__.args.length) {
          fnArgs = [...fn.__AbettorOpt__.args, ...fnArgs];
        }
        if (fn.__AbettorOpt__.once) {
          rmQueue.push(() => self.remove(event, fn));
        }
        await fn(...fnArgs);
      }
      --count;
      //complete if 0
      if (count === 0) {
        //clear out rm queue of once fns
        for (let i = 0; i < rmQueue.length; i++) { rmQueue[i](); }
      }
      //complete and last plus done cb invoke
      if (count === 0 && done) { done(); }
    };
    //Cycle and call events -> I would Promise.all but due to its fail-fast behaviour
    //it's best just to loop
    for (let i = 0; i < events.length; i++) {
      emit(events[i]);
    }
    return self._checkQueue();
  }


  /**
   * Internal sync event emitter
   * @param  {arr} events -> event array to emit to
   * @param  {str} event  -> specific event key
   * @param  {---} args   -> passed on args from emit method
   * @return {ref}        -> self reffrance
   */
  _emitSync(events, event, ...args) {
    const self = this;
    //sync in action to block checkQueue
    this.inAction = true;
    //copy to break ref
    events = events.slice(0);
    const option = args.length && args[args.length - 1];
    const done = option && option.done && typeof option.done === 'function' && args.pop().done;
    const rmQueue = [];

    /**
     * wrapper fn's to call in a blocking manner or in a non blocking manner
     * either way the emit events are called sync in order
     */
    const emitAsync = async function (fn, fnArgs, next) {
      await fn(...fnArgs);
      return next();
    };
    const emitBlock = function (fn, fnArgs, next) {
      fn(...fnArgs);
      return next();
    };

    const emit = function (fn, next) {
      let fnArgs = args || [];
      //only run if a func
      if (fn) {
        if (fn.__AbettorOpt__.args.length) {
          fnArgs = [...fn.__AbettorOpt__.args, ...fnArgs];
        }
        //remove if only once
        if (fn.__AbettorOpt__.once) {
          rmQueue.push(() => self.remove(event, fn));
        }
        //check to call func in blocking manner
        if (self.blocking || option.blocking) {
          return emitBlock(fn, fnArgs, next);
        }
        return emitAsync(fn, fnArgs, next);
      }
      return next();
    };
    /**
     * Call in sync recursive fashion
     * @param  {num} next -> call next in line
     * @return {ref}      -> reffrance
     */
    const callRecur = function (next) {
      if (events[next]) {
        return emit(events[next], function () {
          return callRecur(++next);
        });
      }
      //complete
      //clear out rm queue of once fns
      for (let i = 0; i < rmQueue.length; i++) { rmQueue[i](); }
      //if done method invoke to signal completion
      if (done) { done(); }
      self.inAction = false;
      return self._checkQueue();
    };
    return callRecur(0);
  }
}


module.exports = Abettor;
