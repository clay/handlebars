'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ subtract a b }}');

describe(name, function () {
  it('returns NaN if something fails', function () {
    expect(tpl()).to.equal('NaN');
  });

  it('returns the difference of two numbers', function () {
    expect(tpl({a: 5, b: 3})).to.equal('2');
  });
});
