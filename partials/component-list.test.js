'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{> component-list a }}');

describe(name, function () {
  it('returns empty string if array is empty', function () {
    assert.equal(tpl({ a: [] }), '');
  });

  it('embeds components based on refs', function () {
    hbs.registerPartial('a', 'a');
    hbs.registerPartial('b', 'b');

    assert.equal(tpl({ a: [{ _ref: '/components/a' }, { _ref: '/components/b' }]}), 'ab');
  });

  it('throws error if component partial is not found', function () {
    const result = function () {
      return tpl({ a: [{ _ref: '/components/c' }]});
    };

    assert.throws(result, Error);
  });
});
