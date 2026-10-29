'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#ifNone a b}}yes{{else}}no{{/ifNone}}');

describe(name, function () {
  it('is true if all conditionals are falsy', function () {
    assert.equal(tpl({a: false, b: false}), 'yes');
    assert.equal(tpl({a: '', b: 0}), 'yes');
    assert.equal(tpl({a: undefined, b: undefined}), 'yes');
    assert.equal(tpl({a: undefined, b: null}), 'yes');
  });

  it('is false if any conditionals are truthy', function () {
    assert.equal(tpl({a: true, b: false}), 'no');
    assert.equal(tpl({a: 'true', b: ''}), 'no');
    assert.equal(tpl({a: 1, b: 0}), 'no');
    assert.equal(tpl({a: undefined, b: 1}), 'no');
  });
});
