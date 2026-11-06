'use strict';
const { format: formatDate } = require('../../lib/date'),
  defaultFormat = 'M/D/YYYY [at] h:mm a';

/**
 * Formats a date, in local time, with tokens like `M/D/YYYY [at] h:mm a`
 * (the tokens of date-fns 1.x: `MMMM Do, YYYY`, `dddd`, `HH:mm`, `Z`, ...)
 *
 * @param  {*} date a Date, a timestamp, a string (ISO 8601, or anything `new Date()` reads), or "now"
 * @param {string} [format]
 * @return {string}
 */
module.exports = function (date, format) {
  format = format || defaultFormat;
  date = date === 'now' ? new Date() : date;

  return formatDate(date, format);
};
