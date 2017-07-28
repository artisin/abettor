const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor({async: false});

  test.on('test', () => arr.push(1));
  test.on('test', () => timer(() => arr.push(2)));

  const snap = test.snapshot('test', 'remove');

  test.on('test', () => arr.push(3));

  //test one
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 2, 3]);
    }
  });

  //remove snap
  snap();

  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 2, 3, 3]);
      done();
    }
  });
};

module.exports = {exp};
