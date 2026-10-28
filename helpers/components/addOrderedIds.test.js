'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{#each (addOrderedIds content "mock-prefix-")}}{{orderedId}}{{/each}}'),
  tplWithOffset = hbs.compile('{{#each (addOrderedIds content "mock-prefix-" 5)}}{{orderedId}}{{/each}}'),
  tplWithoutPrefix = hbs.compile('{{#each (addOrderedIds content)}}{{orderedId}}{{/each}}');

describe(name, function () {
  const content = [{
    _ref: 'localhost/components/fake/instances/1',
    text: 'hello'
  },{
    _ref: 'localhost/components/fake/instances/2',
    text: 'hola'
  },{
    _ref: 'localhost/components/fake/instances/3',
    text: 'bonjour'
  }];

  it('adds an orderedId property to all components in the list', function () {
    assert.equal(tpl({content: content}), 'mock-prefix-1mock-prefix-2mock-prefix-3');
  });

  it('adds an orderedId starting at an offset', function () {
    assert.equal(tplWithOffset({content: content}), 'mock-prefix-5mock-prefix-6mock-prefix-7');
  });

  it('throws an error if no prefix is passed in', function () {
    const resultWithoutPrefix = function () {
      return tplWithoutPrefix();
    };

    assert.throws(resultWithoutPrefix, Error);
  });

  it('throws an error if no content is passed in', function () {
    const result = function () {
      return tpl();
    };

    assert.throws(result, Error);
  });
});
