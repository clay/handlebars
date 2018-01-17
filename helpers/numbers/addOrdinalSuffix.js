'use strict';

function mod10(num) {
  return num % 10;
}

function mod100(num) {
  return num % 100;
}

function isFirst(num) {
  return mod10(num) === 1 && mod100(num) !== 11;
}

function isSecond(num) {
  return mod10(num) === 2 && mod100(num) !== 12;
}

function isFourth(num) {
  return mod10(num) === 3 && mod100(num) !== 13;
}

/**
 * add ordinal after a number
 * e.g. `1` → `1st`, `2` → `2nd`, `3` → `3rd`
 * @param  {number|string} num number to add ordinal after
 * @return {string}
 */
module.exports = function (num) {
  // if no number is supplied, pass through string
  if (num === '' || isNaN(num)) { // will check numbers and (numbers in) strings
    return new String(num); // will convert to a string if it's a different type
  } else if (isFirst(num)) {
    return `${num}st`;
  } else if (isSecond(num)) {
    return `${num}nd`;
  } else if (isFourth(num)) {
    return `${num}rd`;
  } else {
    return `${num}th`;
  }
};

module.exports.example = {
  code: '{{ addOrdinalSuffix 1 }}',
  result: '1st'
};
