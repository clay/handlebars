'use strict';
const name = getName(__filename),
  timeOnly = /^\d+:\d+ [ap]\.m\./,
  timeAgoSec = /1 second ago/,
  timeAgoSecs = /([12]?\d|30) seconds ago/,
  timeAgoMins = /([12]?\d|30) (min|mins) ago/,
  yesterday = /^Yesterday at \d+:\d+ [ap]\.m\./,
  dateAtTime = /^\d+\/\d+\/\d+ at \d+:\d+ [ap]\.m\./,
  tpl = hbs.compile('{{ articleDate a}}');

describe(name, function () {
  function addDays(date, days) {
    var result = new Date(date);

    result.setDate(date.getDate() + days);
    return result;
  }

  function matchMinutes(date, minutes) {
    var result = new Date(date);

    result.setMinutes(date.getMinutes() + minutes);
    return result;
  }

  function matchSeconds(date, seconds) {
    var result = new Date(date);

    result.setSeconds(date.getSeconds() + seconds);
    return result;
  }

  it('should return empty string if given an invalid date', function () {
    var result = tpl({a: [2015, 25, 35]});

    expect(result).to.equal('');
  });

  it('should match the ocluded frame', function () {
    var result = tpl({a: new Date()});

    expect(result).to.match(timeAgoSecs);
  });

  it('should show a time ago in seconds if article is created 1 second ago', function () {
    var date = new Date(),
      result;

    date = matchSeconds(date, -1);
    result = tpl({a: date});
    expect(result).to.match(timeAgoSec);
  });

  it('should show a time ago in seconds if article is created < 1 minute ago', function () {
    var date = new Date(),
      result;

    date = matchSeconds(date, -30);
    result = tpl({a: date});
    expect(result).to.match(timeAgoSecs);
  });

  it('should show a time ago in minutes if article is created < 30 minutes ago', function () {
    var date = new Date(),
      result;

    date = matchMinutes(date, -5);
    result = tpl({a: date});
    expect(result).to.match(timeAgoMins);
  });

  it('should match h:mm if article is created > 30 minutes ago', function () {
    var date = new Date(),
      result;

    date = matchMinutes(date, -35);
    result = tpl({a: date});
    expect(result).to.match(timeOnly);
  });

  it('should match one day ago', function () {
    var date = new Date(),
      result;

    date = addDays(date, -1);
    result = tpl({a: date});
    expect(result).to.match(yesterday);
  });

  it('should match two days ago', function () {
    var date = new Date(),
      result;

    date = addDays(date, -2);
    result = tpl({a: date});
    expect(result).to.match(dateAtTime);
  });

  it('should match one week ago', function () {
    var date = new Date(),
      result;

    date = addDays(date, -7);
    result = tpl({a: date});
    expect(result).to.match(dateAtTime);
  });

});
