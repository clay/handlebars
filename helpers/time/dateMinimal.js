'use strict';
const relativeDate = require('../../lib/relative-date'),
  { format } = require('../../lib/date');

/**
 * generate display date (without time), based on a relative format
 * @param  {Date|string} datetime a Date, a timestamp, or a string (ISO 8601, or anything `new Date()` reads)
 * @return {string}
 */
module.exports = function (datetime) {
  return relativeDate(datetime, {
    yesterday: () => 'Yesterday',
    older: date => format(date, 'M/D/YYYY')
  });
};

module.exports.example = {
  code: '{{ dateMinimal "Fri, 13 Jan 2017 18:22:16 GMT" }}',
  result: '"Yesterday"'
};
