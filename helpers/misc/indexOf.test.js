'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ indexOf a b }}');

describe(name, function () {
  it('throws an error if no value passed in', function () {
    const result = function () {
      return tpl({a: null, b: null});
    };

    assert.throws(result, Error);
  });

  it('finds indexes in strings', function () {
    assert.equal(tpl({a: 'foo', b: 'f'}), '0');
  });

  it('finds indexes in arrays', function () {
    assert.equal(tpl({a: ['f', 'o', 'o'], b: 'f'}), '0');
  });
});
