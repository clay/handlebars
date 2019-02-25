'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#ifAny a b}}yes{{else}}no{{/ifAny}}'),
  inlineTpl = hbs.compile('{{ifAny a b}}');

describe(name, function () {
  it('is true if any conditionals are truthy', function () {
    expect(tpl({a: true, b: true})).to.equal('yes');
    expect(tpl({a: 'abc', b: 0})).to.equal('yes');
    expect(tpl({a: undefined, b: 1})).to.equal('yes');
  });

  it('is false if all conditionals are falsy', function () {
    expect(tpl({a: false, b: false})).to.equal('no');
    expect(tpl({a: '', b: ''})).to.equal('no');
    expect(tpl({a: 0, b: 0})).to.equal('no');
    expect(tpl({a: undefined, b: null})).to.equal('no');
  });

  it('is true if any inline conditionals are truthy', function () {
    expect(inlineTpl({a: true, b: true})).to.equal('true');
    expect(inlineTpl({a: 'abc', b: 0})).to.equal('true');
    expect(inlineTpl({a: undefined, b: 1})).to.equal('true');
  });

  it('is false if all inline conditionals are falsy', function () {
    expect(inlineTpl({a: false, b: false})).to.equal('false');
    expect(inlineTpl({a: '', b: ''})).to.equal('false');
    expect(inlineTpl({a: 0, b: 0})).to.equal('false');
    expect(inlineTpl({a: undefined, b: null})).to.equal('false');
  });
});