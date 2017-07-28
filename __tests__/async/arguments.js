const Abettor = require('abettor');


const exp = (should, done) => {
  const arr = [];
  const test = new Abettor();

  test.on('test', (...args) => arr.push(...args));
  test.on('test', (...args) => arr.push(...args));

  //test one
  test.emit('test', 1, 2);
  should.deepEqual(arr, [1, 2, 1, 2]);

  //test two
  test.emit('test', 3, {
    done: () => {
      should.deepEqual(arr, [1, 2, 1, 2, 3, 3]);
    }
  });

  done();
};

module.exports = {exp};
