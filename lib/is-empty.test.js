'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const isEmpty = require('./is-empty'),
  lodashIsEmpty = require('lodash/isEmpty');

describe('lib/is-empty', function () {
  it('is empty for nothing, empty lists and objects without own properties', function () {
    [null, undefined, '', [], {}, new Map(), new Set(), Object.create(null), new Uint8Array(0), Buffer.alloc(0), (function () { return arguments; }())].forEach((value) => {
      assert.equal(isEmpty(value), true, String(Object.prototype.toString.call(value)));
    });
  });

  it('is not empty for what holds something', function () {
    [' ', 'a', [0], [undefined], { a: undefined }, new Map([[1, 2]]), new Set([1]), new Uint8Array(1), { length: 1 }, new String('a')].forEach((value) => {
      assert.equal(isEmpty(value), false);
    });
  });

  it('counts own enumerable properties only', function () {
    assert.equal(isEmpty(Object.create({ inherited: 1 })), true);
    assert.equal(isEmpty({ [Symbol('s')]: 1 }), true);
    assert.equal(isEmpty(Object.defineProperty({}, 'hidden', { value: 1 })), true);
  });

  it('calls a Date and a function empty (which is why the default helper replaces them), like lodash always did', function () {
    assert.equal(isEmpty(new Date()), true);
    assert.equal(isEmpty(() => 1), true);
    assert.equal(isEmpty(/a/), true);
  });

  it('is lodash.isEmpty', function () {
    const values = [null, undefined, true, false, 0, 1, NaN, '', 'a', [], [1], new Array(2), {}, { a: 1 }, new Map(), new Map([[1, 1]]), new Set(), new Date(), () => {}, /x/, Symbol('s'), new Error('e'), Object.create(null),
      Object.prototype, Array.prototype, { constructor: 1 }, { length: 0 }, { length: 2 }, { length: -1 }, new Number(1), new String(''), Buffer.from('a'), new Uint8Array(2), new DataView(new ArrayBuffer(2)), { splice: () => {} }, class A {}];

    values.forEach(value => assert.equal(isEmpty(value), lodashIsEmpty(value), `isEmpty(${String(Object.prototype.toString.call(value))} ${String(value && value.toString && typeof value !== 'symbol' ? value : 'x')})`));
  });
});
