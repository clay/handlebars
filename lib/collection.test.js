'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { toList, entries, isArrayLike } = require('./collection');

describe('lib/collection', function () {
  it('toList gives the items of an array or string, the values of an object, and nothing for the rest', function () {
    assert.deepEqual(toList([1, 2]), [1, 2]);
    assert.deepEqual(toList('ab'), ['a', 'b']);
    assert.deepEqual(toList({ a: 1, b: 2 }), [1, 2]);
    assert.deepEqual(toList({ length: 2, 0: 'x', 1: 'y' }), ['x', 'y']);
    assert.deepEqual(toList(null), []);
    assert.deepEqual(toList(undefined), []);
    assert.deepEqual(toList(5), []);
    assert.deepEqual(toList(new Map([[1, 2]])), []);
  });

  it('toList visits the holes of a sparse array, as undefined', function () {
    const sparse = [];

    sparse[1] = 1;
    assert.deepEqual(toList(sparse), [undefined, 1]);
    assert.equal(toList(new Array(2)).length, 2);
  });

  it('entries gives key and value pairs, with indexes for an array', function () {
    assert.deepEqual(entries(['a', 'b']), [[0, 'a'], [1, 'b']]);
    assert.deepEqual(entries({ a: 1, b: 2 }), [['a', 1], ['b', 2]]);
    assert.deepEqual(entries(null), []);
  });

  it('isArrayLike wants a valid length, and no function', function () {
    assert.equal(isArrayLike([]), true);
    assert.equal(isArrayLike('abc'), true);
    assert.equal(isArrayLike({ length: 0 }), true);
    assert.equal(isArrayLike({ length: -1 }), false);
    assert.equal(isArrayLike({ length: 1.5 }), false);
    assert.equal(isArrayLike(() => 1), false);
    assert.equal(isArrayLike(null), false);
  });
});
