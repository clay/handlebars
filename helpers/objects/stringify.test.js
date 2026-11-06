'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', '');

describe(name, function () {
  it('should stringify an object', function () {
    assert.equal(hbs.compile('{{{ stringify obj }}}')({ obj: {a: 'b'} }), '{"a":"b"}');
  });
});
