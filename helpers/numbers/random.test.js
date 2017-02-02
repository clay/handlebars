'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ random a b }}');

describe(name, function () {
  it('should return a random number between two values', function () {
    expect(tpl({a: 5, b: 10})).to.be.within(5, 10);
  });
});
