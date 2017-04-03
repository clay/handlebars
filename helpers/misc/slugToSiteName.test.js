'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ slugToSiteName a }}');

describe(name, function () {
  it('returns site name from slug', function () {
    expect(tpl({a: 'scienceofus'})).to.equal('Science of Us');
  });

  it('returns comma-separated site names from comma-separated slugs', function () {
    expect(tpl({a: 'di, thecut, vulture'})).to.equal('Daily Intelligencer, The Cut, Vulture');
  });

  it('returns empty string if no site is passed in', function () {
    expect(tpl({a: ''})).to.equal('');
  });
});
