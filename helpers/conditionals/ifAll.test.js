const name = getName(__filename),
  tpl = hbs.compile('{{#ifAll a b}}yes{{else}}no{{/ifAll}}');

describe(name, function () {
  it('is true if all conditionals are truthy', function () {
    expect(tpl({a: true, b: true})).to.equal('yes');
    expect(tpl({a: 'abc', b: 123})).to.equal('yes');
  });

  it('is false if any conditionals are falsy', function () {
    expect(tpl({a: true, b: false})).to.equal('no');
    expect(tpl({a: 'true', b: ''})).to.equal('no');
    expect(tpl({a: 1, b: 0})).to.equal('no');
  });
});
