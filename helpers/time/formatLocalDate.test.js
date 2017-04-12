'use strict';
var filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName),
  expect = require('chai').expect,
  dateFormat = require('date-fns/format');

describe('Filters: ' + filterName, function () {
  it('formats with default format', function () {
    var date = (new Date(0)).toString();

    expect(filter(date)).to.equal(dateFormat(date, 'M/D/YYYY [at] h:mm a'));
  });

  it('formats with given format', function () {
    var format = 'MM/DD/YYYY',
      date = (new Date(0)).toString();

    expect(filter(date, format)).to.equal(dateFormat(date, format));
  });
});
