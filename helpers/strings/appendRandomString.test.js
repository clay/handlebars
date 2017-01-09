const name = getName(__filename);

describe(name, function () {
  it('appends 7 random characters to a string', function () {
    expect(hbs.compile('{{ appendRandomString a }}')({a: 'abc-'}).length).to.equal(11);
  });

  it('defaults to returning 7 characters', function () {
    expect(hbs.compile('{{ appendRandomString }}')().length).to.equal(7);
  });
});
