'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ searchString a b }}');

describe(name, function () {
  it('throws an error if no value passed in', function () {
    const result = function () {
      return tpl({a: null, b: 'test'});
    };

    expect(result).to.throw(Error);
  });

  it('throws an error if arguments are not strings', function () {
    const result = function () {
      return tpl({a: 100, b: 'test'});
    };

    expect(result).to.throw(Error);
  });

  it('finds substring within string', function () {
    expect(tpl({a: 'foo', b: 'f'})).to.be.ok;
  });

  it('returns empty if substring is not found', function () {
    expect(tpl({a: 'foo', b: 'p'})).to.be.empty;
  });

});
