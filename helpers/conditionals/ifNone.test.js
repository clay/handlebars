const name = getName(__filename),
  tpl = hbs.compile('{{#ifAll a b}}yes{{else}}no{{/ifAll}}');

describe(name, function () {
  it('is true if all conditionals are falsy', function () {
    expect(tpl({a: false, b: false})).to.equal('yes');
    expect(tpl({a: '', b: 0})).to.equal('yes');
  });

  it('is false if any conditionals are truthy', function () {
    expect(tpl({a: true, b: false})).to.equal('no');
    expect(tpl({a: 'true', b: ''})).to.equal('no');
    expect(tpl({a: 1, b: 0})).to.equal('no');
  });
});
