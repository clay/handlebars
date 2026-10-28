'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ longestWord a }}');

describe(name, function () {
  it('throws error if non-string passed in', function () {
    const result = function () {
      return tpl();
    };

    assert.throws(result, Error);
  });

  it('returns 0 if there are no words', function () {
    assert.equal(tpl({a: '   '}), '0');
  });

  it('returns length of longest word', function () {
    assert.equal(tpl({a: 'Foo Ba b'}), '3');
  });
});
