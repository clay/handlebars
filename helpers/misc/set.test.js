'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ set "id" "abc" }}{{ id }}');

describe(name, function () {
  it('sets a property on the current context', function () {
    assert.equal(tpl({}), 'abc');
  });

  it('overrides an already-set property on the current context', function () {
    assert.equal(tpl({ id: 'def' }), 'abc');
  });

  it('allows deep path setting', function () {
    assert.equal(hbs.compile('{{ set "a.b.c" "abc" }}{{ a.b.c }}')({}), 'abc');
  });

  it('accepts an optional context', function () {
    assert.equal(hbs.compile('{{ set this "id" "xyz" }}{{ id }}')({}), 'xyz');
  });
});
