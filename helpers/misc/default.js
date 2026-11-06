'use strict';
const isEmpty = require('../../lib/is-empty');

/**
 * return the first value if it's not empty, otherwise return the second value
 * _note:_ this overrides handlebar-helper's [default](https://github.com/helpers/handlebars-helpers#default) helper, since that only checks for null values (not all falsy/empty values)
 * @param  {*} value to check
 * @param  {*} defaultValue  value to return if first value is falsy
 * @return {*}
 */
module.exports = function (value, defaultValue) {
  if (value !== null && (typeof value === 'object' || typeof value === 'function')) {
    return !isEmpty(value) ? value : defaultValue;
  } else {
    return value ? value : defaultValue;
  }
};

module.exports.example = {
  code: '{{ default "" "foo" }}',
  result: 'foo'
};
