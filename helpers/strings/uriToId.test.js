'use strict';
const name = getName(__filename);

describe(name, function () {
  it('returns the last part of a URI', function () {
    expect(hbs.compile('{{ uriToId "a/b/c"}}')()).to.equal('c');
  });
  it('throws an error if not given string', function () {
    expect(() => hbs.compile('{{ uriToId }}')()).to.throw(Error);
  });
});
