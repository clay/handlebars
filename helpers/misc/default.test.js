'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ default a b }}');

describe(name, function () {
  it('returns the first value if non-empty', function () {
    assert.equal(tpl({a: 'yes', b: 'no'}), 'yes');
    assert.equal(tpl({a: [''], b: 'no'}), ''); // array has items
    assert.equal(tpl({a: { foo: '' }, b: 'no'}), '[object Object]'); // object has property
    assert.equal(tpl({a: 1, b: 'no'}), '1');
    assert.equal(tpl({a: true, b: 'no'}), 'true');
  });

  it('returns the second value if empty', function () {
    assert.equal(tpl({a: '', b: 'no'}), 'no');
    assert.equal(tpl({a: [], b: 'no'}), 'no');
    assert.equal(tpl({a: {}, b: 'no'}), 'no');
    assert.equal(tpl({a: 0, b: 'no'}), 'no');
    assert.equal(tpl({a: false, b: 'no'}), 'no');
  });

  // test below is a regression test from handlebars-helpers
  it('should fallback to the default value when no value exists', function () {
    assert.equal(tpl({a: null, b: 'no'}), 'no');
    assert.equal(tpl({a: undefined, b: 'no'}), 'no');
    assert.equal(tpl({b: 'no'}), 'no');
  });
});
