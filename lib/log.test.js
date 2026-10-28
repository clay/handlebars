'use strict';
const { describe, it, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const clayLog = require('clay-log');

describe('lib/log', function () {
  afterEach(function () {
    mock.restoreAll();
    delete require.cache[require.resolve('./log')];
  });

  it('does not set up clay-log until something is logged', function () {
    const init = mock.method(clayLog, 'init', () => () => {});

    require('./log');
    assert.equal(init.mock.callCount(), 0);
  });

  it('sets up clay-log once, as clayhandlebars, and passes on what it is given', function () {
    const logged = [],
      init = mock.method(clayLog, 'init', () => (...args) => logged.push(args)),
      log = require('./log'),
      error = new Error('boom');

    log('error', 'first', { error });
    log('warn', 'second');
    assert.equal(init.mock.callCount(), 1);
    assert.deepEqual(init.mock.calls[0].arguments, [{ name: 'clayhandlebars' }]);
    assert.deepEqual(logged, [['error', 'first', { error }], ['warn', 'second']]);
  });
});
