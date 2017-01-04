const name = getName(__filename),
  fn = require('./' + name);

describe(`Helpers: ${name}`, function () {
  before(function () {
    hbs.registerHelper(name, fn);
  });

  after(function () {
    hbs.unregisterHelper(name);
  });

  it('compares with strict equality by default', function () {
    const tpl = hbs.compile('{{#compare a b}}yes{{else}}no{{/compare}}');

    expect(tpl(true, true)).to.equal('yes');
  });
});
