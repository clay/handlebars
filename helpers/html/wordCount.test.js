'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  it('counts the number of words in an HTML string', function () {
    const tpl = hbs.compile('{{wordCount "<div> This is <b> cool </b> </div>"}}');

    assert.equal(tpl(), '3');
  });

  it('returns 0 if no HTML', function () {
    const tpl = hbs.compile('{{wordCount}}');

    assert.equal(tpl(), '0');
  });

  it('returns 0 if falsy HTML is passed in', function () {
    assert.equal(hbs.compile('{{wordCount a}}')({a: false}), '0');
  });
});
