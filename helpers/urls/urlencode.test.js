'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  // tests taken from the nunjucks filter tests
  it('encodes ampersands', function () {
    assert.equal(hbs.compile('{{ urlencode "&" }}')(), '%26');
  });

  it('encodes arrays', function () {
    assert.equal(hbs.compile('{{{ urlencode arr }}}')({arr: [[1,2],['&1','&2']]}), '1=2&%261=%262');
  });

  it('encodes objects', function () {
    assert.equal(hbs.compile('{{{ urlencode obj }}}')({obj: {1: 2, '&1': '&2'}}), '1=2&%261=%262');
  });
});
