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
});
