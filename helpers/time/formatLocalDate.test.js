'use strict';
const { describe, it, afterEach, mock } = require('node:test');
const assert = require('node:assert/strict');
const filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName);

describe('Filters: ' + filterName, function () {
  // dates are built from local-time parts, so the expected strings hold in any time zone
  const date = new Date(2020, 2, 4, 15, 5, 9);

  afterEach(function () {
    mock.timers.reset();
  });

  it('formats with default format', function () {
    assert.equal(filter(date), '3/4/2020 at 3:05 pm');
  });

  it('formats with given format', function () {
    assert.equal(filter(date, 'MM/DD/YYYY'), '03/04/2020');
  });

  it('accepts a date string', function () {
    assert.equal(filter('2020-03-04T15:05:09', 'M/D/YYYY h:mm a'), '3/4/2020 3:05 pm');
  });

  it('if date is set to "now," uses current time', function () {
    mock.timers.enable({ apis: ['Date'], now: 1234 });
    assert.equal(filter('now', 'x'), '1234');
  });
});
