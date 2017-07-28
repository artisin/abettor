const Abettor = require('abettor');


const exp = (should, done) => {
  const arr = [];
  const test = new Abettor({async: false, blocking: true});

  test.on('test', () => arr.push(1));
  test.on('test', () => arr.push(2));

  //test one
  test.emit('test');
  //no need to call test in done method becuase blocking
  should.deepEqual(arr, [1, 2]);

  //test two
  test.emit('test');
  //no need to call test in done method becuase blocking
  should.deepEqual(arr, [1, 2, 1, 2]);

  done();
};

module.exports = {exp};
