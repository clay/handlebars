'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{{ striptags a }}}');

describe(name, function () {
  it('removes html tags', function () {
    assert.equal(tpl({ a: '<p><b>Hello</b> <em>World!</em></p>' }), 'Hello World!');
  });

  it('keeps the text between tags and decodes nothing', function () {
    assert.equal(tpl({ a: '<div>a &amp; b</div>' }), 'a &amp; b');
  });

  it('keeps the tags it is told to allow', function () {
    assert.equal(hbs.compile('{{{ striptags a "<b>" }}}')({ a: '<p><b>Hello</b> <i>World</i></p>' }), '<b>Hello</b> World');
  });

  it('replaces the removed tags with the third argument', function () {
    assert.equal(hbs.compile('{{{ striptags a "" " " }}}')({ a: '<p>Hello</p><p>World</p>' }), ' Hello  World ');
  });

  it('does not take the options object of Handlebars for a tag or a replacement', function () {
    // (it was written as [object Object] between the words)
    assert.equal(hbs.compile('{{{ striptags a "<b>" }}}')({ a: '<p><b>Hello</b> <i>World</i></p>' }), '<b>Hello</b> World');
  });

  it('gives an empty string for what is not a string', function () {
    assert.equal(tpl({}), '');
    assert.equal(tpl({ a: null }), '');
    assert.equal(tpl({ a: 5 }), '');
  });
});
