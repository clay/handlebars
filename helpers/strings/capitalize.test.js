'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ capitalize a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
  });

  it('capitalizes first character in a string', function () {
    expect(tpl({a: 'foo bar'})).to.equal('Foo bar');
  });
});
