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

  it('returns NaN for unparsable values', function () {
    expect(tpl({a: []})).to.equal('NaN');
  });
});
