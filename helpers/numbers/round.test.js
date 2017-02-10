'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ round x }}');

describe(name, function () {
  it('fails gracefully', function () {
    expect(tpl({x: 'foo'})).to.equal('foo');
  });

  it('handles numbers and strings', function () {
    expect(tpl({x: '99.9'})).to.equal('100');
    expect(tpl({x: 99.9})).to.equal('100');
  });

  it('rounds down for numbers with fractional portions less than 0.5', function () {
    expect(tpl({x: 1.499})).to.equal('1');
  });

  it('rounds up for numbers with fractional portions greater than 0.5', function () {
    expect(tpl({x: 1.51})).to.equal('2');
  });

  it('rounds up for numbers with fractional portions equal to 0.5', function () {
    expect(tpl({x: 1.5})).to.equal('2');
  });
});
