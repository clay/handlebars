'use strict';
const moment = require('moment');

function ampm(date) {
  var datestring = ' ' + date.format('a'); // extra space before a.m./p.m.

  return datestring.replace('am', 'a.m.').replace('pm', 'p.m.');
}

/**
 * generate article dates and times, based on a relative format
 * @param  {Date|string} datetime for `moment.js` to parse
 * @return {string}
 */
module.exports = function (datetime) {
  var date = moment(datetime),
    now = moment(),
    yesterday = moment().subtract(1, 'days'),
    // we want an abbreviated version of 'minute' and 'minutes'
    locale = moment.locale('en', {
      relativeTime: {
        s:  '%d seconds ago',
        m:  '%d min ago',
        mm: '%d mins ago'
      }
    });

  if (date.isValid()) {
    // articles < 30 min old should display time-ago"
    if (date.isAfter(now.subtract(31, 'minutes'))) {
      return date.fromNow(locale);
    } else if (date.isSame(now, 'day')) {
      return date.format('h:mm') + ampm(date);
    } else if (date.isSame(yesterday, 'day')) {
      return 'Yesterday at ' + date.format('h:mm') + ampm(date);
    } else {
      return date.format('M/D/YYYY [at] h:mm') + ampm(date);
    }
  } else {
    return '';
  }
};

module.exports.example = {
  code: '{{ articleDate "Fri, 13 Jan 2017 18:22:16 GMT" }}',
  result: '"Yesterday at 6:22 p.m."'
};
