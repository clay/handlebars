'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'),
  path = require('node:path'),
  helpers = require('./helpers');

describe('lib/helpers', function () {
  const onDisk = fs.readdirSync(path.join(__dirname, '..', 'helpers'), { recursive: true })
    .filter(file => file.endsWith('.js') && !file.endsWith('.test.js'))
    .sort();

  it('lists every helper file, under the name of the file', function () {
    assert.deepEqual(Object.keys(helpers).sort(), onDisk.map(file => path.basename(file, '.js')).sort());
  });

  it('lists each helper once, and as a function', function () {
    onDisk.forEach((file) => {
      const name = path.basename(file, '.js');

      assert.equal(typeof helpers[name], 'function', name);
      assert.equal(helpers[name], require(path.join(__dirname, '..', 'helpers', file)), name);
    });
  });

  it('has a test file next to every helper', function () {
    onDisk.forEach((file) => {
      assert.ok(fs.existsSync(path.join(__dirname, '..', 'helpers', file.replace(/\.js$/, '.test.js'))), `${file} has no test file`);
    });
  });
});
