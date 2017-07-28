const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor({async: false});

  test.on('test', () => arr.push(1), {once: true});
  test.on('test', () => timer(() => arr.push(2)));

  //test one
  test.emit('test', {
    done: () => {
      //calling in done callback due to non-blocking nature
      should.deepEqual(arr, [1, 2]);
    }
  });

  //test two -> one should not be invoked since once option
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 2, 2]);
      done();
    }
  });
};

module.exports = {exp};
