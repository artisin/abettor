const Abettor = require('abettor');

//settimeout wrapper
const timer = (cb, time = 100) =>
  new Promise((resolve) => {setTimeout(() => {resolve(cb());}, time);});

const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();
  //called immediately
  test.on('test', () => arr.push(1) && should.deepEqual(arr, [1]));
  //called after 200ms
  test.on('test', () => timer(() => arr.push(2) && should.deepEqual(arr, [1, 2]), 200));
  //after the above func resolves this func is invoked and called after 300ms
  //thus 'two' is console logged after 2s
  test.on('test', () => timer(() => arr.push(3) && should.deepEqual(arr, [1, 2, 3])));
  //this func is call immediatley after 'two'
  test.on('test', () => arr.push(4) && should.deepEqual(arr, [1, 2, 3, 4]));

  //->
  test.emit('test', {
    done: () => done(),
    // can be set on the emit event indv
    async: false
  });
};

module.exports = {exp};
