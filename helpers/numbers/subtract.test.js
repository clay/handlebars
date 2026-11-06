'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ subtract a b }}');

describe(name, function () {
  it('returns NaN if something fails', function () {
    assert.equal(tpl(), 'NaN');
  });

  it('returns the difference of two numbers', function () {
    assert.equal(tpl({a: 5, b: 3}), '2');
  });
});
