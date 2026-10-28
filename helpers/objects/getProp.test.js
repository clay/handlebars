'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  it('returns function that returns value', function () {
    assert.equal(hbs.compile('{{ join (map arr (getProp "a")) }}')({ arr: [{ a: '1' }, { a: '2' }]}), '1, 2');
  });
});
