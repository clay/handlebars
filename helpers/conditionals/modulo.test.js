const name = getName(__filename),
  tpl = hbs.compile('{{modulo a b c}}'),
  tpl2 = hbs.compile('{{#modulo a b c}}yes{{else}}no{{/modulo}}');

describe(name, function () {
  it('inline returns true', function () {
    expect(tpl({a: 3, b: 2, c: 1})).to.equal('true');
  });

  it('inline returns emptystring', function () {
    expect(tpl({a: 3, b: 2, c: 2})).to.equal('');
  });

  it('block returns yes', function () {
    expect(tpl2({a: 3, b: 2, c: 1})).to.equal('yes');
  });

  it('block returns no', function () {
    expect(tpl2({a: 3, b: 2, c: 2})).to.equal('no');
  });
});
