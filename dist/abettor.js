/*!
 * The MIT License
 * 
 * Copyright (c) 2017 te schultz
 * https://github.com/artisin/abettor
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * 
 */


/* eslint-disable */

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("babel-polyfill"));
	else if(typeof define === 'function' && define.amd)
		define(["babel-polyfill"], factory);
	else if(typeof exports === 'object')
		exports["abettor"] = factory(require("babel-polyfill"));
	else
		root["abettor"] = factory(root["babel-polyfill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1);
module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Abettor = function () {
  function Abettor() {
    var option = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Abettor);

    option = Object.assign({ typeCheck: true, async: true, blocking: false }, option);
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


  _createClass(Abettor, [{
    key: 'emit',
    value: function emit() {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (this.typeCheck) {
        event = this._check({ val: event, msg: 'First argument for the "event" method' });
        if (!event) {
          return this;
        }
      }
      var config = this._config(event, args);
      args = config.args;
      var events = config.events,
          async = config.async;

      if (events && events.length) {
        if (async !== false && this.async) {
          //queue push to wait
          return this._emitAsync.apply(this, [events, event].concat(_toConsumableArray(args || [])));
        }
        //queue push to wait
        this.queue.push({ fn: this._emitSync, events: events, event: event, args: args || [] });
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

  }, {
    key: 'on',
    value: function on() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (this.typeCheck) {
        event = this._check({ val: event, msg: 'First argument for the "on" method' });
        fn = this._check({ val: fn, type: 'function', msg: 'Second argument for the "on" method' });
      }
      //create event or add to arrat
      if (event && fn) {
        option = Object.assign({ once: false, args: [], order: null }, option);
        fn.__AbettorOpt__ = option;
        var order = option.order;
        this.events[event] = !this.events[event] ? [] : this.events[event];
        //no specified ordered
        if (order === null) {
          this.events[event] = this.events[event].push(fn) && this.events[event];
        } else if (order === -1) {
          //last
          this.events[event] = this.events[event].unshift(fn) && this.events[event];
        } else {
          //create indexes need be if order is larger then the length
          if (this.events[event].length < order) {
            this.events[event].length = order;
          }
          var insert = function insert(arr, index, newItem) {
            if (arr[index] === undefined) {
              arr[index] = newItem;
              return arr;
            }
            return [].concat(_toConsumableArray(arr.slice(0, index)), [newItem], _toConsumableArray(arr.slice(index)));
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

  }, {
    key: 'remove',
    value: function remove() {
      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var elm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (this.typeCheck) {
        if (event !== null) {
          event = this._check({ val: event, msg: 'First argument for the "delete" method' });
        }
        if (elm !== null) {
          elm = this._check({ val: elm, type: ['function', 'number'], msg: 'Second argument for the "delete" method' });
        }
      }
      //delete all events
      if (event === null) {
        this.events = {};
      } else if (elm === null) {
        //delete specific event
        if (this.events[event]) {
          delete this.events[event];
        }
      } else if (this.events[event]) {
        if (Number.isInteger(elm)) {
          this.events[event].splice(elm, 1);
        } else {
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

  }, {
    key: 'snapshot',
    value: function snapshot() {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      var event = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var action = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      var self = this;
      if (self.typeCheck) {
        if (action !== null) {
          action = self._check({ val: action, msg: 'First argument for the "snapshot" method' });
        }
        if (event !== null) {
          event = self._check({ val: event, msg: 'Section argument for the "snapshot" method' });
        }
      }
      //assign action method
      var actionMethod = self[action].bind(self);
      if (self.typeCheck && !actionMethod) {
        actionMethod = self._check({ val: actionMethod, type: 'function', msg: 'Snapshot method not found for "' + action + '" which' });
      }
      if (event && actionMethod) {
        var events = self.events[event].slice(0);
        return function () {
          //if remove we need to cylce to only remove current fn's
          if (action === 'remove') {
            for (var i = 0; i < events.length; i++) {
              actionMethod(event, events[i]);
            }
          } else if (action === 'emit') {
            //need to push events on for reffrance
            args.push({ events: events });
            actionMethod.apply(undefined, [event].concat(args));
          } else {
            //default pass on args
            actionMethod.apply(undefined, [event].concat(args));
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

  }, {
    key: '_check',
    value: function _check(_ref) {
      var _ref$val = _ref.val,
          val = _ref$val === undefined ? null : _ref$val,
          _ref$type = _ref.type,
          type = _ref$type === undefined ? 'string' : _ref$type,
          _ref$msg = _ref.msg,
          msg = _ref$msg === undefined ? '' : _ref$msg;

      type = Array.isArray(type) ? type : [type];
      var err = null;
      for (var i = 0; i < type.length; i++) {
        if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== type[i]) {
          err = 'Abettor Error: ' + msg + ' must be a ' + JSON.stringify(type) + '.';
        } else {
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

  }, {
    key: '_config',
    value: function _config(event, args) {
      var option = args.length && args[args.length - 1];
      var config = {
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

  }, {
    key: '_checkQueue',
    value: function _checkQueue() {
      //check if events in queue and and sync is not in action
      if (this.queue.length && !this.inAction) {
        var fn = this.queue.shift();
        return fn.fn.apply(this, [fn.events, fn.event].concat(_toConsumableArray(fn.args)));
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

  }, {
    key: '_emitAsync',
    value: function _emitAsync(events, event) {
      for (var _len3 = arguments.length, args = Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
        args[_key3 - 2] = arguments[_key3];
      }

      var self = this;
      //copy to break ref
      events = events.slice(0);
      var count = events.length;
      var option = args.length && args[args.length - 1];
      var done = option && option.done && typeof option.done === 'function' && args.pop().done;
      var rmQueue = [];

      /**
       * async wrapper to invoke emit functions
       * @param  {fnc} fn -> emit function
       */
      var emit = function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(fn) {
          var fnArgs, i;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  fnArgs = args || [];
                  //only run if a function

                  if (!fn) {
                    _context.next = 6;
                    break;
                  }

                  if (fn.__AbettorOpt__.args.length) {
                    fnArgs = [].concat(_toConsumableArray(fn.__AbettorOpt__.args), _toConsumableArray(fnArgs));
                  }
                  if (fn.__AbettorOpt__.once) {
                    rmQueue.push(function () {
                      return self.remove(event, fn);
                    });
                  }
                  _context.next = 6;
                  return fn.apply(undefined, _toConsumableArray(fnArgs));

                case 6:
                  --count;
                  //complete if 0
                  if (count === 0) {
                    //clear out rm queue of once fns
                    for (i = 0; i < rmQueue.length; i++) {
                      rmQueue[i]();
                    }
                  }
                  //complete and last plus done cb invoke
                  if (count === 0 && done) {
                    done();
                  }

                case 9:
                case 'end':
                  return _context.stop();
              }
            }
          }, _callee, this);
        }));

        return function emit(_x10) {
          return _ref2.apply(this, arguments);
        };
      }();
      //Cycle and call events -> I would Promise.all but due to its fail-fast behaviour
      //it's best just to loop
      for (var i = 0; i < events.length; i++) {
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

  }, {
    key: '_emitSync',
    value: function _emitSync(events, event) {
      for (var _len4 = arguments.length, args = Array(_len4 > 2 ? _len4 - 2 : 0), _key4 = 2; _key4 < _len4; _key4++) {
        args[_key4 - 2] = arguments[_key4];
      }

      var self = this;
      //sync in action to block checkQueue
      this.inAction = true;
      //copy to break ref
      events = events.slice(0);
      var option = args.length && args[args.length - 1];
      var done = option && option.done && typeof option.done === 'function' && args.pop().done;
      var rmQueue = [];

      /**
       * wrapper fn's to call in a blocking manner or in a non blocking manner
       * either way the emit events are called sync in order
       */
      var emitAsync = function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(fn, fnArgs, next) {
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return fn.apply(undefined, _toConsumableArray(fnArgs));

                case 2:
                  return _context2.abrupt('return', next());

                case 3:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, this);
        }));

        return function emitAsync(_x11, _x12, _x13) {
          return _ref3.apply(this, arguments);
        };
      }();
      var emitBlock = function emitBlock(fn, fnArgs, next) {
        fn.apply(undefined, _toConsumableArray(fnArgs));
        return next();
      };

      var emit = function emit(fn, next) {
        var fnArgs = args || [];
        //only run if a func
        if (fn) {
          if (fn.__AbettorOpt__.args.length) {
            fnArgs = [].concat(_toConsumableArray(fn.__AbettorOpt__.args), _toConsumableArray(fnArgs));
          }
          //remove if only once
          if (fn.__AbettorOpt__.once) {
            rmQueue.push(function () {
              return self.remove(event, fn);
            });
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
      var callRecur = function callRecur(next) {
        if (events[next]) {
          return emit(events[next], function () {
            return callRecur(++next);
          });
        }
        //complete
        //clear out rm queue of once fns
        for (var i = 0; i < rmQueue.length; i++) {
          rmQueue[i]();
        }
        //if done method invoke to signal completion
        if (done) {
          done();
        }
        self.inAction = false;
        return self._checkQueue();
      };
      return callRecur(0);
    }
  }]);

  return Abettor;
}();

module.exports = Abettor;

/***/ })
/******/ ]);
});
//# sourceMappingURL=abettor.js.map