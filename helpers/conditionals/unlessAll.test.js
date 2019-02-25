'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#unlessAll a b}}yes{{else}}no{{/unlessAll}}'),
  inlineTpl = hbs.compile('{{unlessAll a b}}');

describe(name, function () {
  it('is false if all conditionals are truthy', function () {
    expect(tpl({a: true, b: true})).to.equal('no');
    expect(tpl({a: 'abc', b: 123})).to.equal('no');
  });

  it('is true if any conditionals are falsy', function () {
    expect(tpl({a: true, b: false})).to.equal('yes');
    expect(tpl({a: 'true', b: ''})).to.equal('yes');
    expect(tpl({a: 1, b: 0})).to.equal('yes');
    expect(tpl({a: undefined, b: true})).to.equal('yes');
  });

  it('is false if all inline conditionals are truthy', function () {
    expect(inlineTpl({a: true, b: true})).to.equal('false');
    expect(inlineTpl({a: 'abc', b: 123})).to.equal('false');
  });

  it('is true if any inline conditionals are falsy', function () {
    expect(inlineTpl({a: true, b: false})).to.equal('true');
    expect(inlineTpl({a: 'true', b: ''})).to.equal('true');
    expect(inlineTpl({a: 1, b: 0})).to.equal('true');
    expect(inlineTpl({a: undefined, b: true})).to.equal('true');
  });
});