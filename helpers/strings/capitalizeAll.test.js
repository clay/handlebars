'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ capitalizeAll a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
  });

  it('capitalizes every word in a string', function () {
    expect(tpl({a: 'foo bar'})).to.equal('Foo Bar');
  });
});
