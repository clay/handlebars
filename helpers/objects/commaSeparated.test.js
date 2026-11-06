'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ commaSeparated a }}');

describe(name, function () {
  it('returns emptystring if not an object', function () {
    assert.equal(tpl(), '');
  });

  it('only returns keys with truthy values', function () {
    assert.equal(tpl({a: {alpha: true, bravo: false}}), 'alpha');
  });

  it('delineates items with commas', function () {
    assert.equal(tpl({a: {alpha: true, bravo: true}}), 'alpha, bravo');
  });

  it('capitalizes the first word in items', function () {
    assert.equal(hbs.compile('{{ commaSeparated a true }}')({a: {alpha: true, 'bravo charlie': true}}), 'Alpha, Bravo charlie');
  });

  it('capitalizes the first word in items and maintains other capitalizations', function () {
    assert.equal(hbs.compile('{{ commaSeparated a true }}')({a: {alpha: true, 'Bravo Charlie-Delta Echo': true}}), 'Alpha, Bravo Charlie-Delta Echo');
  });
});
