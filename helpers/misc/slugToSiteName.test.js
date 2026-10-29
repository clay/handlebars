'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ slugToSiteName a }}');

describe(name, function () {
  it('returns site name from slug', function () {
    assert.equal(tpl({a: 'scienceofus'}), 'Science of Us');
  });

  it('returns comma-separated site names from comma-separated slugs', function () {
    assert.equal(tpl({a: 'di, thecut, vulture'}), 'Daily Intelligencer, The Cut, Vulture');
  });

  it('returns empty string if no site is passed in', function () {
    assert.equal(tpl({a: ''}), '');
  });
});
