const name = getName(__filename),
  tpl = hbs.compile('{{ commaSeparated a }}');

describe(name, function () {
  it('returns emptystring if not an object', function () {
    expect(tpl()).to.equal('');
  });

  it('only returns keys with truthy values', function () {
    expect(tpl({a: {alpha: true, bravo: false}})).to.equal('alpha');
  });

  it('delineates items with commas', function () {
    expect(tpl({a: {alpha: true, bravo: true}})).to.equal('alpha, bravo');
  });

  it('capitalizes the first word in items', function () {
    expect(hbs.compile('{{ commaSeparated a true }}')({a: {alpha: true, 'bravo charlie': true}})).to.equal('Alpha, Bravo charlie');
  });
});
