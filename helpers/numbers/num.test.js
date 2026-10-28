'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ num a }}');

describe(name, function () {
  it('passes through numbers', function () {
    assert.equal(tpl({a: 123}), '123');
  });

  it('parses strings', function () {
    assert.equal(tpl({a: '123'}), '123');
  });

  it('returns NaN for unparsable values', function () {
    assert.equal(tpl({a: []}), 'NaN');
  });
});
