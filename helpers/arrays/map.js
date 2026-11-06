'use strict';
const { get } = require('../../lib/path');

/**
 * map through array, call function on each item
 * _note:_ instead of a function you can pass a property name, like `"title"`, to collect that property of each item
 * @param {array|string} array of items to iterate through
 * @param {function} fn to run on each item
 * @return {array}
 */
module.exports = function (array, fn) {
  let items;

  if (Array.isArray(array)) {
    items = array;
  } else if (typeof array === 'string' || array instanceof String) {
    items = String(array).split('');
  } else {
    return [];
  }

  // a function; or a property name to read from each item; or, with neither, the items as they are
  if (typeof fn !== 'function') {
    const readsProperty = ['string', 'number', 'boolean', 'symbol'].includes(typeof fn) || fn instanceof String,
      property = fn;

    fn = readsProperty ? item => get(item, property) : item => item;
  }

  // a loop rather than items.map, so the holes of a sparse array are visited too
  const mapped = new Array(items.length);

  for (let index = 0; index < items.length; index++) {
    mapped[index] = fn(items[index], index, items);
  }

  return mapped;
};

module.exports.example = {
  code: '{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a")) }}',
  result: '"1, 2"'
};
