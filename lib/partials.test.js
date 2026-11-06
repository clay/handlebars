'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'),
  path = require('node:path'),
  partials = require('./partials');

describe('lib/partials', function () {
  it('lists every .hbs file in partials/, by name', function () {
    const onDisk = fs.readdirSync(path.join(__dirname, '..', 'partials')).filter(file => file.endsWith('.hbs')).map(file => path.basename(file, '.hbs'));

    assert.deepEqual([...partials].sort(), onDisk.sort());
  });

  it('has a test file next to every partial', function () {
    partials.forEach(name => assert.ok(fs.existsSync(path.join(__dirname, '..', 'partials', `${name}.test.js`)), name));
  });
});
