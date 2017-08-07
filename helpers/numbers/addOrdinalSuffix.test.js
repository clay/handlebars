'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ addOrdinalSuffix a }}');

describe(name, function () {
  it('fails gracefully', function () {
    expect(tpl({a: 'foo'})).to.equal('foo');
  });

  it('should return a number with an ordinal on the end', function () {
    expect(tpl({a: 1})).to.equal('1st');
  });

  it('should return an empty string if no number is provided', function () {
    expect(tpl({a: ''})).to.equal('');
  });

  it('should work for string numbers', function () {
    expect(tpl({ a: '1' })).to.equal('1st');
  });

  it('should work for numbers ending in 0', function () {
    expect(tpl({ a: 0 })).to.equal('0th'); // yes, that's correct
    expect(tpl({ a: 10 })).to.equal('10th');
    expect(tpl({ a: 20 })).to.equal('20th');
  });

  it('should work for numbers ending in 1', function () {
    expect(tpl({ a: 1 })).to.equal('1st');
    expect(tpl({ a: 11 })).to.equal('11th');
    expect(tpl({ a: 21 })).to.equal('21st');
  });

  it('should work for numbers ending in 2', function () {
    expect(tpl({ a: 2 })).to.equal('2nd');
    expect(tpl({ a: 12 })).to.equal('12th');
    expect(tpl({ a: 22 })).to.equal('22nd');
  });

  it('should work for numbers ending in 3', function () {
    expect(tpl({ a: 3 })).to.equal('3rd');
    expect(tpl({ a: 13 })).to.equal('13th');
    expect(tpl({ a: 23 })).to.equal('23rd');
  });

  it('should work for numbers ending in 4 and above', function () {
    expect(tpl({ a: 4 })).to.equal('4th');
    expect(tpl({ a: 14 })).to.equal('14th');
    expect(tpl({ a: 24 })).to.equal('24th');
  });
});
