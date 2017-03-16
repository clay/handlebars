'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ removeSpaces a }}');

describe(name, function () {
  it('returns empty string if undefined', function () {
    expect(tpl()).to.equal('');
  });

  it('removes spaces in a string', function () {
    expect(tpl({a: 'foo bar baz'})).to.equal('foobarbaz');
  });

  it('returns the same string if there are no spaces', function () {
    expect(tpl({a: 'abc'})).to.equal('abc');
  });
});
