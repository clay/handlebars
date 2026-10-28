'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  const date = new Date(2020, 2, 4, 15, 5, 9);

  it('is the formatLocalDate helper under its old name', function () {
    assert.equal(require('./moment'), require('./formatLocalDate'));
  });

  it('formats a date in a template', function () {
    assert.equal(hbs.compile('{{ moment d "MMMM Do, YYYY [at] h:mm A" }}')({ d: date }), 'March 4th, 2020 at 3:05 PM');
  });
});
