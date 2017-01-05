const name = getName(__filename);

describe(name, function () {
  it('compares with strict equality by default', function () {
    const tpl = hbs.compile('{{#compare a b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: true, b: true })).to.equal('yes');
  });

  it('compares equality', function () {
    const tpl = hbs.compile('{{#compare a "===" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 2 })).to.equal('no');
    expect(tpl({ a: 1, b: 1 })).to.equal('yes');
  });

  it('compares inequality', function () {
    const tpl = hbs.compile('{{#compare a "!==" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 2 })).to.equal('yes');
    expect(tpl({ a: 1, b: 1 })).to.equal('no');
  });

  it('compares greater than', function () {
    const tpl = hbs.compile('{{#compare a ">" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 2 })).to.equal('no');
    expect(tpl({ a: 2, b: 1 })).to.equal('yes');
  });

  it('compares less than', function () {
    const tpl = hbs.compile('{{#compare a "<" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 2 })).to.equal('yes');
    expect(tpl({ a: 2, b: 1 })).to.equal('no');
  });

  it('compares greater than or equal', function () {
    const tpl = hbs.compile('{{#compare a ">=" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 2, b: 2 })).to.equal('yes');
    expect(tpl({ a: 2, b: 1 })).to.equal('yes');
    expect(tpl({ a: 1, b: 2 })).to.equal('no');
  });

  it('compares less than or equal', function () {
    const tpl = hbs.compile('{{#compare a "<=" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 2 })).to.equal('yes');
    expect(tpl({ a: 2, b: 2 })).to.equal('yes');
    expect(tpl({ a: 2, b: 1 })).to.equal('no');
  });

  it('compares typeof', function () {
    const tpl = hbs.compile('{{#compare a "typeof" b}}yes{{else}}no{{/compare}}');

    expect(tpl({ a: 1, b: 'number' })).to.equal('yes');
    expect(tpl({ a: 'foo', b: 'string' })).to.equal('yes');
    expect(tpl({ a: {}, b: 'string' })).to.equal('no');
  });
});
