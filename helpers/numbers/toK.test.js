const name = getName(__filename),
  tpl = hbs.compile('{{ toK a }}');

describe(name, function () {
  it('fails gracefully', function () {
    expect(tpl({a: 'foo'})).to.equal('foo');
  });

  it('passes through sub-1000 numbers', function () {
    expect(tpl({a: 999})).to.equal('999');
  });

  it('handles numbers and strings', function () {
    expect(tpl({a: '1000'})).to.equal('1k');
    expect(tpl({a: 1000})).to.equal('1k');
  });

  it('converts large numbers', function () {
    expect(tpl({a: 100000})).to.equal('100k');
  });

  it('handles non-interger values', function () {
    expect(tpl({a: 1234.5})).to.equal('1.2k');
  });
});
