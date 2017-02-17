'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ truncate str len }}'),
  tplSuffix = hbs.compile('{{ truncate str len suffix=" TBC" }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    expect(tpl()).to.equal('');
    expect(tpl({})).to.equal('');
  });

  it('does not change strings shorter than given length', function () {
    expect(tpl({str: 'foo', len: 5})).to.equal('foo');
  });

  it('does not change strings equal to given length', function () {
    expect(tpl({str: 'fooba', len: 5})).to.equal('fooba');
  });

  it('shortens strings longer than given length', function () {
    expect(tpl({str: 'foo bar bar', len: 5})).to.equal('foo b…');
  });

  it('trims whitespace when entire string is shorter than given length', function () {
    expect(tpl({str: ' fo ', len: 5})).to.equal('fo');
  });

  it('trims whitespace when non-whitespace string is shorter than given length', function () {
    expect(tpl({str: '  foo  ', len: 5})).to.equal('foo');
  });

  it('trims whitespace where non-whitespace string is longer than given length', function () {
    expect(tpl({str: ' foo bar bar ', len: 5})).to.equal('foo b…');
  });

  it('trims whitespace after truncating', function () {
    expect(tpl({str: 'foo bar bar', len: 4})).to.equal('foo…');
  });

  it('accepts a suffix to append', function () {
    expect(tplSuffix({str: 'foo bar bar', len: 5})).to.equal('foo b TBC');
  });
});
