# Abettor

[![license](http://img.shields.io/badge/license-mit-3498db.svg)](https://github.com/artisin/abettor/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/abettor.svg)](https://github.com/artisin/abettor/blob/master/LICENSE)
[![Dependencies Status](https://david-dm.org/artisin/abettor.svg)](https://david-dm.org/artisin/abettor)
[![wercker status](https://app.wercker.com/status/7118d559df30262b7197acecb7b35ed4/s/master "wercker status")](https://app.wercker.com/project/byKey/7118d559df30262b7197acecb7b35ed4)

## About

Abettor helps you manage and emit events through a mediator pattern that allows you to dispatch events. Unlike other event emitting libraries Abettor can be used asynchronously or synchronously in a blocking or non-blocking manner to give you complete control any way you want it.

## Install

You can either install Abettor via npm:

```bash
   yarn add abettor 
```

Alternatively, you can download/copy one of files in the `/dist` folder depending on your use-case:

+ `dist/abettor.js` - The node build for use with webpack and the like
+ `dist/abettor-browser.js` - The browser build includes all the various library dependancies
+ `dist/abettor-browser.min.js` - The minified version of browser version


## Use Cases

One of the best use cases and the reason I built Abettor is to handel DOM events specifically the scroll event. For example, let's say you have multiple DOM events that listen to the window scroll event. Plus these events need to be trigged in a specific order and the various logic is speard out across multiple files.

Inherently things get messy quickly if you want a single source of truth and a non-blocking architecture. However, Abettor makes this a trivial matter so that you don't have to roll-out some janky promise chain. The follow example demenstrates how you can easly accomplish this use case in a clean and sane manner.



```js
// Event emitter in a events.js file - to make things simple
// we'll make this Abettor instance avalible globally through window.
// We all tell Abettor 
const abettor = new Abettor();
window._abettor = abettor;
// Because we want these DOM events to happend one after another in a
// synchronous nature but also be non-blocking
window.addEventListener('scroll', (e) => abettor.emit('scroll', e, {async: false})));

// component-1.js file -> called 3rd
window._abettor.on('scroll', (e) => console.log(`Comp-1 trigged at: ${e.timeStamp}`), {order: 2});

// component-2.js file -> called 1st
window._abettor.on('scroll', (e) => {
  // some logic that takes 500ms to complete
  return new Promise((resolve) => setTimeout(() => {
    console.log(`Comp-2 trigged at: ${e.timeStamp}`);
    // need to resolve promise to let Abettor know it can move onto the next event
    resolve();
  }, 500));
}, {order: 0});


// component-3.js file -> called 2nd
window._abettor.on('scroll', (e) => console.log(`Comp-3 trigged at: ${e.timeStamp}`), {order: 1});
```



## Mode of Operation

By default Abettor uses an `async/await` wrapper to process/trigger events __unless__ the `blocking: true` option is specified. As demonstrated by the above example this allows for a synchronous mode of operation that is also non-blocking. That being said, the default mode of operation for Abettor is asynchronous in nature and is comparable to `Promise.all`. However, unlike `Promise.all` Abettor does not implement fail-fast behavior. That is, if an `on` event throws an error it will not stop the other `on` events from firing/processing. To really drive home this idea here is another synchronous example — the numbers represent when the `console.log` is fired. Also need be check out `/__tests__` for more examples.


```js
const notAsync = new Abettor({async: false});

// setTimeout helper
const timer = (cb, time = 500) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

// 1) called immediately
notAsync.on('test', () => console.log('start'));
// 3) called after 1.5s
notAsync.on('test', () => timer(() => console.log('one'), 1500));
// 4) after the above func resolves this func is invoked and called after 0.5s
// thus 'two' is console logged after 2s
notAsync.on('test', () => timer(() => console.log('two')));
// 5) this func is call immediatley after 'two'
notAsync.on('test', () => console.log('end'));

// Triggers on events
notAsync.emit('test');
// 2) Since Abettor is non-blocking this is fired right after 'start'
console.log('Other Process');
```





## Constructor

Abettor is a JavaScript class and the class constructor accepts an option object. The constructor options are inherited by all `emit` methods of the instance, although, you can override these set options through the option object on the `emit` method.

+ `async: true`
    * By default Abettor is asynchronous in opperation. To use it synchronously you must pass `false` to the `async` option.
+ `blocking: false`
    * By default Abettor uses an `async/await` wrapper in calling both synchronous or asynchronous events so that events are called in a non-blocking manner. However, you can call synchronous events in a blocking manner by passing `true` to the blocking option.
+ `typeCheck: true`
    * Employs basic argument checking to help avoid errors on all methods.


```js
// import/require
import Abettor from 'abettor';

// create instance
const abettor = new Abettor({
  // set default instance options
});
```


## `emit` & `on`

The `emit` and `on` methods are the bread and butter of Abettor. Put simply, the `on` method subscribes to a corresponding `emit` method and when that `emit` method is invoked all subscribed `on` methods are triggered(invoked).

__`emit(<String:event>[, ...args, <Object:option{async, blocking, done}>])`__

The only required argument for the `emit` method is a string that represents the event to which an `on` methods subscribes to. Arguments can also be passed to the `emit` method and in turn these arguments will be passed to each subscribed `on` method. Lastly, an `option` object can be passed as the last argument to override the default Abettor options as well as signal completion through the `done` method.

__`on(<String:event>, <Function>[, <Object:option{once, order}>])`__

The `on` method is composed of two required arguments. The first argument is a string that represents the `emit` event to which the `on` method subscribes to. The second argument is the function to be called if/once the `emit` event is fired. Additionally, you can pass an `option` object argument to specify the specific `order` to which the method is triggered and/or if the method is only to be triggered `once`.


__Basic `emit` & `on` Example__

```js
abettor.on('myEvent', (my, arguments) => {
  // event 1
});
abettor.on('myEvent', (my, arguments) => {
  // event 2
});

// once invoked it triggers both on events
abettor.emit('myEvent', 'my', 'arguments', {
  async: true,
  done: () => {
    // invoked when event 1 & 2 have completed
  }
})
```


## `remove` & `snapshot`

The `remove` and `snapshot` methods are more or less auxiliary method that can be helpful for certain use cases but in general aren’t used with much frequency.

__`remove(<String:event>[, <Index | Function>])`__

As the name implies the `remove` method un-subscribes all or a specific `on` method. If no second argument is passed to the `remove` method all subscribed `on` methods are removed. Alterntaivly, you can pass either the function on the `on` method that is to be removed or the specific index.


```js
abettor.on('myEvent', (my, arguments) => console.log('one'));
abettor.on('myEvent', (my, arguments) => console.log('two'));

// Both subscribed on's are triggered 
abettor.emit('myEvent');

// Removes the second on method
abettor.remove('myEvent', 1);

// Only the first subscribed on method is triggered 
abettor.emit('myEvent');
```



__`snapshot(<String:event>, <String:target-method>[, ...args])`__

The `snapshot` method takes a snapshot of the current state and the target method in question and returns a function to be invoked at a later time. For example, once a remove `snapshot` is taken the only `on` subscribers that will be removed are the ones active at the time of the `snapshot`. The other use case for `snapshot` is to use it with the `emit` method.

```js
abettor.on('myEvent', (my, arguments) => console.log('one'));
abettor.on('myEvent', (my, arguments) => console.log('two'));

const snap = abettor.snapshot('myEvent', 'emit');

abettor.on('myEvent', (my, arguments) => console.log('three'));

// All three subscribed on's are triggered 
abettor.emit('myEvent');

// Only the first two  subscribed on's are triggered three is not
snap();
```



---

Best, te