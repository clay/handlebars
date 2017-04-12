'use strict';
var filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName),
  expect = require('chai').expect;

describe('Filters: ' + filterName, function () {
  it('formats with default format', function () {
    var expectedResult = '12/31/1969 at 7:00 pm';

    expect(filter((new Date(0)).toString())).to.equal(expectedResult);
  });

  it('formats with given format', function () {
    var format = 'MM/DD/YYYY',
      expectedResult = '12/31/1969';

    expect(filter((new Date(0)).toString(), format)).to.equal(expectedResult);
  });
});
