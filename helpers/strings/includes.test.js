'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ includes a b }}');

describe(name, function () {
  it('returns empty if no value passed in', function () {
    expect(tpl({a: null, b: 'test'})).to.be.empty;
  });

  it('throws an error if first arg is not string', function () {
    const result = function () {
      return tpl({a: 100, b: 'test'});
    };

    expect(result).to.throw(Error);
  });

  it('throws an error if second arg is not string', function () {
    const result = function () {
      return tpl({a: 'test', b: 100});
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
