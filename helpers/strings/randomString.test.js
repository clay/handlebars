'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  it('returns random 8 character string', function () {
    assert.equal(hbs.compile('{{ randomString }}')().length, 8);
  });

  it('adds a prefix', function () {
    assert.equal(hbs.compile('{{ randomString a }}')({a: 'abc-'}).length, 12);
  });

  it('disregards non-string prefixes', function () {
    assert.equal(hbs.compile('{{ randomString a }}')({a: {b: 'c'}}).length, 8);
  });

  it('allows alternate lengths without a prefix', function () {
    assert.equal(hbs.compile('{{ randomString characters=1 }}')().length, 1);
  });

  it('allows alternate lengths with a prefix', function () {
    assert.equal(hbs.compile('{{ randomString a characters=1 }}')({a: 'abc-'}).length, 5);
  });
});

describe(name + ': length and characters', function () {
  const randomString = require('./randomString');

  it('makes 8 characters by default, and as many as asked', function () {
    assert.equal(randomString({ hash: {} }).length, 8);
    assert.equal(randomString({ hash: { characters: 21 } }).length, 21);
    assert.equal(randomString({ hash: { characters: 70000 } }).length, 70000);
  });

  it('uses letters and digits only, and all of them over many strings', function () {
    const seen = new Set(randomString({ hash: { characters: 5000 } }));

    assert.ok([...seen].every(character => /^[0-9a-zA-Z]$/.test(character)));
    assert.equal(seen.size, 62);
  });

  it('puts the prefix first, and ignores a prefix that is not a string', function () {
    assert.match(randomString('id-', { hash: { characters: 4 } }), /^id-[0-9a-zA-Z]{4}$/);
    assert.match(randomString(5, { hash: { characters: 4 } }), /^[0-9a-zA-Z]{4}$/);
  });

  it('gives 32 characters when "characters" is not a number, as the package it replaces did, unless it is a list', function () {
    assert.equal(randomString({ hash: { characters: '5' } }).length, 32);
    assert.equal(randomString({ hash: { characters: [1, 2, 3] } }).length, 3);
  });

  it('does not make the same string twice', function () {
    assert.equal(new Set(Array.from({ length: 1000 }, () => randomString({ hash: { characters: 12 } }))).size, 1000);
  });
});
