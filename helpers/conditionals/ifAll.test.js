'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#ifAll a b}}yes{{else}}no{{/ifAll}}');

describe(name, function () {
  it('is true if all conditionals are truthy', function () {
    assert.equal(tpl({a: true, b: true}), 'yes');
    assert.equal(tpl({a: 'abc', b: 123}), 'yes');
  });

  it('is false if any conditionals are falsy', function () {
    assert.equal(tpl({a: true, b: false}), 'no');
    assert.equal(tpl({a: 'true', b: ''}), 'no');
    assert.equal(tpl({a: 1, b: 0}), 'no');
    assert.equal(tpl({a: undefined, b: true}), 'no');
  });
});
