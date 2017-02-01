'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ trim a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
  });

  it('trims leading whitespace', function () {
    expect(tpl({a: '   foo'})).to.equal('foo');
  });

  it('trims trailing whitespace', function () {
    expect(tpl({a: 'foo    '})).to.equal('foo');
  });

  it('trims both leading and trailing whitespace', function () {
    expect(tpl({a: '   foo   '})).to.equal('foo');
  });
});
