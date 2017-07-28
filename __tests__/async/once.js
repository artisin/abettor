const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();

  test.on('test', () => arr.push(1), {once: true});
  test.on('test', () => timer(() => arr.push(2)));

  const next = () => {
    //test two -> one should not be invoked since once option
    test.emit('test', {
      done: () => {
        should.deepEqual(arr, [1, 2, 2]);
        done();
      }
    });
  };

  //test one
  test.emit('test', {
    done: () => {
      //calling in done callback due to non-blocking nature
      should.deepEqual(arr, [1, 2]);
      next();
    }
  });

};

module.exports = {exp};
