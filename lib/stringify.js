'use strict';

/**
 * JSON.stringify that doesn't throw on a circular reference: the second visit of an object is written as
 * "[Circular ~]" (the root) or "[Circular ~.a.b]" (the path to the object it points back to). Same output as
 * the json-stringify-safe package, which the stringify helper used.
 * @param {*} value
 * @returns {string|undefined}
 */
module.exports = function stringify(value) {
  const stack = [], keys = [];

  return JSON.stringify(value, function (key, current) {
    let position;

    if (stack.length > 0) {
      position = stack.indexOf(this);

      if (~position) {
        stack.splice(position + 1);
        keys.splice(position, Infinity, key);
      } else {
        stack.push(this);
        keys.push(key);
      }

      if (~stack.indexOf(current)) {
        current = stack[0] === current ? '[Circular ~]' : '[Circular ~.' + keys.slice(0, stack.indexOf(current)).join('.') + ']';
      }
    } else {
      stack.push(current);
    }

    return current;
  }, 0);
};
