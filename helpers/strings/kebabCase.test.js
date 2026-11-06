'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ kebabCase a }}');

describe(name, function () {
  it('turns words into kebab-case', function () {
    assert.equal(tpl({ a: 'Foo Bar Baz' }), 'foo-bar-baz');
    assert.equal(tpl({ a: 'foo_bar-baz qux' }), 'foo-bar-baz-qux');
  });

  it('tells camelCase words apart', function () {
    assert.equal(tpl({ a: 'fooBarBaz' }), 'foo-bar-baz');
    assert.equal(tpl({ a: 'XMLHttpRequest' }), 'xml-http-request');
  });

  it('keeps numbers as words, and drops accents', function () {
    assert.equal(tpl({ a: 'top10Lists' }), 'top-10-lists');
    assert.equal(tpl({ a: 'Café Crème' }), 'cafe-creme');
  });

  it('gives an empty string for nothing', function () {
    assert.equal(tpl({}), '');
    assert.equal(tpl({ a: null }), '');
    assert.equal(tpl({ a: '' }), '');
  });
});
