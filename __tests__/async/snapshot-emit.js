const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();

  test.on('test', () => arr.push(1));
  test.on('test', () => timer(() => arr.push(2)));

  const snap = test.snapshot('test', 'emit', {
    done: () => {
      should.deepEqual(arr, [1, 3, 2, 1, 2]);
      done();
    }
  });

  test.on('test', () => arr.push(3));

  //test one
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 3, 2]);
      //emit snap
      snap();
    }
  });

};

module.exports = {exp};
