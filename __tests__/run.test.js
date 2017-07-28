const _       = require('lodash');
const fs      = require('fs');
const glob    = require('glob-all');
const should  = require('should');


/**
 * Adds/runs test
 * @param {str} testFile -> testFile path
 */
const addTest = (testFile) => {
  //gets the txt file assosiated with test
  const itShould = fs.readFileSync(testFile.replace('.js', '.md'), 'utf-8');
  //run test
  describe(testFile, () => {
    it(itShould, (done) => {
      //dynamically require test
      const {exp, res} = require('.' + testFile.slice(11));
      //if no result assume expected is a assertion funk
      if (!res) {
        exp(should, done);
      }else {
        (exp).should.equal(res);
        done();
      }
    });
  });
};

//glob, cycle, and test
const testGlob = glob.sync(['./__tests__/**/*.js', '!./__tests__/run.test.js']).reverse();
_.forEach(testGlob, (testFile) => {
  addTest(testFile);
});
