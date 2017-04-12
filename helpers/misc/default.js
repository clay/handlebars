'use strict';
const _isObject = require('lodash/isObject'),
  _isArray = require('lodash/isArray'),
  _isEmpty = require('lodash/isEmpty');

/**
 * return the first value if it's not empty, otherwise return the second value
 * _note:_ this overrides handlebar-helper's [default](https://github.com/helpers/handlebars-helpers#default) helper, since that only checks for null values (not all falsy/empty values)
 * @param  {*} value to check
 * @param  {*} defaultValue  value to return if first value is falsy
 * @return {*}
 */
module.exports = function (value, defaultValue) {
  if (_isObject(value) || _isArray(value)) {
    return !_isEmpty(value) ? value : defaultValue;
  } else {
    return !!value ? value : defaultValue;
  }
};

module.exports.example = {
  code: '{{ default "" "foo" }}',
  result: 'foo'
};
