'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#ifAll a b}}yes{{else}}no{{/ifAll}}'),
  inlineTpl = hbs.compile('{{ifAll a b}}');

describe(name, function () {
  it('is true if all conditionals are truthy', function () {
    expect(tpl({a: true, b: true})).to.equal('yes');
    expect(tpl({a: 'abc', b: 123})).to.equal('yes');
  });

  it('is false if any conditionals are falsy', function () {
    expect(tpl({a: true, b: false})).to.equal('no');
    expect(tpl({a: 'true', b: ''})).to.equal('no');
    expect(tpl({a: 1, b: 0})).to.equal('no');
    expect(tpl({a: undefined, b: true})).to.equal('no');
  });

  it('is true if all inline conditionals are truthy', function () {
    expect(inlineTpl({a: true, b: true})).to.equal('true');
    expect(inlineTpl({a: 'abc', b: 123})).to.equal('true');
  });

  it('is false if any inline conditionals are falsy', function () {
    expect(inlineTpl({a: true, b: false})).to.equal('false');
    expect(inlineTpl({a: 'true', b: ''})).to.equal('false');
    expect(inlineTpl({a: 1, b: 0})).to.equal('false');
    expect(inlineTpl({a: undefined, b: true})).to.equal('false');
  });
});