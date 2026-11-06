'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ toK a }}');

describe(name, function () {
  it('fails gracefully', function () {
    assert.equal(tpl({a: 'foo'}), 'foo');
  });

  it('passes through sub-1000 numbers', function () {
    assert.equal(tpl({a: 999}), '999');
  });

  it('handles numbers and strings', function () {
    assert.equal(tpl({a: '1000'}), '1k');
    assert.equal(tpl({a: 1000}), '1k');
  });

  it('converts large numbers', function () {
    assert.equal(tpl({a: 100000}), '100k');
  });

  it('handles non-interger values', function () {
    assert.equal(tpl({a: 1234.5}), '1.2k');
  });
});
