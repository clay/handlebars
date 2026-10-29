'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const name = __filename.split('/').pop().replace('.test.js', ''),
  filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName);

describe(name, function () {
  it('removes component references from a component list', function () {
    assert.deepEqual(filter([
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'hi'
      }
    ], false, 'some-component'), [
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'hi'
      }
    ]);
  });
  it('removes mulitple component references from a component list', function () {
    assert.deepEqual(filter([
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/another-component/instances/2',
        text: 'hi'
      }
    ], false, 'some-component', 'another-component'), [
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'hi'
      }
    ]);
  });
  it('returns only matching mulitple component references from a component list', function () {
    assert.deepEqual(filter([
      {
        _ref: 'localhost/components/clay-paragraph/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/clay-paragraph/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/another-component/instances/2',
        text: 'hi'
      }
    ], true, 'some-component', 'another-component'), [
      {
        _ref: 'localhost/components/some-component/instances/1',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/some-component/instances/2',
        text: 'hi'
      },
      {
        _ref: 'localhost/components/another-component/instances/2',
        text: 'hi'
      }
    ]);
  });
});
