const name = getName(__filename),
  tpl = hbs.compile('{{#ifAny a b}}yes{{else}}no{{/ifAny}}');

describe(name, function () {
  it('is true if any conditionals are truthy', function () {
    expect(tpl({a: true, b: true})).to.equal('yes');
    expect(tpl({a: 'abc', b: 0})).to.equal('yes');
  });

  it('is false if all conditionals are falsy', function () {
    expect(tpl({a: false, b: false})).to.equal('no');
    expect(tpl({a: '', b: ''})).to.equal('no');
    expect(tpl({a: 0, b: 0})).to.equal('no');
  });
});
