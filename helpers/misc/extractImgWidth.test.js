'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ extractImgWidth a }}');

describe(name, function () {
  it('returns empty string if there is no url', function () {
    assert.equal(tpl({a: ''}), '');
  });

  it('returns the image width', function () {
    assert.equal(tpl({a: 'http://pixel.nymag.com/imgs/daily/science/2017/03/30/30-lying.w710.h473.2x.jpg'}), '1420');
  });

  it('uses default multiplier of 1 when multiplier is not included in the link', function () {
    assert.equal(tpl({a: 'http://pixel.nymag.com/imgs/daily/science/2017/03/31/31-pitbull.w710.h473.jpg'}), '710');
  });

  it('returns empty string on a non-mediaplay image', function () {
    assert.equal(tpl({a: 'https://www.w3schools.com/css/img_fjords.jpg'}), '');
  });
});
