'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#ifAny a b}}yes{{else}}no{{/ifAny}}');

describe(name, function () {
  it('is true if any conditionals are truthy', function () {
    assert.equal(tpl({a: true, b: true}), 'yes');
    assert.equal(tpl({a: 'abc', b: 0}), 'yes');
    assert.equal(tpl({a: undefined, b: 1}), 'yes');
  });

  it('is false if all conditionals are falsy', function () {
    assert.equal(tpl({a: false, b: false}), 'no');
    assert.equal(tpl({a: '', b: ''}), 'no');
    assert.equal(tpl({a: 0, b: 0}), 'no');
    assert.equal(tpl({a: undefined, b: null}), 'no');
  });
});
