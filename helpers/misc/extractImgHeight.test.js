'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ extractImgHeight a }}');

describe(name, function () {
  it('returns empty string if there is no url', function () {
    expect(tpl({a: ''})).to.equal('');
  });

  it('returns the image height', function () {
    expect(tpl({a: 'http://pixel.nymag.com/imgs/daily/science/2017/03/30/30-lying.w710.h473.2x.jpg'})).to.equal('946');
  });

});
