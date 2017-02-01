'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ lowercase a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
  });

  it('returns emptystring if non-string passed in', function () {
    expect(tpl({a: 123})).to.equal('');
  });

  it('lower cases a string', function () {
    expect(tpl({a: 'Per un Pugno di Dollari'})).to.equal('per un pugno di dollari');
  });
});
