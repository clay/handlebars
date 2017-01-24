'use strict';
const name = getName(__filename),
  tpl = hbs.compile('{{#each (range a b) }}{{ this }}{{/each}}');

describe(name, function () {
  it('starts from 0 by default', function () {
    expect(tpl({a: 5})).to.equal('012345');
  });

  it('creates a range from one number to another', function () {
    expect(tpl({a: 1, b: 5})).to.equal('12345');
  });

  it('includes the last number', function () {
    expect(tpl({a: 1})).to.equal('01');
  });

  it('iterates through range as a block helper', function () {
    const tpl2 = hbs.compile('{{#range 1 3}}{{ this }} personal space! {{/range}}');

    expect(tpl2()).to.equal('1 personal space! 2 personal space! 3 personal space! ');
  });
});
