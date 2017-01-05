const name = getName(__filename);

describe(name, function () {
  it('works like the default if helper (basic)', function () {
    const tpl = hbs.compile('{{#if a}}yes{{/if}}');

    expect(tpl({a: true})).to.equal('yes');
    expect(tpl({a: false})).to.equal('');
  });

  it('works like the default if helper (advanced)', function () {
    const tpl = hbs.compile('{{#if a}}yes{{else}}no{{/if}}');

    expect(tpl({a: true})).to.equal('yes');
    expect(tpl({a: false})).to.equal('no');
  });

  it('allows new inline behavior (basic)', function () {
    const tpl = hbs.compile('{{if a "yes"}}');

    expect(tpl({a: true})).to.equal('yes');
    expect(tpl({a: false})).to.equal('');
  });

  it('allows new inline behavior (advanced)', function () {
    const tpl = hbs.compile('{{if a "yes" else="no"}}');

    expect(tpl({a: true})).to.equal('yes');
    expect(tpl({a: false})).to.equal('no');
  });
});
