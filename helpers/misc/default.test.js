'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{ default a b }}');

describe(name, function () {
  it('returns the first value if non-empty', function () {
    expect(tpl({a: 'yes', b: 'no'})).to.equal('yes');
    expect(tpl({a: [''], b: 'no'})).to.equal(''); // array has items
    expect(tpl({a: { foo: '' }, b: 'no'})).to.equal('[object Object]'); // object has property
    expect(tpl({a: 1, b: 'no'})).to.equal('1');
    expect(tpl({a: true, b: 'no'})).to.equal('true');
  });

  it('returns the second value if empty', function () {
    expect(tpl({a: '', b: 'no'})).to.equal('no');
    expect(tpl({a: [], b: 'no'})).to.equal('no');
    expect(tpl({a: {}, b: 'no'})).to.equal('no');
    expect(tpl({a: 0, b: 'no'})).to.equal('no');
    expect(tpl({a: false, b: 'no'})).to.equal('no');
  });

  // test below is a regression test from handlebars-helpers
  it('should fallback to the default value when no value exists', function () {
    expect(tpl({a: null, b: 'no'})).to.equal('no');
    expect(tpl({a: undefined, b: 'no'})).to.equal('no');
    expect(tpl({b: 'no'})).to.equal('no');
  });
});
