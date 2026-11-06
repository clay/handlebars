'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{modulo a b c}}'),
  tpl2 = hbs.compile('{{#modulo a b c}}yes{{else}}no{{/modulo}}');

describe(name, function () {
  it('inline returns true', function () {
    assert.equal(tpl({a: 3, b: 2, c: 1}), 'true');
  });

  it('inline returns emptystring', function () {
    assert.equal(tpl({a: 3, b: 2, c: 2}), '');
  });

  it('block returns yes', function () {
    assert.equal(tpl2({a: 3, b: 2, c: 1}), 'yes');
  });

  it('block returns no', function () {
    assert.equal(tpl2({a: 3, b: 2, c: 2}), 'no');
  });
});
