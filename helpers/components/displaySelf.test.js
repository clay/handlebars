const name = getName(__filename),
  tpl = hbs.compile('{{#each (displaySelf a) }}{{ text }}{{/each}}');

describe(name, function () {
  it('displays the first item', function () {
    expect(tpl({a: [{ displaySelf: true, text: '1' }, { displaySelf: true, text: '2' }]})).to.equal('1');
  });

  it('only looks at the displaySelf property', function () {
    expect(tpl({a: [{ displaySelf: false, text: '1' }, { displaySelf: true, text: '2' }]})).to.equal('2');
  });
});
