'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ join (map a (getProp "a")) }}');

describe(name, function () {
  it('returns empty array if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
    expect(tpl({a: []})).to.equal('');
  });

  it('should map the items in the array and return new values', function () {
    expect(tpl({a: [{ a: '1' }, { a: '2' }]})).to.equal('1, 2');
  });

  it('should work with a string value', function () {
    expect(hbs.compile('{{ join (map a double) " " }}')({a: 'abc', double: (a) => a + a})).to.equal('aa bb cc');
  });
});
