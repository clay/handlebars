'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ concat a b c }}');

describe(name, function () {
  it('concats two strings', function () {
    assert.equal(tpl({a: 'a', b: 'b'}), 'ab');
  });

  it('concats more than two strings', function () {
    assert.equal(tpl({a: 'a', b: 'b', c: 'c'}), 'abc');
  });

  it('coerces to string', function () {
    assert.equal(tpl({a: 1, b: 2}), '12');
  });
});
