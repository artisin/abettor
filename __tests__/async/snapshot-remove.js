const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();

  test.on('test', () => arr.push(1));
  test.on('test', () => timer(() => arr.push(2)));

  const snap = test.snapshot('test', 'remove');

  test.on('test', () => arr.push(3));

  const next = () => {
    test.emit('test', {
      done: () => {
        should.deepEqual(arr, [1, 3, 2, 3]);
        done();
      }
    });
  };

  //test one
  test.emit('test', {
    done: () => {
      should.deepEqual(arr, [1, 3, 2]);
      //remove snap and call next
      snap();
      next();
    }
  });


};

module.exports = {exp};
