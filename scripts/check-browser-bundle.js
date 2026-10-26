'use strict';
/**
 * Smoke test for dist/browser.js (run `npm run build` first).
 *
 * The bundle must register exactly the helpers and partials index.js registers on the server,
 * apart from the two server-only ones that are no-ops in a browser, and render the same.
 */
const assert = require('assert'),
  fs = require('fs'),
  Handlebars = require('handlebars'),
  helpersOnServer = require('../index.js'),
  helpersInBrowser = require('../dist/browser.js');

// the server loads partials with require(); give plain node a way to read .hbs files
require.extensions['.hbs'] = (module, filename) => {
  module.exports = fs.readFileSync(filename, 'utf8');
};

const server = helpersOnServer(Handlebars.create()),
  browser = helpersInBrowser(Handlebars.create()),
  names = env => Object.keys(env.helpers).sort(),
  templates = [
    ['{{#compare a "===" b}}same{{else}}different{{/compare}}', { a: 1, b: 1 }],
    ['{{#compare a ">" b}}more{{else}}not more{{/compare}}', { a: 3, b: 2 }],
    ['{{#ifAny a b}}any{{else}}none{{/ifAny}}', { a: 0, b: 'x' }],
    ['{{default a "fallback"}}', {}],
    ['{{striptags html}}', { html: '<b>bold</b> text' }],
    ['{{wordCount html}}', { html: '<p>one two three</p>' }],
    ['{{addCommas n}}', { n: 1234567 }],
    ['{{truncate s 8}}', { s: 'a long sentence' }],
    ['{{concat a "-" b}}', { a: 'x', b: 'y' }],
    ['{{formatLocalDate d "YYYY-MM-DD"}}', { d: '2020-03-04T12:00:00' }],
    ['{{> component-list}}', []]
  ];

assert.deepStrictEqual(names(browser), names(server), 'the browser bundle and index.js register different helpers');
assert.deepStrictEqual(Object.keys(browser.partials).sort(), Object.keys(server.partials).sort(), 'the browser bundle and index.js register different partials');

templates.forEach(([source, context]) => {
  const fromServer = server.compile(source)(context),
    fromBrowser = browser.compile(source)(context);

  assert.strictEqual(fromBrowser, fromServer, `${source} renders differently in the browser bundle`);
});

console.log(`dist/browser.js: ${names(browser).length} helpers, ${Object.keys(browser.partials).length} partial(s) and ${templates.length} renders match index.js`);
