'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { hbs } = require('../../test/env');
const name = __filename.split('/').pop().replace('.test.js', ''),
  timeOnly = /^\d+:\d+ [ap]\.m\./,
  timeAgoSec = /1 second ago/,
  timeAgoSecs = /([12]?\d|30) seconds ago/,
  timeAgoMins = /([12]?\d|30) (min|mins) ago/,
  yesterday = /^Yesterday at \d+:\d+ [ap]\.m\./,
  dateAtTime = /^\d+\/\d+\/\d+ at \d+:\d+ [ap]\.m\./,
  tpl = hbs.compile('{{ articleDate a}}');

describe(name, function () {
  function addDays(date, days) {
    const result = new Date(date);

    result.setDate(date.getDate() + days);
    return result;
  }

  function matchMinutes(date, minutes) {
    const result = new Date(date);

    result.setMinutes(date.getMinutes() + minutes);
    return result;
  }

  function matchSeconds(date, seconds) {
    const result = new Date(date);

    result.setSeconds(date.getSeconds() + seconds);
    return result;
  }

  it('should return empty string if given an invalid date', function () {
    const result = tpl({a: [2015, 25, 35]});

    assert.equal(result, '');
  });

  it('should match the ocluded frame', function () {
    const result = tpl({a: new Date()});

    assert.match(result, timeAgoSecs);
  });

  it('should show a time ago in seconds if article is created 1 second ago', function () {
    let date = new Date();

    date = matchSeconds(date, -1);
    const result = tpl({a: date});
    assert.match(result, timeAgoSec);
  });

  it('should show a time ago in seconds if article is created < 1 minute ago', function () {
    let date = new Date();

    date = matchSeconds(date, -30);
    const result = tpl({a: date});
    assert.match(result, timeAgoSecs);
  });

  it('should show a time ago in minutes if article is created < 30 minutes ago', function () {
    let date = new Date();

    date = matchMinutes(date, -5);
    const result = tpl({a: date});
    assert.match(result, timeAgoMins);
  });

  it('should match h:mm if article is created > 30 minutes ago', function () {
    let date = new Date();

    date = matchMinutes(date, -35);
    const result = tpl({a: date});
    assert.match(result, timeOnly);
  });

  it('should match one day ago', function () {
    let date = new Date();

    date = addDays(date, -1);
    const result = tpl({a: date});
    assert.match(result, yesterday);
  });

  it('should match two days ago', function () {
    let date = new Date();

    date = addDays(date, -2);
    const result = tpl({a: date});
    assert.match(result, dateAtTime);
  });

  it('should match one week ago', function () {
    let date = new Date();

    date = addDays(date, -7);
    const result = tpl({a: date});
    assert.match(result, dateAtTime);
  });

});
