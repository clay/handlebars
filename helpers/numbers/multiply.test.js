'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ multiply a b }}');

describe(name, function () {
  it('returns NaN if args are undefined', function () {
    expect(tpl()).to.equal('NaN');
  });

  it('returns NaN if arguments are not numbers', function () {
    expect(tpl({a: '1', b: 'ok'})).to.equal('NaN');
    expect(tpl({a: 'bad', b: '123'})).to.equal('NaN');
  });

  it('returns the product of two factors', function () {
    expect(tpl({a: 10, b: 10})).to.equal('100');
  });
});
