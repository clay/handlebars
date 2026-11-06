'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ round x direction }}');

describe(name, function () {
  it('fails gracefully', function () {
    assert.equal(tpl({x: 'foo'}), 'foo');
  });

  it('handles numbers and strings', function () {
    assert.equal(tpl({x: '99.9'}), '100');
    assert.equal(tpl({x: 99.9}), '100');
  });

  it('rounds down for numbers with fractional portions less than 0.5', function () {
    assert.equal(tpl({x: 1.499}), '1');
  });

  it('rounds up for numbers with fractional portions greater than 0.5', function () {
    assert.equal(tpl({x: 1.51}), '2');
  });

  it('rounds up for numbers with fractional portions equal to 0.5', function () {
    assert.equal(tpl({x: 1.5}), '2');
  });

  it('always rounds up when given the option "up"', function () {
    assert.equal(tpl({x: 1.01, direction: 'up'}), '2');
  });

  it('always rounds down when given the option "down"', function () {
    assert.equal(tpl({x: 1.99, direction: 'down'}), '1');
  });
});
