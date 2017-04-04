'use strict';
var moment = require('moment'),
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

  // moment defaults to using the local time
  return moment(date).format(format);
};

module.exports.setMoment = function (instance) {
  moment = instance;
};

module.exports.getDefaultFormat = function () {
  return defaultFormat;
};