'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ join a b }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
    assert.equal(tpl({a: []}), '');
  });

  it('should join items by the default separator', function () {
    assert.equal(tpl({a: ['a', 'b', 'c']}), 'a, b, c');
  });

  it('should join by a custom separator', function () {
    assert.equal(tpl({a: ['a', 'b', 'c'], b: ' | '}), 'a | b | c');
  });
});
