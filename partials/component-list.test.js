const name = getName(__filename),
  tpl = hbs.compile('{{> component-list a }}');

describe(name, function () {
  it('returns empty string if array is empty', function () {
    expect(tpl({ a: [] })).to.equal('');
  });

  it('embeds components based on refs', function () {
    hbs.registerPartial('a', 'a');
    hbs.registerPartial('b', 'b');

    expect(tpl({ a: [{ _ref: '/components/a' }, { _ref: '/components/b' }]})).to.equal('ab');
  });

  it('throws error if component partial is not found', function () {
    const result = function () {
      return tpl({ a: [{ _ref: '/components/c' }]});
    };

    expect(result).to.throw(Error);
  });
});
