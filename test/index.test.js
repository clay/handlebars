'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
require('./env'); // before anything logs: sets the log level
const fs = require('node:fs'),
  os = require('node:os'),
  path = require('node:path'),
  Handlebars = require('handlebars'),
  clayhandlebars = require('../index.js'),
  helpers = require('../lib/helpers');

describe('clayhandlebars (index.js)', function () {
  it('returns a new Handlebars environment with every helper and partial when it is given none', function () {
    const env = clayhandlebars();

    Object.keys(helpers).concat(['read', 'yaml']).forEach(name => assert.equal(typeof env.helpers[name], 'function', name));
    assert.ok(env.partials['component-list']);
  });

  it('adds them to the environment it is given, and returns it', function () {
    const mine = Handlebars.create();

    assert.equal(clayhandlebars(mine), mine);
    assert.equal(mine.compile('{{ add 1 2 }}')({}), '3');
  });

  it('works with anything that has registerHelper and registerPartial', function () {
    const registered = { helpers: {}, partials: {} },
      env = { registerHelper: (name, fn) => { registered.helpers[name] = fn; }, registerPartial: (name, fn) => { registered.partials[name] = fn; } };

    clayhandlebars(env);
    assert.equal(Object.keys(registered.helpers).length, Object.keys(helpers).length + 2);
    assert.deepEqual(Object.keys(registered.partials), ['component-list']);
  });

  it('lets its helpers replace the ones of Handlebars, like if', function () {
    assert.equal(clayhandlebars(Handlebars.create()).compile('{{ if a "yes" else="no" }}')({ a: false }), 'no');
  });

  it('renders component lists with the component-list partial', function () {
    const env = clayhandlebars(Handlebars.create());

    env.registerPartial('a', 'A');
    env.registerPartial('b', 'B');
    assert.equal(env.compile('{{> component-list items }}')({ items: [{ _ref: 'x/_components/a/instances/1' }, { _ref: 'x/_components/b' }] }), 'AB');
  });

  describe('the read helper', function () {
    const env = clayhandlebars(Handlebars.create());

    it('inlines a file', function () {
      const file = path.join(os.tmpdir(), `clayhandlebars-helper-${process.pid}.svg`);

      fs.writeFileSync(file, '<svg/>');
      try {
        assert.equal(env.compile('{{{ read f }}}')({ f: file }), '<svg/>');
      } finally {
        fs.unlinkSync(file);
      }
    });

    it('renders nothing for a missing file', function () {
      assert.equal(env.compile('[{{{ read f }}}]')({ f: '/no/such/file.svg' }), '[]');
    });
  });

  describe('wrapPartial', function () {
    it('wraps the code of a component so that it only renders with a _ref or _self', function () {
      assert.equal(clayhandlebars.wrapPartial('article', '<h1>{{title}}</h1>'), [
        '{{#ifAny _ref _self}}',
        '  <h1>{{title}}</h1>',
        '{{else}}',
        '  <!-- unable to render partial article without a supplied context -->',
        '{{/ifAny}}'
      ].join('\n'));
    });

    it('leaves a multi-line template as it is, indenting only the first line', function () {
      assert.equal(clayhandlebars.wrapPartial('x', '<div>\n  {{a}}\n</div>').split('\n').slice(0, 5).join('|'), '{{#ifAny _ref _self}}|  <div>|  {{a}}|</div>|{{else}}');
    });

    it('makes a partial that renders nothing useful without a context', function () {
      const env = clayhandlebars(Handlebars.create());

      env.registerPartial('card', env.compile(clayhandlebars.wrapPartial('card', 'Card {{_ref}}')));
      // (the lines of the wrapper that only hold a tag are dropped, the indentation and line breaks of the others stay)
      assert.equal(env.compile('{{> card}}')({}), '  <!-- unable to render partial card without a supplied context -->\n');
      assert.equal(env.compile('{{> card}}')({ _ref: 'a' }), '  Card a\n');
    });
  });
});

describe('clayhandlebars (index.js) with a file system that is not there', function () {
  const { mock } = require('node:test');

  it('creates an environment without reading the file system', function () {
    // what a consumer's tests do (jest.mock('fs', ...)): nothing that the factory does may depend on fs
    const readdir = mock.method(fs, 'readdirSync', () => ''),
      readFile = mock.method(fs, 'readFileSync', () => ''),
      stat = mock.method(fs, 'statSync', () => { throw new Error('no fs'); });

    try {
      const env = clayhandlebars(Handlebars.create());

      assert.ok(env.partials['component-list']);
      assert.equal(readdir.mock.callCount() + readFile.mock.callCount() + stat.mock.callCount(), 0);
    } finally {
      mock.restoreAll();
    }
  });

  it('reads a partial the first time it is rendered, and once', function () {
    const env = clayhandlebars(Handlebars.create()),
      readFile = mock.method(fs, 'readFileSync');

    try {
      env.registerPartial('a', 'A');
      env.compile('{{> component-list items }}')({ items: [{ _ref: 'x/_components/a' }] });
      env.compile('{{> component-list items }}')({ items: [{ _ref: 'x/_components/a' }] });
      assert.equal(readFile.mock.calls.filter(call => String(call.arguments[0]).endsWith('component-list.hbs')).length, 1);
    } finally {
      mock.restoreAll();
    }
  });
});
