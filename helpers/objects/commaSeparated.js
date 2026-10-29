'use strict';
const { entries } = require('../../lib/collection');

// capitalizes the first letter in the first word
function capitalizeFirstWord(key) {
  return key.charAt(0).toUpperCase() + key.slice(1);
}

/**
 * Turn an object into a comma-delineated list of key names, depending if their values are true/false
 * @param  {object} obj
 * @param  {boolean} shouldCapitalize capitalizes first word in each key
 * @return {string}
 */
module.exports = function (obj, shouldCapitalize) {
  if (shouldCapitalize !== null && (typeof shouldCapitalize === 'object' || typeof shouldCapitalize === 'function')) {
    // no explicit shouldCapitalize argument passed in
    // (it's seeing the options object passed in as second argument),
    // so default to false
    shouldCapitalize = false;
  }

  return entries(obj).reduce(function (result, [key, value]) {
    if (value) {
      result = result ? result + ', ' : result; // if result already has stuff in it, add a comma
      result += shouldCapitalize ? capitalizeFirstWord(key) : key;
    }

    return result;
  }, '');
};

module.exports.example = {
  code: '{{ commaSeparated {alpha: true, "bravo charlie": true} true }}',
  result: '"Alpha, Bravo charlie"'
};
