'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#unlessAll a b}}yes{{else}}no{{/unlessAll}}');

describe(name, function () {
  it('is false if all conditionals are truthy', function () {
    assert.equal(tpl({a: true, b: true}), 'no');
    assert.equal(tpl({a: 'abc', b: 123}), 'no');
  });

  it('is true if any conditionals are falsy', function () {
    assert.equal(tpl({a: true, b: false}), 'yes');
    assert.equal(tpl({a: 'true', b: ''}), 'yes');
    assert.equal(tpl({a: 1, b: 0}), 'yes');
    assert.equal(tpl({a: undefined, b: true}), 'yes');
  });
});
