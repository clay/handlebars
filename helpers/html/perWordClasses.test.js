'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  tpl = hbs.compile('{{{ perWordClasses a }}}'),
  tplNoPerLetter = hbs.compile('{{{ perWordClasses a perLetter=false }}}'),
  path = require('path'),
  lib = require(path.resolve(__dirname, name + '.js'));

describe(name, function () {
  it('fails gracefully on empty content', function () {
    assert.equal(tpl({a: null}), '');
    assert.equal(tpl({a: undefined}), '');
    assert.equal(tpl({a: ''}), '');
  });

  it('fails gracefully on non-string content', function () {
    assert.equal(tpl({a: 123}), '');
  });

  it('wraps words and letters with classes', function () {
    assert.equal(tpl({a: 'one two three'}), '<span class="_one"><span class="_char0">o</span><span class="_char1">n</span><span class="_char2">e</span> </span><span class="_two"><span class="_char0">t</span><span class="_char1">w</span><span class="_char2">o</span> </span><span class="_three"><span class="_char0">t</span><span class="_char1">h</span><span class="_char2">r</span><span class="_char3">e</span><span class="_char4">e</span></span>');
  });

  it('begins numbered classes with an underscore', function () {
    assert.equal(tpl({a: 'The 0.001%'}), '<span class="_the"><span class="_char0">T</span><span class="_char1">h</span><span class="_char2">e</span> </span><span class="_0-001"><span class="_char0">0</span><span class="_char1">.</span><span class="_char2">0</span><span class="_char3">0</span><span class="_char4">1</span><span class="_char5">%</span></span>');
  });

  it('uses lowercase class names', function () {
    assert.equal(tpl({a: 'One TWO'}), '<span class="_one"><span class="_char0">O</span><span class="_char1">n</span><span class="_char2">e</span> </span><span class="_two"><span class="_char0">T</span><span class="_char1">W</span><span class="_char2">O</span></span>');
  });

  it('wraps punctuation as part of the ajoining word', function () {
    assert.equal(tpl({a: 'first, "top gun".'}), '<span class="_first"><span class="_char0">f</span><span class="_char1">i</span><span class="_char2">r</span><span class="_char3">s</span><span class="_char4">t</span><span class="_char5">,</span> </span><span class="_top"><span class="_char0">"</span><span class="_char1">t</span><span class="_char2">o</span><span class="_char3">p</span> </span><span class="_gun"><span class="_char0">g</span><span class="_char1">u</span><span class="_char2">n</span><span class="_char3">"</span><span class="_char4">.</span></span>');
  });

  it('wraps hyphenated words', function () {
    assert.equal(tpl({a: 'full-throttle'}), '<span class="_full-throttle"><span class="_char0">f</span><span class="_char1">u</span><span class="_char2">l</span><span class="_char3">l</span><span class="_char4">-</span><span class="_char5">t</span><span class="_char6">h</span><span class="_char7">r</span><span class="_char8">o</span><span class="_char9">t</span><span class="_char10">t</span><span class="_char11">l</span><span class="_char12">e</span></span>');
  });

  it('removes punctuation from class names (same as slug generation)', function () {
    assert.equal(tpl({a: 'Tom\'s'}), '<span class="_toms"><span class="_char0">T</span><span class="_char1">o</span><span class="_char2">m</span><span class="_char3">\'</span><span class="_char4">s</span></span>');
    assert.equal(tpl({a: 'Mary’s'}), '<span class="_marys"><span class="_char0">M</span><span class="_char1">a</span><span class="_char2">r</span><span class="_char3">y</span><span class="_char4">’</span><span class="_char5">s</span></span>');
  });

  it('allows per letter spans to be turned off', function () {
    assert.equal(tplNoPerLetter({a: 'one two'}), '<span class="_one">one </span><span class="_two">two</span>');
  });

  describe('toSlug', function () {
    const fn = lib.toSlug;

    it('removes unicode', function () {
      assert.equal(fn('Foo » Bar'), 'foo-bar');
    });

    it('removes nonbreaking spaces', function () {
      assert.equal(fn('Foo&nbsp;Bar'), 'foo-bar');
    });

    it('removes html tags', function () {
      assert.equal(fn('Foo<br /> <h1>Bar</h1>'), 'foo-bar');
    });

    it('decodes entities', function () {
      assert.equal(fn('Foo &amp; Bar'), 'foo-and-bar');
    });

    it('passes through speakingurl', function () {
      assert.equal(fn('Don\'t Blink'), 'dont-blink');
    });
  });
});

describe(name + ': spaces between words', function () {
  const perWordClasses = require('./perWordClasses'),
    spaced = text => perWordClasses(text, { hash: { perLetter: false } });

  it('keeps the space after a word that comes back as the last word', function () {
    // the helper used to compare words, not positions, so every word equal to the last one lost its space
    assert.equal(spaced('a a'), '<span class="_a">a </span><span class="_a">a</span>');
    assert.equal(spaced('the cat the'), '<span class="_the">the </span><span class="_cat">cat </span><span class="_the">the</span>');
  });

  it('keeps the spaces of a string with leading, trailing or doubled spaces', function () {
    assert.equal(spaced(' a'), '<span class="_"> </span><span class="_a">a</span>');
    assert.equal(spaced('a '), '<span class="_a">a </span><span class="_"></span>');
  });

  it('works with an object String too', function () {
    assert.equal(spaced(new String('one two')), '<span class="_one">one </span><span class="_two">two</span>');
  });
});
