'use strict';
const relativeDate = require('../../lib/relative-date'),
  { format } = require('../../lib/date');

/**
 * generate article dates and times, based on a relative format
 * @param  {Date|string} datetime a Date, a timestamp, or a string (ISO 8601, or anything `new Date()` reads)
 * @return {string}
 */
module.exports = function (datetime) {
  return relativeDate(datetime, {
    yesterday: date => `Yesterday at ${format(date, 'h:mm aa')}`,
    older: date => format(date, 'M/D/YYYY [at] h:mm aa')
  });
};

module.exports.example = {
  code: '{{ articleDate "Fri, 13 Jan 2017 18:22:16 GMT" }}',
  result: '"Yesterday at 6:22 p.m."'
};
