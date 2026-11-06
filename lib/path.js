'use strict';
/**
 * Read and write a nested value by path ('a.b[0].c'), the way lodash's get and set do, which the getProp and set
 * helpers (and the templates written for them) rely on: a path is a string, an array of keys, or a single key; a key
 * that exists on the object as it is ('a.b') wins over the path it spells; and set creates what is missing (an array
 * where the next key is an index) and ignores a path through __proto__, constructor or prototype.
 */

const isArray = Array.isArray,
  hasOwn = Object.prototype.hasOwnProperty,
  // 'a.b' and 'a[0]' are paths; 'a', '0' and '' are plain keys
  IS_DEEP_PROP = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
  IS_PLAIN_PROP = /^\w*$/,
  // one key of a path: a name, a [0] index, a ["quoted"] key, or the empty key in 'a..b' and 'a[]'
  PROP_NAME = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
  ESCAPE_CHAR = /\\(\\)?/g,
  IS_INDEX = /^(?:0|[1-9]\d*)$/;

/**
 * @param {*} value
 * @returns {boolean} whether it is null or undefined
 */
function isNil(value) {
  return value === null || value === undefined;
}

/**
 * @param {*} value
 * @returns {boolean}
 */
function isObject(value) {
  return value !== null && (typeof value === 'object' || typeof value === 'function');
}

/**
 * @param {*} value
 * @returns {string|symbol} the property key a path segment stands for
 */
function toKey(value) {
  if (typeof value === 'string' || typeof value === 'symbol') {
    return value;
  }

  const key = String(value);

  return key === '0' && 1 / value === -Infinity ? '-0' : key;
}

/**
 * @param {*} path
 * @returns {boolean} whether it is a string that can only be one key: no dot and no bracket (the usual path, so it
 *   skips the work of reading a path)
 */
function isPlainKey(path) {
  return typeof path === 'string' && path.indexOf('.') === -1 && path.indexOf('[') === -1;
}

/**
 * @param {*} value
 * @param {*} object
 * @returns {boolean} whether the value names one property rather than spelling a path
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }

  if (isNil(value) || ['number', 'symbol', 'boolean'].includes(typeof value)) {
    return true;
  }

  return IS_PLAIN_PROP.test(value) || !IS_DEEP_PROP.test(value) || (!isNil(object) && value in Object(object));
}

/**
 * @param {string} string 'a.b[0]["c"]'
 * @returns {string[]} ['a', 'b', '0', 'c']
 */
function stringToPath(string) {
  const keys = [];

  if (string.charCodeAt(0) === 46) { // a leading dot starts with the empty key
    keys.push('');
  }

  string.replace(PROP_NAME, (match, number, quote, quoted) => {
    keys.push(quote ? quoted.replace(ESCAPE_CHAR, '$1') : (number || match));
  });

  return keys;
}

/**
 * @param {*} path
 * @param {*} object
 * @returns {Array} the keys a path stands for
 */
function toPath(path, object) {
  if (isArray(path)) {
    return path;
  }

  return isKey(path, object) ? [path] : stringToPath(String(path));
}

/**
 * @param {*} value
 * @returns {boolean} whether a path segment is an array index
 */
function isIndex(value) {
  return (typeof value === 'number' || (typeof value !== 'symbol' && IS_INDEX.test(value))) && value > -1 && value % 1 === 0 && value < Number.MAX_SAFE_INTEGER;
}

/**
 * The value at a path, or undefined
 * @param {*} object
 * @param {string|string[]|number} path
 * @returns {*}
 */
function get(object, path) {
  if (isNil(object)) {
    return undefined; // before the path is looked at: nothing to read from
  }

  if (isPlainKey(path)) {
    return object[path];
  }

  const keys = toPath(path, object);
  let index = 0;

  while (!isNil(object) && index < keys.length) {
    object = object[toKey(keys[index++])];
  }

  return index && index === keys.length ? object : undefined;
}

/**
 * @param {*} current what a path already holds at this key
 * @param {*} nextKey the key after it
 * @returns {object} what to keep going in: the object that is there, or a new array (for an index) or object
 */
function childFor(current, nextKey) {
  if (isObject(current)) {
    return current;
  }

  return isIndex(nextKey) ? [] : {};
}

/**
 * @param {string|symbol} key
 * @returns {boolean} whether writing to it could change what every object inherits
 */
function isUnsafeKey(key) {
  return key === '__proto__' || key === 'constructor' || key === 'prototype';
}

/**
 * Write a property if that changes anything, and if the target is an object (a number or string on the way is left
 * alone). A write that is refused (a frozen object) is ignored rather than thrown.
 * @param {*} target
 * @param {string|symbol} key
 * @param {*} value
 */
function assign(target, key, value) {
  if (!isObject(target)) {
    return;
  }

  const current = target[key];

  // the property is already its own, with this value
  if ((current === value || (Number.isNaN(current) && Number.isNaN(value))) && hasOwn.call(target, key)) {
    return;
  }

  try {
    target[key] = value;
  } catch (error) {
    // a refusal (frozen, sealed, a getter without a setter) comes back as false here, anything else the write threw is thrown again
    Reflect.set(target, key, value);
  }
}

/**
 * @param {object} object
 * @param {string|string[]|number} path
 * @param {*} value
 * @returns {object} the object, with the value at the path
 */
function setPath(object, path, value) {
  const keys = toPath(path, object);
  let nested = object;

  for (let index = 0; !isNil(nested) && index < keys.length; index++) {
    const key = toKey(keys[index]);

    if (isUnsafeKey(key)) {
      return object;
    }

    assign(nested, key, index === keys.length - 1 ? value : childFor(nested[key], keys[index + 1]));
    nested = nested[key];
  }

  return object;
}

/**
 * Set the value at a path, creating the objects and arrays on the way. Changes the object, and returns it. A value
 * that isn't an object comes back untouched, and a property that can't be written (a frozen object) is left alone
 * rather than throwing.
 * @param {object} object
 * @param {string|string[]|number} path
 * @param {*} value
 * @returns {*} the object
 */
function set(object, path, value) {
  if (!isObject(object)) {
    return object;
  }

  if (!isPlainKey(path)) {
    return setPath(object, path, value);
  }

  if (!isUnsafeKey(path)) {
    assign(object, path, value);
  }

  return object;
}

module.exports = { get, set, isObject };
