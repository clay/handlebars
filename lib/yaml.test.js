'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
require('../test/env'); // before anything logs: sets the log level
const yaml = require('./yaml'),
  { hbs } = require('../test/env');

describe('lib/yaml (the yaml helper)', function () {
  it('parses YAML', function () {
    assert.deepEqual(yaml('a: 1\nb: [x, y]\nc:\n  d: true'), { a: 1, b: ['x', 'y'], c: { d: true } });
  });

  it('ignores the options object Handlebars passes last', function () {
    assert.deepEqual(yaml('a: 1', { hash: {}, data: {} }), { a: 1 });
  });

  it('works in a template, with the output of the read helper', function () {
    assert.equal(hbs.compile('{{#with (yaml text)}}{{title}}-{{list.[1]}}{{/with}}')({ text: 'title: Hello\nlist: [one, two]' }), 'Hello-two');
  });

  it('throws for anything but a string', function () {
    assert.throws(() => yaml(5), TypeError);
    assert.throws(() => yaml(undefined), TypeError);
  });

  it('gives undefined, and does not throw, for YAML that is not valid', function () {
    assert.equal(yaml('a: [unclosed'), undefined);
  });

  it('does not build functions or other code from a tag', function () {
    assert.equal(yaml('a: !!js/function "function () { return 1; }"'), undefined);
  });
});
