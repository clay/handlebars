'use strict';
const name = getName(__filename),
  _ = require('lodash');

describe(name, function () {
  before(function () {
    hbs.registerHelper('map', function (array, fn) {
      return _.map(array, fn);
    });

    hbs.registerHelper('join', function (array) {
      return array.join(',');
    });
  });

  it('returns function that returns value', function () {
    expect(hbs.compile('{{ join (map arr (getProp "a"))}}')({ arr: [{ a: '1' }, { a: '2' }]})).to.equal('1,2');
  });
});
