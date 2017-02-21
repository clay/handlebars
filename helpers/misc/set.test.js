'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ set "id" "abc" }}{{ id }}');

describe(name, function () {
  it('sets a property on the current context', function () {
    expect(tpl({})).to.equal('abc');
  });

  it('overrides an already-set property on the current context', function () {
    expect(tpl({ id: 'def' })).to.equal('abc');
  });

  it('allows deep path setting', function () {
    expect(hbs.compile('{{ set "a.b.c" "abc" }}{{ a.b.c }}')({})).to.equal('abc');
  });

  it('accepts an optional context', function () {
    expect(hbs.compile('{{ set this "id" "xyz" }}{{ id }}')({})).to.equal('xyz');
  });
});
