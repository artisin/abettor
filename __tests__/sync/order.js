const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor({async: false});

  //called 3
  test.on('test', () => arr.push(1), {order: 2});
  //called 2
  test.on('test', () => timer(() => arr.push(2)), {order: 1});
  //called 1
  test.on('test', () => arr.push(3), {order: 0});

  //test one
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [3, 2, 1]);
      done();
    }
  });
};

module.exports = {exp};
