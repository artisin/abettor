const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor({async: false});

  const fn = () => arr.push(1);
  test.on('test', fn);
  test.on('test', () => timer(() => arr.push(2)));

  //test one
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 2]);
    }
  });

  //remove
  test.remove('test', fn);

  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 2, 2]);
      done();
    }
  });
};

module.exports = {exp};
