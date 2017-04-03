'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ extractImgWidth a }}');

describe(name, function () {
  it('returns empty string if there is no url', function () {
    expect(tpl({a: ''})).to.equal('');
  });

  it('returns the image width', function () {
    expect(tpl({a: 'http://pixel.nymag.com/imgs/daily/science/2017/03/30/30-lying.w710.h473.2x.jpg'})).to.equal('1420');
  });

  it('uses default multiplier of 1 when multiplier is not included in the link', function () {
    expect(tpl({a: 'http://pixel.nymag.com/imgs/daily/science/2017/03/31/31-pitbull.w710.h473.jpg'})).to.equal('710');
  });

  it('returns empty string on a non-mediaplay image', function () {
    expect(tpl({a: 'https://www.w3schools.com/css/img_fjords.jpg'})).to.equal('');
  });
});
