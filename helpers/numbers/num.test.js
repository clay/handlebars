'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ num a }}');

describe(name, function () {
  it('passes through numbers', function () {
    expect(tpl({a: 123})).to.equal('123');
  });

  it('parses strings', function () {
    expect(tpl({a: '123'})).to.equal('123');
  });

  it('throws error if it cannot parse', function () {
    const result = function () {
      return tpl({a: []});
    };

    expect(result).to.throw(Error);
  });
});
