'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ capitalizeAll a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
  });

  it('capitalizes every word in a string', function () {
    assert.equal(tpl({a: 'foo bar'}), 'Foo Bar');
  });
});
