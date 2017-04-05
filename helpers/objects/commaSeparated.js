'use strict';
const _ = require('lodash');

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
  if (_.isObject(shouldCapitalize)) {
    // no explicit shouldCapitalize argument passed in
    // (it's seeing the options object passed in as second argument),
    // so default to false
    shouldCapitalize = false;
  }

  return _.reduce(obj, function (result, value, key) {

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
