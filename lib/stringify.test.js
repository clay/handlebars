'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const stringify = require('./stringify');

describe('lib/stringify', function () {
  it('is JSON.stringify for anything that has no circular reference', function () {
    [{ a: 'b' }, [1, { c: [2] }], 'text', 5, null, true, { d: undefined, e: () => 1 }, { f: new Date(0) }, undefined, { toJSON: () => 'custom' }].forEach((value) => {
      assert.equal(stringify(value), JSON.stringify(value));
    });
  });

  it('writes a reference back to the root as [Circular ~]', function () {
    const root = { name: 'root' };

    root.self = root;
    assert.equal(stringify(root), '{"name":"root","self":"[Circular ~]"}');
  });

  it('writes a reference to an inner object with the path to it', function () {
    const root = { a: { b: {} } };

    root.a.b.back = root.a;
    assert.equal(stringify(root), '{"a":{"b":{"back":"[Circular ~.a]"}}}');
  });

  it('does not mistake the same object used twice, side by side, for a circle', function () {
    const shared = { x: 1 };

    assert.equal(stringify({ a: shared, b: shared }), '{"a":{"x":1},"b":{"x":1}}');
  });
});
