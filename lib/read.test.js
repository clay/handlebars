'use strict';
const { describe, it, beforeEach, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs'),
  os = require('node:os'),
  path = require('node:path'),
  read = require('./read');

describe('lib/read (cached file contents for the read helper)', function () {
  let dir, file;

  beforeEach(function () {
    dir = fs.mkdtempSync(path.join(os.tmpdir(), 'clayhandlebars-read-'));
    file = path.join(dir, 'icon.svg');
    fs.writeFileSync(file, '<svg>one</svg>');
    read.clear();
    mock.timers.enable({ apis: ['Date'], now: Date.now() });
  });

  afterEach(function () {
    mock.timers.reset();
    mock.restoreAll();
    delete process.env.CLAYHANDLEBARS_READ_CACHE;
    fs.rmSync(dir, { recursive: true, force: true });
  });

  it('returns the file contents, like fs.readFileSync', function () {
    assert.equal(read(file), fs.readFileSync(file, 'utf-8'));
  });

  it('reads the disk once while the file is fresh', function () {
    const spy = mock.method(fs, 'readFileSync');

    read(file);
    read(file);
    read(file);
    assert.equal(spy.mock.callCount(), 1);
  });

  it('after a second, re-checks the file and keeps the cached copy if it is unchanged', function () {
    const spy = mock.method(fs, 'readFileSync');

    read(file);
    mock.timers.tick(read.REVALIDATE_MS + 1);
    assert.equal(read(file), '<svg>one</svg>');
    assert.equal(spy.mock.callCount(), 1);
  });

  it('picks up a changed file once the second has passed', function () {
    read(file);
    fs.writeFileSync(file, '<svg>two, longer</svg>');
    assert.equal(read(file), '<svg>one</svg>'); // still within the window
    mock.timers.tick(read.REVALIDATE_MS + 1);
    assert.equal(read(file), '<svg>two, longer</svg>');
  });

  it('notices a same-size change through the modified time', function () {
    const later = new Date(Date.now() + 5000);

    read(file);
    fs.writeFileSync(file, '<svg>ONE</svg>');
    fs.utimesSync(file, later, later);
    mock.timers.tick(read.REVALIDATE_MS + 1);
    assert.equal(read(file), '<svg>ONE</svg>');
  });

  it('throws exactly what fs.readFileSync throws for a missing file, every time, without caching it', function () {
    const missing = path.join(dir, 'missing.svg');
    let expected;

    try {
      fs.readFileSync(missing, 'utf-8');
    } catch (e) {
      expected = e.message;
    }

    assert.throws(() => read(missing), { message: expected });
    assert.throws(() => read(missing), { message: expected });
    fs.writeFileSync(missing, '<svg>now here</svg>');
    assert.equal(read(missing), '<svg>now here</svg>');
  });

  it('fails like before when a cached file is removed', function () {
    read(file);
    fs.unlinkSync(file);
    mock.timers.tick(read.REVALIDATE_MS + 1);
    assert.throws(() => read(file), /ENOENT/);
  });

  it('resolves relative paths against the working directory, as before', function () {
    const cwd = process.cwd();

    process.chdir(dir);
    try {
      assert.equal(read('icon.svg'), '<svg>one</svg>');
      assert.equal(read('./icon.svg'), '<svg>one</svg>');
      assert.equal(read.size(), 1); // same file, one entry
    } finally {
      process.chdir(cwd);
    }
  });

  it('reads from disk every time with CLAYHANDLEBARS_READ_CACHE=false', function () {
    const spy = mock.method(fs, 'readFileSync');

    process.env.CLAYHANDLEBARS_READ_CACHE = 'false';
    read(file);
    read(file);
    assert.equal(spy.mock.callCount(), 2);
    assert.equal(read.size(), 0);
  });

  it('keeps at most MAX_ENTRIES files, dropping the oldest', function () {
    for (let i = 0; i < read.MAX_ENTRIES + 3; i++) {
      const f = path.join(dir, `f${i}.svg`);

      fs.writeFileSync(f, String(i));
      read(f);
    }
    assert.equal(read.size(), read.MAX_ENTRIES);
  });
});
