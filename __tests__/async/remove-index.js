const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();

  const fn = () => arr.push(1);
  test.on('test', fn);
  test.on('test', () => timer(() => arr.push(2)));

  const next = () => {
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
      should.deepEqual(arr, [1, 2]);
      //remove and next
      test.remove('test', 0);
      next();
    }
  });

};

module.exports = {exp};
