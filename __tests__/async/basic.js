const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();
  // 1)
  test.on('test', () => arr.push(1) && should.deepEqual(arr, [1]));
  // 4)
  test.on('test', () => timer(() => arr.push(2) && should.deepEqual(arr, [1, 4, 3, 2]), 200));
  // 3)
  test.on('test', () => timer(() => arr.push(3) && should.deepEqual(arr, [1, 4, 3])));
  // 2)
  test.on('test', () => arr.push(4) && should.deepEqual(arr, [1, 4]));

  //->
  test.emit('test', {
    done: () => done()
  });
};

module.exports = {exp};
