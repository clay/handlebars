'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ random a b }}'),
  wrap = function (a, b) {
    return function () {
      return tpl({a,b});
    };
  };

describe(name, function () {
  it('should return a random number between two values', function () {
    expect(tpl({a: 5, b: 10})).to.be.within(5, 10);
  });
  it('throws error if passed values that are not numeric or finite', function () {
    expect(wrap(0, Infinity)).to.throw(Error);
    expect(wrap('a','b')).to.throw(Error);
    expect(wrap({},{})).to.throw(Error);
    expect(wrap(null, null)).to.throw(Error);
    expect(wrap(undefined, undefined)).to.throw(Error);
  });
});
