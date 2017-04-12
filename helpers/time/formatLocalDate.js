'use strict';
var dateFormat = require('date-fns/format'),
  defaultFormat = 'M/D/YYYY [at] h:mm a';

/**
 * Formats a date with moment.js
 *
 * @param  {*} date
 * @param {string} [format]
 * @return {string}
 */
module.exports = function (date, format) {
  format = format || defaultFormat;

  return dateFormat(date, format);
};
