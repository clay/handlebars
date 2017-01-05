const name = getName(__filename);

describe(name, function () {
  it('compares with strict equality by default', function () {
    const tpl = hbs.compile('{{#compare a b}}yes{{else}}no{{/compare}}');

    expect(tpl(true, true)).to.equal('yes');
  });
});
