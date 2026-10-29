'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#each (range a b) }}{{ this }}{{/each}}');

describe(name, function () {
  it('starts from 0 by default', function () {
    assert.equal(tpl({a: 5}), '01234');
  });

  it('creates a range from one number to another', function () {
    assert.equal(tpl({a: 1, b: 5}), '1234');
  });

  it('does NOT include the last number', function () {
    assert.equal(tpl({a: 1}), '0');
  });

  it('iterates through range as a block helper', function () {
    const tpl2 = hbs.compile('{{#range 1 4}}{{ this }} personal space! {{/range}}');

    assert.equal(tpl2(), '1 personal space! 2 personal space! 3 personal space! ');
  });
});

describe(name + ': what numbers it reads', function () {
  const range = require('./range');

  it('counts down when the end is below the start', function () {
    assert.deepEqual(range(5, 1, {}), [5, 4, 3, 2]);
  });

  it('starts from 0 with one argument, and gives nothing for nothing', function () {
    assert.deepEqual(range(3, {}), [0, 1, 2]);
    assert.deepEqual(range({}), []);
  });

  it('reads numbers out of strings and boxed numbers', function () {
    // (an end that is a string counts as the options, so only the start can be one with two arguments)
    assert.deepEqual(range(' 1 ', 4, {}), [1, 2, 3]);
    assert.deepEqual(range('0b10', 5, {}), [2, 3, 4]);
    assert.deepEqual(range('0o1', 3, {}), [1, 2]);
    assert.deepEqual(range({ valueOf: () => 2 }, 4, {}), [2, 3]);
    assert.deepEqual(range(new Number(1), new Number(3), {}), [1, 2]);
    assert.deepEqual(range('3', {}), [0, 1, 2]);
  });

  it('reads what is not a number as 0', function () {
    assert.deepEqual(range(NaN, 2, {}), [0, 1]);
    assert.deepEqual(range('-0x1f', 2, {}), [0, 1]);
    assert.deepEqual(range(Symbol('s'), 2, {}), [0, 1]);
    assert.deepEqual(range('abc', 2, {}), [0, 1]);
  });

  it('throws for a range that is too long to be an array', function () {
    assert.throws(() => range(0, Infinity, {}), RangeError);
  });
});
