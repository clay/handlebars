'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{ getComponentName a }}');

describe(name, function () {
  it('gets name from default reference', function () {
    assert.equal(tpl({ a: 'domain.com/components/foo'}), 'foo');
  });

  it('gets name from instance reference', function () {
    assert.equal(tpl({ a: 'domain.com/components/foo/instances/bar'}), 'foo');
  });
});
