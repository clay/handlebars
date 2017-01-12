'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ longestWord a }}');

describe(name, function () {
  it('throws error if non-string passed in', function () {
    const result = function () {
      return tpl();
    };

    expect(result).to.throw(Error);
  });

  it('returns 0 if there are no words', function () {
    expect(tpl({a: '   '})).to.equal('0');
  });

  it('returns length of longest word', function () {
    expect(tpl({a: 'Foo Ba b'})).to.equal('3');
  });
});
