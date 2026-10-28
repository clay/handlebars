'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ truncate str len }}'),
  tplSuffix = hbs.compile('{{ truncate str len suffix=" TBC" }}');

describe(name, function () {
  it('returns emptystring if undefined', function () {
    assert.equal(tpl(), '');
    assert.equal(tpl({}), '');
  });

  it('does not change strings shorter than given length', function () {
    assert.equal(tpl({str: 'foo', len: 5}), 'foo');
  });

  it('does not change strings equal to given length', function () {
    assert.equal(tpl({str: 'fooba', len: 5}), 'fooba');
  });

  it('shortens strings longer than given length', function () {
    assert.equal(tpl({str: 'foo bar bar', len: 5}), 'foo b…');
  });

  it('trims whitespace when entire string is shorter than given length', function () {
    assert.equal(tpl({str: ' fo ', len: 5}), 'fo');
  });

  it('trims whitespace when non-whitespace string is shorter than given length', function () {
    assert.equal(tpl({str: '  foo  ', len: 5}), 'foo');
  });

  it('trims whitespace where non-whitespace string is longer than given length', function () {
    assert.equal(tpl({str: ' foo bar bar ', len: 5}), 'foo b…');
  });

  it('trims whitespace after truncating', function () {
    assert.equal(tpl({str: 'foo bar bar', len: 4}), 'foo…');
  });

  it('accepts a suffix to append', function () {
    assert.equal(tplSuffix({str: 'foo bar bar', len: 5}), 'foo b TBC');
  });
});
