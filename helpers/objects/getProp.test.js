'use strict';
const name = getName(__filename);

describe(name, function () {
  it('returns function that returns value', function () {
    expect(hbs.compile('{{ join (map arr (getProp "a")) }}')({ arr: [{ a: '1' }, { a: '2' }]})).to.equal('1, 2');
  });
});
