
module.exports = {
  exp: function (should, done) {
    (5).should.be.exactly(5).and.be.a.Number;
    done();
  }
};

