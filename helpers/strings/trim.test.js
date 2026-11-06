'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ trim a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
  });

  it('trims leading whitespace', function () {
    assert.equal(tpl({a: '   foo'}), 'foo');
  });

  it('trims trailing whitespace', function () {
    assert.equal(tpl({a: 'foo    '}), 'foo');
  });

  it('trims both leading and trailing whitespace', function () {
    assert.equal(tpl({a: '   foo   '}), 'foo');
  });
});
