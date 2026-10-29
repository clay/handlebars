'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ addOrdinalSuffix a }}');

describe(name, function () {
  it('fails gracefully', function () {
    assert.equal(tpl({a: 'foo'}), 'foo');
  });

  it('should return a number with an ordinal on the end', function () {
    assert.equal(tpl({a: 1}), '1st');
  });

  it('should return an empty string if no number is provided', function () {
    assert.equal(tpl({a: ''}), '');
  });

  it('should work for string numbers', function () {
    assert.equal(tpl({ a: '1' }), '1st');
  });

  it('should work for numbers ending in 0', function () {
    assert.equal(tpl({ a: 0 }), '0th'); // yes, that's correct
    assert.equal(tpl({ a: 10 }), '10th');
    assert.equal(tpl({ a: 20 }), '20th');
  });

  it('should work for numbers ending in 1', function () {
    assert.equal(tpl({ a: 1 }), '1st');
    assert.equal(tpl({ a: 11 }), '11th');
    assert.equal(tpl({ a: 21 }), '21st');
  });

  it('should work for numbers ending in 2', function () {
    assert.equal(tpl({ a: 2 }), '2nd');
    assert.equal(tpl({ a: 12 }), '12th');
    assert.equal(tpl({ a: 22 }), '22nd');
  });

  it('should work for numbers ending in 3', function () {
    assert.equal(tpl({ a: 3 }), '3rd');
    assert.equal(tpl({ a: 13 }), '13th');
    assert.equal(tpl({ a: 23 }), '23rd');
  });

  it('should work for numbers ending in 4 and above', function () {
    assert.equal(tpl({ a: 4 }), '4th');
    assert.equal(tpl({ a: 14 }), '14th');
    assert.equal(tpl({ a: 24 }), '24th');
  });
});

describe(name + ': what it is given', function () {
  const addOrdinalSuffix = require('./addOrdinalSuffix');

  it('gives a string, not a String object, for what is not a number', function () {
    ['', 'abc', undefined, NaN].forEach((value) => {
      assert.equal(typeof addOrdinalSuffix(value), 'string');
      assert.equal(addOrdinalSuffix(value), String(value));
    });
  });

  it('follows the rule for the teens and for the last digit, in numbers and numeric strings', function () {
    assert.deepEqual([1, 2, 3, 4, 11, 12, 13, 21, 22, 23, 101, 111, 112, 113, '22', 0, -1, 1.5].map(addOrdinalSuffix),
      ['1st', '2nd', '3rd', '4th', '11th', '12th', '13th', '21st', '22nd', '23rd', '101st', '111th', '112th', '113th', '22nd', '0th', '-1th', '1.5th']);
  });
});
