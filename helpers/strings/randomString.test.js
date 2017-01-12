'use strict';
const name = getName(__filename);

describe(name, function () {
  it('returns random 8 character string', function () {
    expect(hbs.compile('{{ randomString }}')().length).to.equal(8);
  });

  it('adds a prefix', function () {
    expect(hbs.compile('{{ randomString a }}')({a: 'abc-'}).length).to.equal(12);
  });

  it('disregards non-string prefixes', function () {
    expect(hbs.compile('{{ randomString a }}')({a: {b: 'c'}}).length).to.equal(8);
  });
});
