'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ includes a b }}');

describe(name, function () {
  it('returns empty if no value passed in', function () {
    assert.equal(tpl({a: null, b: 'test'}), '');
  });

  it('throws an error if first arg is not string', function () {
    const result = function () {
      return tpl({a: 100, b: 'test'});
    };

    assert.throws(result, Error);
  });

  it('throws an error if second arg is not string', function () {
    const result = function () {
      return tpl({a: 'test', b: 100});
    };

    assert.throws(result, Error);
  });

  it('finds substring within string', function () {
    assert.ok(tpl({a: 'foo', b: 'f'}));
  });

  it('returns empty if substring is not found', function () {
    assert.equal(tpl({a: 'foo', b: 'p'}), '');
  });

});
