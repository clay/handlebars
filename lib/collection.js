'use strict';
/**
 * Walking what a helper is given, the way lodash's collection functions did: an array or a string is walked by index,
 * an object by its own enumerable properties, and null, undefined or a number is an empty collection. A helper can
 * then use plain array methods on it.
 */

/**
 * @param {*} value
 * @returns {boolean} whether it has a valid length, like an array, a string or an arguments object
 */
function isArrayLike(value) {
  return value !== null && value !== undefined && typeof value !== 'function' && Number.isInteger(value.length) && value.length >= 0 && value.length <= Number.MAX_SAFE_INTEGER;
}

/**
 * @param {*} collection
 * @returns {Array} its values
 */
function toList(collection) {
  if (collection === null || collection === undefined) {
    return [];
  }

  // Array.from (rather than the value itself) so holes in a sparse array are visited, as undefined
  return isArrayLike(collection) ? Array.from(collection) : Object.values(collection);
}

/**
 * @param {*} collection
 * @returns {Array<[string|number, *]>} its [key, value] pairs, where an array's keys are its indexes
 */
function entries(collection) {
  if (collection === null || collection === undefined) {
    return [];
  }

  if (isArrayLike(collection)) {
    return Array.from(collection, (value, index) => [index, value]);
  }

  return Object.keys(collection).map(key => [key, collection[key]]);
}

module.exports = { toList, entries, isArrayLike };
