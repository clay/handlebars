'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#each (displaySelfAll a) }}{{ text }}{{/each}}');

describe(name, function () {
  it('displays all items where displaySelf is truthy', function () {
    assert.equal(tpl({a: [{ displaySelf: true, text: '1' }, { displaySelf: true, text: '2' }]}), '12');
  });

  it('displays only items where displaySelf is truthy', function () {
    assert.equal(tpl({a: [{ displaySelf: false, text: '1' }, { displaySelf: true, text: '2' }]}), '2');
  });
});
