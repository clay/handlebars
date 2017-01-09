const name = getName(__filename),
  tpl = hbs.compile('{{#each (displaySelfAll a) }}{{ text }}{{/each}}');

describe(name, function () {
  it('displays all items where displaySelf is truthy', function () {
    expect(tpl({a: [{ displaySelf: true, text: '1' }, { displaySelf: true, text: '2' }]})).to.equal('12');
  });

  it('displays only items where displaySelf is truthy', function () {
    expect(tpl({a: [{ displaySelf: false, text: '1' }, { displaySelf: true, text: '2' }]})).to.equal('2');
  });
});
