'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#each (displaySelf a) }}{{ text }}{{/each}}');

describe(name, function () {
  it('displays the first item', function () {
    assert.equal(tpl({a: [{ displaySelf: true, text: '1' }, { displaySelf: true, text: '2' }]}), '1');
  });

  it('only looks at the displaySelf property', function () {
    assert.equal(tpl({a: [{ displaySelf: false, text: '1' }, { displaySelf: true, text: '2' }]}), '2');
  });
});
