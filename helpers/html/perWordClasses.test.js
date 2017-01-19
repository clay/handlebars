'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{{ perWordClasses a }}}'),
  tplNoPerLetter = hbs.compile('{{{ perWordClasses a perLetter=false }}}'),
  path = require('path'),
  lib = require(path.resolve(__dirname, name + '.js'));

describe(name, function () {
  it('fails gracefully on empty content', function () {
    expect(tpl({a: null})).to.equal('');
    expect(tpl({a: undefined})).to.equal('');
    expect(tpl({a: ''})).to.equal('');
  });

  it('fails gracefully on non-string content', function () {
    expect(tpl({a: 123})).to.equal('');
  });

  it('wraps words and letters with classes', function () {
    expect(tpl({a: 'one two three'})).to.equal('<span class="_one"><span class="_char0">o</span><span class="_char1">n</span><span class="_char2">e</span> </span><span class="_two"><span class="_char0">t</span><span class="_char1">w</span><span class="_char2">o</span> </span><span class="_three"><span class="_char0">t</span><span class="_char1">h</span><span class="_char2">r</span><span class="_char3">e</span><span class="_char4">e</span></span>');
  });

  it('begins numbered classes with an underscore', function () {
    expect(tpl({a: 'The 0.001%'})).to.equal('<span class="_the"><span class="_char0">T</span><span class="_char1">h</span><span class="_char2">e</span> </span><span class="_0-001"><span class="_char0">0</span><span class="_char1">.</span><span class="_char2">0</span><span class="_char3">0</span><span class="_char4">1</span><span class="_char5">%</span></span>');
  });

  it('uses lowercase class names', function () {
    expect(tpl({a: 'One TWO'})).to.equal('<span class="_one"><span class="_char0">O</span><span class="_char1">n</span><span class="_char2">e</span> </span><span class="_two"><span class="_char0">T</span><span class="_char1">W</span><span class="_char2">O</span></span>');
  });

  it('wraps punctuation as part of the ajoining word', function () {
    expect(tpl({a: 'first, "top gun".'})).to.equal('<span class="_first"><span class="_char0">f</span><span class="_char1">i</span><span class="_char2">r</span><span class="_char3">s</span><span class="_char4">t</span><span class="_char5">,</span> </span><span class="_top"><span class="_char0">"</span><span class="_char1">t</span><span class="_char2">o</span><span class="_char3">p</span> </span><span class="_gun"><span class="_char0">g</span><span class="_char1">u</span><span class="_char2">n</span><span class="_char3">"</span><span class="_char4">.</span></span>');
  });

  it('wraps hyphenated words', function () {
    expect(tpl({a: 'full-throttle'})).to.equal('<span class="_full-throttle"><span class="_char0">f</span><span class="_char1">u</span><span class="_char2">l</span><span class="_char3">l</span><span class="_char4">-</span><span class="_char5">t</span><span class="_char6">h</span><span class="_char7">r</span><span class="_char8">o</span><span class="_char9">t</span><span class="_char10">t</span><span class="_char11">l</span><span class="_char12">e</span></span>');
  });

  it('removes punctuation from class names (same as slug generation)', function () {
    expect(tpl({a: 'Tom\'s'})).to.equal('<span class="_toms"><span class="_char0">T</span><span class="_char1">o</span><span class="_char2">m</span><span class="_char3">\'</span><span class="_char4">s</span></span>');
    expect(tpl({a: 'Mary’s'})).to.equal('<span class="_marys"><span class="_char0">M</span><span class="_char1">a</span><span class="_char2">r</span><span class="_char3">y</span><span class="_char4">’</span><span class="_char5">s</span></span>');
  });

  it('allows per letter spans to be turned off', function () {
    expect(tplNoPerLetter({a: 'one two'})).to.equal('<span class="_one">one </span><span class="_two">two</span>');
  });

  describe('toSlug', function () {
    const fn = lib[this.title];

    it('removes unicode', function () {
      expect(fn('Foo » Bar')).to.equal('foo-bar');
    });

    it('removes nonbreaking spaces', function () {
      expect(fn('Foo&nbsp;Bar')).to.equal('foo-bar');
    });

    it('removes html tags', function () {
      expect(fn('Foo<br /> <h1>Bar</h1>')).to.equal('foo-bar');
    });

    it('decodes entities', function () {
      expect(fn('Foo &amp; Bar')).to.equal('foo-and-bar');
    });

    it('passes through speakingurl', function () {
      expect(fn('Don\'t Blink')).to.equal('dont-blink');
    });
  });
});
