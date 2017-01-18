'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ concat a b c }}');

describe(name, function () {
  it('concats two strings', function () {
    expect(tpl({a: 'a', b: 'b'})).to.equal('ab');
  });

  it('concats more than two strings', function () {
    expect(tpl({a: 'a', b: 'b', c: 'c'})).to.equal('abc');
  });

  it('coerces to string', function () {
    expect(tpl({a: 1, b: 2})).to.equal('12');
  });
});
