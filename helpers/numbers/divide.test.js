'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ divide a b }}');

describe(name, function () {
  it('returns NaN if args are undefined', function () {
    assert.equal(tpl(), 'NaN');
  });

  it('returns NaN if arguments are not numbers', function () {
    assert.equal(tpl({a: '1', b: 'ok'}), 'NaN');
    assert.equal(tpl({a: 'bad', b: '123'}), 'NaN');
  });

  it('returns the result of dividing the first number by the second number', function () {
    assert.equal(tpl({a: 100, b: 25}), '4');
  });
});
