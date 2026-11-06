'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  it('works like the default if helper (basic)', function () {
    const tpl = hbs.compile('{{#if a}}yes{{/if}}');

    assert.equal(tpl({a: true}), 'yes');
    assert.equal(tpl({a: false}), '');
  });

  it('works like the default if helper (advanced)', function () {
    const tpl = hbs.compile('{{#if a}}yes{{else}}no{{/if}}');

    assert.equal(tpl({a: true}), 'yes');
    assert.equal(tpl({a: false}), 'no');
  });

  it('allows new inline behavior (basic)', function () {
    const tpl = hbs.compile('{{if a "yes"}}');

    assert.equal(tpl({a: true}), 'yes');
    assert.equal(tpl({a: false}), '');
  });

  it('allows new inline behavior (advanced)', function () {
    const tpl = hbs.compile('{{if a "yes" else="no"}}');

    assert.equal(tpl({a: true}), 'yes');
    assert.equal(tpl({a: false}), 'no');
  });
});
