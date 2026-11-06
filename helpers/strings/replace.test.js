'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ replace str a b }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
  });

  it('should replace occurrences of string "A" with string "B"', function () {
    assert.equal(tpl({str: 'Bender Bending Rodriguez', a: 'B', b: 'M'}), 'Mender Mending Rodriguez');
  });

  it('should return the string if `a` is undefined', function () {
    assert.equal(tpl({str: 'a b c'}), 'a b c');
  });

  it('should replace the string with "" if `b` is undefined', function () {
    assert.equal(tpl({str: 'a b c', a: 'a'}), ' b c');
  });
});
