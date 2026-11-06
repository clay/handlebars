'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ random a b }}'),
  wrap = function (a, b) {
    return function () {
      return tpl({a,b});
    };
  };

describe(name, function () {
  it('should return a random number between two values', function () {
    assert.ok(tpl({a: 5, b: 10}) >= 5 && tpl({a: 5, b: 10}) <= 10);
  });
  it('throws error if passed values that are not numeric or finite', function () {
    assert.throws(wrap(0, Infinity), Error);
    assert.throws(wrap('a','b'), Error);
    assert.throws(wrap({},{}), Error);
    assert.throws(wrap(null, null), Error);
    assert.throws(wrap(undefined, undefined), Error);
  });
});
