'use strict';

const MAX_VALUE = Number.MAX_VALUE;

/**
 * @param {string} string ' 12 ', '0b11', '0o7', '-0x1f' ...
 * @returns {number} the number it spells: binary and octal are read, a signed hexadecimal is not
 */
function stringToNumber(string) {
  const value = string.trim();

  if (/^0b[01]+$/i.test(value)) {
    return parseInt(value.slice(2), 2);
  }

  if (/^0o[0-7]+$/i.test(value)) {
    return parseInt(value.slice(2), 8);
  }

  return /^[-+]0x[0-9a-f]+$/i.test(value) ? NaN : +value;
}

/**
 * @param {*} value
 * @returns {*} an object's valueOf(), as a string if that is still an object; any other value as it is
 */
function toPrimitive(value) {
  if (value === null || typeof value !== 'object') {
    return value;
  }

  const primitive = typeof value.valueOf === 'function' ? value.valueOf() : value;

  return primitive !== null && typeof primitive === 'object' ? String(primitive) : primitive;
}

/**
 * @param {*} value
 * @returns {number} the number a string, boolean, object ... means (' 12 ', '0b11', '0x1f', {valueOf}), or NaN
 */
function toNumber(value) {
  if (typeof value === 'number') {
    return value;
  }

  if (typeof value === 'symbol') {
    return NaN;
  }

  const primitive = toPrimitive(value);

  if (typeof primitive === 'string') {
    return stringToNumber(primitive);
  }

  return primitive === 0 ? primitive : +primitive;
}

/**
 * @param {*} value
 * @returns {number} a finite number: Infinity becomes the largest number there is, NaN becomes 0
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }

  value = toNumber(value);

  if (value === Infinity || value === -Infinity) {
    return (value < 0 ? -1 : 1) * MAX_VALUE;
  }

  return Number.isNaN(value) ? 0 : value;
}

/**
 * the numbers from `start` up to (not including) `end`, counting down when `end` is the smaller one
 * @param {*} start
 * @param {*} end
 * @returns {number[]}
 */
function numbersBetween(start, end) {
  let length, index = -1;

  start = toFinite(start);

  if (end === undefined) {
    end = start;
    start = 0;
  } else {
    end = toFinite(end);
  }

  const step = start < end ? 1 : -1;
  length = Math.max(Math.ceil((end - start) / step), 0);
  const range = new Array(length);

  while (length--) {
    range[++index] = start;
    start += step;
  }

  return range;
}

/**
 * return an array of numbers, in order
 * _note:_ can be used inline or as a block helper (will iterate through all numbers)
 * @param  {number} [start] on this number (defaults to 0)
 * @param  {number} end  on this number
 * @param {object} [options]
 * @return {array}
 */
module.exports = function (start, end, options) {

  if (typeof end !== 'number' && !(end instanceof Number)) {
    // if they only specify one argument, start from 0
    options = end;
    end = start;
    start = 0;
  }

  const range = numbersBetween(start, end);

  if (options && options.fn) {
    // block-level, iterate through the range!
    // pass each number as the context to options.fn
    return range.map(options.fn).join('');
  } else {
    return range;
  }
};

module.exports.example = {
  code: '{{#range 1 5}}{{ this }}{{/range}}',
  result: '1234'
};
