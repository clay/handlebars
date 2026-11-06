'use strict';
/**
 * Date parsing and formatting that behaves like date-fns 1.x, which the time helpers used until now,
 * so templates written against it render the same. English only, local time zone, no dependencies.
 *
 * The parser and the formatter follow date-fns 1.30.1 (MIT, https://github.com/date-fns/date-fns/tree/v1.30.1):
 * its ISO 8601 parser reads a date without a time zone as local time (`new Date('2017-01-13')` reads it as
 * UTC), and its token formatter is what `{{formatLocalDate date "M/D/YYYY [at] h:mm a"}}` has always meant.
 */

const MS_IN_MINUTE = 60000,
  MS_IN_HOUR = 3600000,
  MS_IN_DAY = 86400000,
  MS_IN_WEEK = 604800000;

// ---- parse ----------------------------------------------------------------------------------------------------

const DATE_TIME_DELIMITER = /[T ]/,
  PLAIN_TIME = /:/,
  // year
  YY = /^(\d{2})$/,
  YYY = /^([+-]\d{4})$/,
  YYYY = /^(\d{4})/,
  YYYYY = /^([+-]\d{6})/,
  // date
  MM = /^-(\d{2})$/,
  DDD = /^-?(\d{3})$/,
  MMDD = /^-?(\d{2})-?(\d{2})$/,
  WWW = /^-?W(\d{2})$/,
  WWWD = /^-?W(\d{2})-?(\d{1})$/,
  // time
  HH = /^(\d{2}([.,]\d*)?)$/,
  HHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/,
  HHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/,
  // time zone
  TIMEZONE = /([Z+-].*)$/,
  TIMEZONE_Z = /^(Z)$/,
  TIMEZONE_HH = /^([+-])(\d{2})$/,
  TIMEZONE_HHMM = /^([+-])(\d{2}):?(\d{2})$/;

/**
 * Split '2017-01-13T18:22:16+05:30' into its date, time and time zone strings
 * @param {string} dateString
 * @returns {object}
 */
function splitDateString(dateString) {
  const parts = dateString.split(DATE_TIME_DELIMITER),
    result = {};
  let timeString, zone;

  if (PLAIN_TIME.test(parts[0])) {
    result.date = null;
    timeString = parts[0];
  } else {
    result.date = parts[0];
    timeString = parts[1];
  }

  if (timeString) {
    zone = TIMEZONE.exec(timeString);

    if (zone) {
      result.time = timeString.replace(zone[1], '');
      result.timezone = zone[1];
    } else {
      result.time = timeString;
    }
  }

  return result;
}

/**
 * @param {string} dateString
 * @returns {{year: ?number, rest: string}}
 */
function parseYear(dateString) {
  // YYYY or ±YYYYYY
  let token = YYYY.exec(dateString) || YYYYY.exec(dateString);

  if (token) {
    return { year: parseInt(token[1], 10), rest: dateString.slice(token[1].length) };
  }

  // YY or ±YYYY
  token = YY.exec(dateString) || YYY.exec(dateString);

  if (token) {
    return { year: parseInt(token[1], 10) * 100, rest: dateString.slice(token[1].length) };
  }

  return { year: null };
}

/**
 * The date of an ISO week-numbering year, as UTC midnight
 * @param {number} isoYear
 * @param {number} week zero-based
 * @param {number} [day] zero-based
 * @returns {Date}
 */
function dayOfISOYear(isoYear, week, day) {
  const date = new Date(0);

  date.setUTCFullYear(isoYear, 0, 4);
  date.setUTCDate(date.getUTCDate() + (week || 0) * 7 + (day || 0) + 1 - (date.getUTCDay() || 7));

  return date;
}

/**
 * The date part of an ISO 8601 string as UTC midnight, or null if it isn't one
 * @param {string} dateString what is left after the year
 * @param {?number} year
 * @returns {?Date}
 */
function parseDate(dateString, year) {
  const date = new Date(0);
  let token;

  if (year === null) {
    return null;
  }

  if (dateString.length === 0) { // YYYY
    date.setUTCFullYear(year);
    return date;
  }

  if ((token = MM.exec(dateString))) { // YYYY-MM
    date.setUTCFullYear(year, parseInt(token[1], 10) - 1);
    return date;
  }

  if ((token = DDD.exec(dateString))) { // YYYY-DDD, YYYYDDD
    date.setUTCFullYear(year, 0, parseInt(token[1], 10));
    return date;
  }

  if ((token = MMDD.exec(dateString))) { // YYYY-MM-DD, YYYYMMDD
    date.setUTCFullYear(year, parseInt(token[1], 10) - 1, parseInt(token[2], 10));
    return date;
  }

  if ((token = WWW.exec(dateString))) { // YYYY-Www, YYYYWww
    return dayOfISOYear(year, parseInt(token[1], 10) - 1);
  }

  if ((token = WWWD.exec(dateString))) { // YYYY-Www-D, YYYYWwwD
    return dayOfISOYear(year, parseInt(token[1], 10) - 1, parseInt(token[2], 10) - 1);
  }

  return null;
}

/**
 * @param {string} timeString
 * @returns {?number} milliseconds since midnight
 */
function parseTime(timeString) {
  let token = HH.exec(timeString);

  if (token) { // hh
    return (parseFloat(token[1].replace(',', '.')) % 24) * MS_IN_HOUR;
  }

  if ((token = HHMM.exec(timeString))) { // hh:mm, hhmm
    return (parseInt(token[1], 10) % 24) * MS_IN_HOUR + parseFloat(token[2].replace(',', '.')) * MS_IN_MINUTE;
  }

  if ((token = HHMMSS.exec(timeString))) { // hh:mm:ss, hhmmss
    return (parseInt(token[1], 10) % 24) * MS_IN_HOUR + parseInt(token[2], 10) * MS_IN_MINUTE + parseFloat(token[3].replace(',', '.')) * 1000;
  }

  return null;
}

/**
 * @param {string} timezoneString
 * @returns {number} the offset in minutes, as getTimezoneOffset() gives it (UTC+5:30 is -330)
 */
function parseTimezone(timezoneString) {
  let token = TIMEZONE_Z.exec(timezoneString),
    offset;

  if (token) {
    return 0;
  }

  if ((token = TIMEZONE_HH.exec(timezoneString))) { // ±hh
    offset = parseInt(token[2], 10) * 60;
    return token[1] === '+' ? -offset : offset;
  }

  if ((token = TIMEZONE_HHMM.exec(timezoneString))) { // ±hh:mm, ±hhmm
    offset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === '+' ? -offset : offset;
  }

  return 0;
}

/**
 * The time zone offset of a moment in milliseconds, keeping the milliseconds that some time zones
 * (historic ones) have in it.
 * @param {Date} date
 * @returns {number}
 */
function timezoneOffsetMs(date) {
  const copy = new Date(date.getTime()),
    base = copy.getTimezoneOffset();

  copy.setSeconds(0, 0);

  return base * MS_IN_MINUTE + (copy.getTime() % MS_IN_MINUTE);
}

/**
 * The local time zone offset to add to a time that has no zone of its own, in milliseconds
 * @param {number} fullTime the time as if it were UTC
 * @returns {number}
 */
function localOffset(fullTime) {
  const fullDate = new Date(fullTime),
    nextDay = new Date(fullTime);
  let offset = timezoneOffsetMs(fullDate);

  // adjust time when it's coming from DST
  nextDay.setDate(fullDate.getDate() + 1);

  const offsetDiff = timezoneOffsetMs(nextDay) - timezoneOffsetMs(fullDate);

  if (offsetDiff > 0) {
    offset += offsetDiff;
  }

  return offset;
}

/**
 * Turn what the helpers are given into a Date. A Date is copied, a number is a timestamp, a string is read as
 * ISO 8601 (complete or partial) in local time unless it names a time zone, and anything else is left to
 * `new Date()`.
 * @param {Date|string|number} argument
 * @returns {Date} possibly an Invalid Date
 */
function parse(argument) {
  if (argument instanceof Date) {
    return new Date(argument.getTime());
  }

  if (typeof argument !== 'string') {
    return new Date(argument);
  }

  const parts = splitDateString(argument),
    parsedYear = parseYear(parts.date),
    date = parseDate(parsedYear.rest, parsedYear.year);

  if (!date) {
    return new Date(argument);
  }

  const time = parts.time ? parseTime(parts.time) : 0,
    timestamp = date.getTime();

  return new Date(timestamp + time + (parts.timezone ? parseTimezone(parts.timezone) * MS_IN_MINUTE : localOffset(timestamp + time)));
}

// ---- calendar arithmetic ---------------------------------------------------------------------------------------

/**
 * @param {Date|string|number} value
 * @returns {Date} the start of that day, local time
 */
function startOfDay(value) {
  const date = parse(value);

  date.setHours(0, 0, 0, 0);

  return date;
}

/**
 * @param {Date} date
 * @returns {Date} the Monday on or before the date, at midnight
 */
function startOfISOWeek(date) {
  const copy = parse(date),
    day = copy.getDay();

  copy.setDate(copy.getDate() - ((day < 1 ? 7 : 0) + day - 1));
  copy.setHours(0, 0, 0, 0);

  return copy;
}

/**
 * @param {number} year
 * @returns {Date} the first day of the ISO week-numbering year, at midnight
 */
function startOfISOYearFor(year) {
  const fourthOfJanuary = new Date(0);

  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);

  return startOfISOWeek(fourthOfJanuary);
}

/**
 * @param {Date} date
 * @returns {number} the ISO week-numbering year
 */
function getISOYear(date) {
  const year = date.getFullYear();

  if (date.getTime() >= startOfISOYearFor(year + 1).getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfISOYearFor(year).getTime()) {
    return year;
  }

  return year - 1;
}

/**
 * @param {Date} date
 * @returns {number} the ISO week, 1 to 53
 */
function getISOWeek(date) {
  // rounded, because a week isn't always the same number of milliseconds (daylight saving time)
  return Math.round((startOfISOWeek(date).getTime() - startOfISOYearFor(getISOYear(date)).getTime()) / MS_IN_WEEK) + 1;
}

/**
 * @param {Date} left
 * @param {Date} right
 * @returns {number} calendar days between the two, rounded because a day isn't always 24 hours
 */
function differenceInCalendarDays(left, right) {
  const l = startOfDay(left),
    r = startOfDay(right);

  return Math.round(((l.getTime() - l.getTimezoneOffset() * MS_IN_MINUTE) - (r.getTime() - r.getTimezoneOffset() * MS_IN_MINUTE)) / MS_IN_DAY);
}

/**
 * @param {Date} date
 * @returns {number} the day of the year, 1 to 366
 */
function getDayOfYear(date) {
  const startOfYear = new Date(0);

  startOfYear.setFullYear(date.getFullYear(), 0, 1);
  startOfYear.setHours(0, 0, 0, 0);

  return differenceInCalendarDays(date, startOfYear) + 1;
}

/**
 * @param {Date|string|number} date
 * @param {number} amount
 * @returns {Date} the date, `amount` days earlier
 */
function subDays(date, amount) {
  const result = parse(date);

  result.setDate(result.getDate() - Number(amount));

  return result;
}

/**
 * @param {Date|string|number} left
 * @param {Date|string|number} right
 * @returns {boolean}
 */
function isSameDay(left, right) {
  return startOfDay(left).getTime() === startOfDay(right).getTime();
}

/**
 * @param {Date} date
 * @returns {boolean}
 */
function isValid(date) {
  return date instanceof Date && !isNaN(date);
}

/**
 * Whole units between two moments, truncated towards zero
 * @param {number} ms milliseconds
 * @param {number} unit milliseconds in the unit
 * @returns {number}
 */
function truncatedDifference(ms, unit) {
  const diff = ms / unit;

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}

/**
 * @param {Date|string|number} left
 * @param {Date|string|number} right
 * @returns {number} whole minutes from right to left
 */
function differenceInMinutes(left, right) {
  return truncatedDifference(parse(left).getTime() - parse(right).getTime(), MS_IN_MINUTE);
}

/**
 * How far apart two moments are, in the whole seconds or minutes the "x seconds ago" and "x mins ago" texts
 * count (date-fns' distanceInWordsStrict with `unit` 's' or 'm'). The distance is always positive, whichever
 * moment comes first.
 * @param {Date|string|number} now
 * @param {Date|string|number} date
 * @param {'s'|'m'} unit
 * @returns {number}
 */
function distanceStrict(now, date, unit) {
  const a = parse(now),
    b = parse(date),
    later = a.getTime() > b.getTime() ? a : b,
    earlier = later === a ? b : a,
    seconds = truncatedDifference(later.getTime() - earlier.getTime(), 1000);

  if (unit === 's') {
    return seconds;
  }

  // minutes, adjusted for the clocks changing between the two moments
  return Math.floor(seconds / 60) - (later.getTimezoneOffset() - earlier.getTimezoneOffset());
}

// ---- format ----------------------------------------------------------------------------------------------------

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  WEEKDAYS_2 = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  WEEKDAYS_3 = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * @param {number} number
 * @param {number} length
 * @returns {string} the number's digits, padded with zeros
 */
function pad(number, length) {
  return Math.abs(number).toString().padStart(length, '0');
}

/**
 * @param {number} number
 * @returns {string} 1st, 2nd, 3rd, 4th ...
 */
function ordinal(number) {
  const rem100 = number % 100;

  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + 'st';
      case 2:
        return number + 'nd';
      case 3:
        return number + 'rd';
      default:
        break;
    }
  }

  return number + 'th';
}

/**
 * @param {number} offset minutes, as getTimezoneOffset() gives them
 * @param {string} [delimiter]
 * @returns {string} +05:30, -0500 ...
 */
function formatTimezone(offset, delimiter) {
  const abs = Math.abs(offset);

  return (offset > 0 ? '-' : '+') + pad(Math.floor(abs / 60), 2) + (delimiter || '') + pad(abs % 60, 2);
}

function hours12(date) {
  const hours = date.getHours();

  if (hours === 0) {
    return 12;
  }

  return hours > 12 ? hours % 12 : hours;
}

const pm = date => date.getHours() / 12 >= 1,
  formatters = {
    M: date => date.getMonth() + 1,
    MM: date => pad(date.getMonth() + 1, 2),
    MMM: date => MONTHS_SHORT[date.getMonth()],
    MMMM: date => MONTHS[date.getMonth()],
    Q: date => Math.ceil((date.getMonth() + 1) / 3),
    D: date => date.getDate(),
    DD: date => pad(date.getDate(), 2),
    DDD: date => getDayOfYear(date),
    DDDD: date => pad(getDayOfYear(date), 3),
    d: date => date.getDay(),
    dd: date => WEEKDAYS_2[date.getDay()],
    ddd: date => WEEKDAYS_3[date.getDay()],
    dddd: date => WEEKDAYS[date.getDay()],
    E: date => date.getDay() || 7,
    W: date => getISOWeek(date),
    WW: date => pad(getISOWeek(date), 2),
    YY: date => pad(date.getFullYear(), 4).slice(2),
    YYYY: date => pad(date.getFullYear(), 4),
    GG: date => String(getISOYear(date)).slice(2),
    GGGG: date => getISOYear(date),
    H: date => date.getHours(),
    HH: date => pad(date.getHours(), 2),
    h: hours12,
    hh: date => pad(hours12(date), 2),
    m: date => date.getMinutes(),
    mm: date => pad(date.getMinutes(), 2),
    s: date => date.getSeconds(),
    ss: date => pad(date.getSeconds(), 2),
    S: date => Math.floor(date.getMilliseconds() / 100),
    SS: date => pad(Math.floor(date.getMilliseconds() / 10), 2),
    SSS: date => pad(date.getMilliseconds(), 3),
    Z: date => formatTimezone(date.getTimezoneOffset(), ':'),
    ZZ: date => formatTimezone(date.getTimezoneOffset()),
    X: date => Math.floor(date.getTime() / 1000),
    x: date => date.getTime(),
    A: date => (pm(date) ? 'PM' : 'AM'),
    a: date => (pm(date) ? 'pm' : 'am'),
    aa: date => (pm(date) ? 'p.m.' : 'a.m.')
  };

// the ordinal version of some tokens: M -> Mo, D -> Do ...
['M', 'D', 'DDD', 'd', 'Q', 'W'].forEach((token) => {
  formatters[token + 'o'] = date => ordinal(formatters[token](date));
});

// longest tokens first, so 'YYYY' wins over 'YY'; [escaped text] and \-escaped characters come before any token
const TOKENS = new RegExp('(\\[[^\\[]*\\])|(\\\\)?(' + Object.keys(formatters).sort().reverse().join('|') + '|.)', 'g'),
  DEFAULT_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';

/**
 * @param {string} piece a piece of the format string that isn't a token
 * @returns {string} what to print for it
 */
function literal(piece) {
  return piece.match(/\[[\s\S]/) ? piece.replace(/^\[|]$/g, '') : piece.replace(/\\/g, '');
}

/**
 * Format a date with date-fns' tokens: M MM MMM MMMM Mo, Q Qo, D DD Do, DDD DDDD DDDo, d do dd ddd dddd, E,
 * W WW Wo, YY YYYY, GG GGGG, H HH h hh, m mm, s ss, S SS SSS, Z ZZ, X x, A a aa. Text in [brackets] is
 * printed as is.
 * @param {Date|string|number} value anything `parse` takes
 * @param {string} [formatString] defaults to an ISO 8601 date and time
 * @returns {string} 'Invalid Date' if the value isn't a date
 */
function format(value, formatString) {
  const date = parse(value);

  if (!isValid(date)) {
    return 'Invalid Date';
  }

  return (formatString ? String(formatString) : DEFAULT_FORMAT).match(TOKENS).map((piece) => {
    return formatters[piece] ? formatters[piece](date) : literal(piece);
  }).join('');
}

module.exports = {
  parse,
  format,
  isValid,
  isSameDay,
  subDays,
  differenceInMinutes,
  distanceStrict
};
