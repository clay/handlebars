'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ removeSpaces a }}');

describe(name, function () {
  it('returns empty string if undefined', function () {
    assert.equal(tpl(), '');
  });

  it('removes spaces in a string', function () {
    assert.equal(tpl({a: 'foo bar baz'}), 'foobarbaz');
  });

  it('returns the same string if there are no spaces', function () {
    assert.equal(tpl({a: 'abc'}), 'abc');
  });
});
