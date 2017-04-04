'use strict';
var _ = require('lodash'),
  filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName),
  expect = require('chai').expect,
  sinon = require('sinon');

describe('Filters: ' + filterName, function () {
  var sandbox,
    fakeMomentInstance,
    fakeMoment;

  function createFakeMoment() {
    fakeMomentInstance = {
      format: _.noop
    };

    fakeMoment = sandbox.stub();
    fakeMoment.returns(fakeMomentInstance);
    sandbox.stub(fakeMomentInstance, 'format');

    return fakeMoment;
  }

  beforeEach(function () {
    sandbox = sinon.sandbox.create();
    filter.setMoment(createFakeMoment());
  });

  afterEach(function () {
    sandbox.restore();
  });

  it('formats with default format', function () {
    var result,
      date = 'something',
      defaultFormat = filter.getDefaultFormat(),
      expectedResult = 'whatever';

    fakeMomentInstance.format.returns(expectedResult);

    result = filter(date);

    sinon.assert.calledWith(fakeMoment, date);
    sinon.assert.calledWith(fakeMomentInstance.format, defaultFormat);

    expect(result).to.equal(expectedResult);
  });

  it('formats with given format', function () {
    var result,
      date = 'something',
      givenFormat = 'something else',
      expectedResult = 'whatever';

    fakeMomentInstance.format.returns(expectedResult);

    result = filter(date, givenFormat);

    sinon.assert.calledWith(fakeMoment, date);
    sinon.assert.calledWith(fakeMomentInstance.format, givenFormat);

    expect(result).to.equal(expectedResult);
  });
});