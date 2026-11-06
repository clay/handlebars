'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ lowercase a }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
  });

  it('returns emptystring if non-string passed in', function () {
    assert.equal(tpl({a: 123}), '');
  });

  it('lower cases a string', function () {
    assert.equal(tpl({a: 'Per un Pugno di Dollari'}), 'per un pugno di dollari');
  });
});
