'use strict';
/**
 * Whether a value is empty, the way lodash's isEmpty decides it (which is what the `default` helper has always
 * used): an array, string, typed array or arguments object is empty when its length is 0, a Map or Set when its
 * size is 0, and any other object when it has no own enumerable properties. That makes a Date or a function
 * "empty", and it is why `{{default someDate "x"}}` gives "x".
 */
const { isArrayLike } = require('./collection'),
  hasOwn = Object.prototype.hasOwnProperty,
  tagOf = value => Object.prototype.toString.call(value),
  objectProto = Object.prototype;

/**
 * @param {*} value
 * @returns {boolean}
 */
function isPrototype(value) {
  const Ctor = value && value.constructor;

  return value === ((typeof Ctor === 'function' && Ctor.prototype) || objectProto);
}

/**
 * @param {*} value
 * @returns {boolean} whether it is a Buffer or a typed array
 */
function isBinary(value) {
  return (typeof Buffer !== 'undefined' && Buffer.isBuffer(value)) || (ArrayBuffer.isView(value) && !(value instanceof DataView));
}

/**
 * @param {*} value
 * @returns {boolean} whether it is a list that is empty when its length is
 */
function isSequence(value) {
  return isArrayLike(value) && (Array.isArray(value) || typeof value === 'string' || typeof value.splice === 'function' ||
    isBinary(value) || tagOf(value) === '[object Arguments]');
}

/**
 * @param {*} value
 * @returns {boolean} whether it has an own enumerable property (a prototype's `constructor` doesn't count)
 */
function hasOwnEntries(value) {
  for (const key in value) {
    if (hasOwn.call(value, key) && !(isPrototype(value) && key === 'constructor')) {
      return true;
    }
  }

  return false;
}

/**
 * @param {*} value
 * @returns {boolean}
 */
module.exports = function isEmpty(value) {
  if (value === null || value === undefined) {
    return true;
  }

  if (isSequence(value)) {
    return !value.length;
  }

  if (tagOf(value) === '[object Map]' || tagOf(value) === '[object Set]') {
    return !value.size;
  }

  return !hasOwnEntries(value);
};
