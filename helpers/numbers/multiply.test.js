'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ multiply a b }}');

describe(name, function () {
  it('returns NaN if args are undefined', function () {
    assert.equal(tpl(), 'NaN');
  });

  it('returns NaN if arguments are not numbers', function () {
    assert.equal(tpl({a: '1', b: 'ok'}), 'NaN');
    assert.equal(tpl({a: 'bad', b: '123'}), 'NaN');
  });

  it('returns the product of two factors', function () {
    assert.equal(tpl({a: 10, b: 10}), '100');
  });
});
