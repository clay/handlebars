'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ setID "abc" }}{{ id }}');

describe(name, function () {
  it('sets an id on the current context', function () {
    expect(tpl({})).to.equal('abc');
  });

  it('overrides an already-set id on the current context', function () {
    expect(tpl({ id: 'def' })).to.equal('abc');
  });
});
