'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ join (map a (getProp "a")) }}');

describe(name, function () {
  it('returns empty array if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
    assert.equal(tpl({a: []}), '');
  });

  it('should map the items in the array and return new values', function () {
    assert.equal(tpl({a: [{ a: '1' }, { a: '2' }]}), '1, 2');
  });

  it('should work with a string value', function () {
    assert.equal(hbs.compile('{{ join (map a double) " " }}')({a: 'abc', double: (a) => a + a}), 'aa bb cc');
  });
});

describe(name + ': without a function', function () {
  const map = require('./map');

  it('reads a property of each item when given a name or a path', function () {
    assert.deepEqual(map([{ a: 1 }, { a: 2 }], 'a'), [1, 2]);
    assert.deepEqual(map([{ a: { b: 'x' } }, {}], 'a.b'), ['x', undefined]);
  });

  it('keeps the items when given nothing to do with them', function () {
    assert.deepEqual(map([1, 2]), [1, 2]);
    assert.deepEqual(map([1, 2], { hash: {} }), [1, 2]); // what a template gives it when it passes no function
  });

  it('goes through the characters of a string, and gives [] for anything else', function () {
    assert.deepEqual(map('ab', x => x + x), ['aa', 'bb']);
    assert.deepEqual(map(5, x => x), []);
    assert.deepEqual(map(null, x => x), []);
  });
});
