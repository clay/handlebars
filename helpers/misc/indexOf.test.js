'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ indexOf a b }}');

describe(name, function () {
  it('throws an error if no value passed in', function () {
    const result = function () {
      return tpl({a: null, b: null});
    };

    expect(result).to.throw(Error);
  });

  it('finds indexes in strings', function () {
    expect(tpl({a: 'foo', b: 'f'})).to.equal('0');
  });

  it('finds indexes in arrays', function () {
    expect(tpl({a: ['f', 'o', 'o'], b: 'f'})).to.equal('0');
  });
});
