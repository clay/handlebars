'use strict';
const { parse, format, isValid, isSameDay, subDays, differenceInMinutes, distanceStrict } = require('./date');

/**
 * A date as text, relative to now: "12 seconds ago", "5 mins ago", the time today, then whatever the caller makes of
 * yesterday and of anything older. What the articleDate and dateMinimal helpers have in common.
 * @param {Date|string|number} datetime
 * @param {object} when
 * @param {function(Date): string} when.yesterday text for a time yesterday
 * @param {function(Date): string} when.older text for a time before yesterday
 * @returns {string} '' if `datetime` isn't a date
 */
module.exports = function relativeDate(datetime, when) {
  const date = parse(datetime),
    now = new Date();
  let count;

  if (!isValid(date)) {
    return '';
  }

  // articles < 30 min old should display 'x seconds ago / x minutes ago'
  if (differenceInMinutes(now, date) < 1) {
    count = distanceStrict(now, date, 's');

    return count === 1 ? '1 second ago' : `${count} seconds ago`;
  } else if (differenceInMinutes(now, date) < 30) {
    count = distanceStrict(now, date, 'm');

    return count === 1 ? '1 min ago' : `${count} mins ago`;
  } else if (isSameDay(now, date)) {
    return format(date, 'h:mm aa');
  } else if (isSameDay(subDays(now, 1), date)) {
    return when.yesterday(date);
  } else {
    return when.older(date);
  }
};
