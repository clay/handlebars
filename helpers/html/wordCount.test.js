'use strict';
const name = getName(__filename);

describe(name, function () {
  it('counts the number of words in an HTML string', function () {
    const tpl = hbs.compile('{{wordCount "<div> This is <b> cool </b> </div>"}}');

    expect(tpl()).to.equal('3');
  });

  it('returns 0 if no HTML', function () {
    const tpl = hbs.compile('{{wordCount}}');

    expect(tpl()).to.equal('0');
  });

  it('returns 0 if falsy HTML is passed in', function () {
    expect(hbs.compile('{{wordCount a}}')({a: false})).to.equal('0');
  });
});
