'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { get, set } = require('./path'),
  lodashGet = require('lodash/get'),
  lodashSet = require('lodash/set');

// get and set are what lodash's are (the getProp and set helpers have always been lodash's): besides the cases written out
// below, they are compared with lodash on a few hundred combinations of objects and paths.

describe('lib/path', function () {
  describe('get', function () {
    const object = { a: { b: [1, { c: 2 }] }, 'x.y': 5, 'q[0]': 'quoted', '': 'empty', n: null, u: undefined, 0: 'zero' };

    it('reads a key, a dotted path and a bracketed index', function () {
      assert.equal(get(object, 'a'), object.a);
      assert.equal(get(object, 'a.b[1].c'), 2);
      assert.equal(get(object, 'a.b.0'), 1);
      assert.equal(get(object, 'a["b"][1]["c"]'), 2);
    });

    it('reads a key that has a dot in it, when the object has that key', function () {
      assert.equal(get(object, 'x.y'), 5);
      assert.equal(get(object, 'q[0]'), 'quoted');
    });

    it('reads an array of keys, a number and the empty key', function () {
      assert.equal(get(object, ['a', 'b', 1, 'c']), 2);
      assert.equal(get(object, 0), 'zero');
      assert.equal(get(object, ''), 'empty');
    });

    it('gives undefined for what is not there, through null, and for an empty path', function () {
      assert.equal(get(object, 'a.z.c'), undefined);
      assert.equal(get(object, 'n.x'), undefined);
      assert.equal(get(object, []), undefined);
      assert.equal(get(null, 'a'), undefined);
      assert.equal(get(undefined, Object.create(null)), undefined);
    });

    it('is lodash.get', function () {
      const objects = [object, [1, [2, 3]], 'string', 5, null, undefined, { a: [{ b: { c: [0, 1] } }] }, Object.create({ inherited: 1 }), new Map([[1, 2]])],
        paths = ['a', 'a.b', 'a.b[1].c', 'a.b.1.c', 'a[b]', 'a..b', '.a', 'a.', '[0]', '0', '[0][1]', '0.1', 'length', 'inherited', '', '.', '[]', 'a["b"]', 'a[\'b\']', 'a[-1]', 'a[1.5]',
          'x.y', 'q[0]', ['a', 'b'], ['a.b'], [0, 1], -0, 0, 1, true, null, undefined, NaN, {}, 'a[\\"b\\"]', 'toString', '__proto__', 'constructor.name'];

      objects.forEach(o => paths.forEach(p => {
        assert.deepEqual(get(o, p), lodashGet(o, p), `get(${JSON.stringify(o)}, ${JSON.stringify(p)})`);
      }));
    });
  });

  describe('set', function () {
    it('sets a key, creating objects and, for an index, arrays on the way', function () {
      const object = {};

      set(object, 'a.b.c', 1);
      set(object, 'list[1].name', 'x');
      assert.deepEqual(object.a, { b: { c: 1 } });
      assert.ok(Array.isArray(object.list));
      assert.equal(object.list.length, 2);
      assert.deepEqual(object.list[1], { name: 'x' });
    });

    it('returns the object, and anything that is not an object as it is', function () {
      const object = {};

      assert.equal(set(object, 'a', 1), object);
      assert.equal(set(null, 'a', 1), null);
      assert.equal(set('text', 'a', 1), 'text');
      assert.equal(set(5, 'a', 1), 5);
    });

    it('does not set through __proto__, constructor or prototype', function () {
      const object = {};

      set(object, '__proto__.polluted', true);
      set(object, 'constructor.prototype.polluted', true);
      assert.equal({}.polluted, undefined);
      assert.equal(Object.keys(object).length, 0);
    });

    it('leaves a frozen object as it is, without throwing', function () {
      const frozen = Object.freeze({ a: 1 });

      assert.equal(set(frozen, 'a', 2), frozen);
      assert.equal(set(frozen, 'b.c', 2), frozen);
      assert.deepEqual(frozen, { a: 1 });
    });

    it('is lodash.set', function () {
      const starts = [() => ({}), () => ({ a: 1 }), () => ({ a: { b: 1 } }), () => ({ a: [1, 2] }), () => [], () => [1], () => ({ 'x.y': 1 }), () => Object.freeze({ a: 1 }), () => Object.seal({ a: {} }), () => 'text', () => null, () => new Map()],
        paths = ['a', 'a.b', 'a.b.c', 'a[0]', 'a[2].b', '[0]', '0', '0.a', 'x.y', 'x.y.z', '', 'a..b', ['a', 'b'], ['a', 0], 'a.0.b', 1, true, '__proto__.x', 'constructor.x', 'a.prototype.x', 'length', 'a[-1]', 'a[1.5]'],
        values = [1, undefined, null, { v: 1 }];

      starts.forEach(start => paths.forEach(p => values.forEach(v => {
        const mine = start(), theirs = start(), label = `set(${JSON.stringify(start())}, ${JSON.stringify(p)}, ${JSON.stringify(v)})`,
          outcome = (fn, target) => { try { return fn(target, p, v) === target ? 'returned the target' : 'returned something else'; } catch (e) { return e.constructor.name; } };

        // the same result, or the same error (setting an array's length to an object throws in both)
        assert.equal(outcome(set, mine), outcome(lodashSet, theirs), label);
        assert.deepEqual(mine, theirs, label);
      })));
    });
  });
});
