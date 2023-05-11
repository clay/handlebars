'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#ifNone a b}}yes{{else}}no{{/ifNone}}'),
  inlineTpl = hbs.compile('{{ifNone a b}}');

describe(name, function () {
  it('is true if all conditionals are falsy', function () {
    expect(tpl({a: false, b: false})).to.equal('yes');
    expect(tpl({a: '', b: 0})).to.equal('yes');
    expect(tpl({a: undefined, b: undefined})).to.equal('yes');
    expect(tpl({a: undefined, b: null})).to.equal('yes');
  });

  it('is false if any conditionals are truthy', function () {
    expect(tpl({a: true, b: false})).to.equal('no');
    expect(tpl({a: 'true', b: ''})).to.equal('no');
    expect(tpl({a: 1, b: 0})).to.equal('no');
    expect(tpl({a: undefined, b: 1})).to.equal('no');
  });

  it('is true if all inline conditionals are falsy', function () {
    expect(inlineTpl({a: false, b: false})).to.equal('true');
    expect(inlineTpl({a: '', b: 0})).to.equal('true');
    expect(inlineTpl({a: undefined, b: undefined})).to.equal('true');
    expect(inlineTpl({a: undefined, b: null})).to.equal('true');
  });

  it('is false if any inline conditionals are truthy', function () {
    expect(inlineTpl({a: true, b: false})).to.equal('false');
    expect(inlineTpl({a: 'true', b: ''})).to.equal('false');
    expect(inlineTpl({a: 1, b: 0})).to.equal('false');
    expect(inlineTpl({a: undefined, b: 1})).to.equal('false');
  });
});