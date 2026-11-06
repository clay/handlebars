'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ addCommas a }}');

describe(name, function () {
  it('fails gracefully', function () {
    assert.equal(tpl({a: 'foo'}), 'foo');
  });

  it('should pass through numbers that do not need commas', function () {
    assert.equal(tpl({a: 123}), '123');
  });

  it('should pass through decimals (tens place) that do not need commas', function () {
    assert.equal(tpl({a: 123.4}), '123.4');
  });

  it('should pass through decimals (hundreds place) that do not need commas', function () {
    assert.equal(tpl({a: '123.40'}), '123.40'); // preserve zero by passing as a string
    assert.equal(tpl({a: 123.45}), '123.45');
  });

  it('should add commas to intergers', function () {
    assert.equal(tpl({a: 1234}), '1,234');
  });

  it('should add commas to decimals (tens place)', function () {
    assert.equal(tpl({a: 1234.5}), '1,234.5');
  });

  it('should add commas to decimals (hundreds place)', function () {
    assert.equal(tpl({a: '1234.50'}), '1,234.50');
    assert.equal(tpl({a: 1234.56}), '1,234.56');
  });
});

describe(name + ': edge cases', function () {
  const addCommas = require('./addCommas');

  it('handles negative numbers, and numbers without a thousand', function () {
    assert.equal(addCommas(-1234567), '-1,234,567');
    assert.equal(addCommas('-999'), '-999');
    assert.equal(addCommas(0), '0');
  });

  it('keeps the decimals of a string as they are', function () {
    assert.equal(addCommas('1234567.890'), '1,234,567.890');
    assert.equal(addCommas('1234.'), '1,234');
  });

  it('gives 0.00 for an empty string, and throws for nothing', function () {
    assert.equal(addCommas(''), '0.00');
    assert.throws(() => addCommas(undefined), TypeError);
    assert.throws(() => addCommas(null), TypeError);
  });
});
