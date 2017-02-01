'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ join a b }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
    expect(tpl({a: []})).to.equal('');
  });

  it('should join items by the default separator', function () {
    expect(tpl({a: ['a', 'b', 'c']})).to.equal('a, b, c');
  });

  it('should join by a custom separator', function () {
    expect(tpl({a: ['a', 'b', 'c'], b: ' | '})).to.equal('a | b | c');
  });
});
