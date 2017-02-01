'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ replace str a b }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
  });

  it('should replace occurrences of string "A" with string "B"', function () {
    expect(tpl({str: 'Bender Bending Rodriguez', a: 'B', b: 'M'})).to.equal('Mender Mending Rodriguez');
  });

  it('should return the string if `a` is undefined', function () {
    expect(tpl({str: 'a b c'})).to.equal('a b c');
  });

  it('should replace the string with "" if `b` is undefined', function () {
    expect(tpl({str: 'a b c', a: 'a'})).to.equal(' b c');
  });
});
