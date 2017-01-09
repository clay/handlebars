const _ = require('lodash');

/**
 * Turn an object into a comma-delineated list of key names,
 * based on if their values are true/false
 * e.g. { a: true, b: false, c: true } → a, b, c
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
      result += shouldCapitalize ? _.capitalize(key) : key;
    }

    return result;
  }, '');
};
