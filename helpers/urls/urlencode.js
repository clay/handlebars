'use strict';
const _isString = require('lodash/isString'),
  _isArray = require('lodash/isArray'),
  _forOwn = require('lodash/forOwn');

/**
 * encode urls (ported from the nunjucks `urlencode` filter)
 * _note:_ `handlebars-helpers` contains an `encodeURI` helper, but it doesn't handle arrays or objects.
 * @param  {*} obj data to encode
 * @return {string} urlencoded data
 */
module.exports = function (obj) {
  if (_isString(obj)) {
    return encodeURIComponent(obj);
  } else {
    let parts;

    if (_isArray(obj)) {
      parts = obj.map(function (item) {
        return encodeURIComponent(item[0]) + '=' + encodeURIComponent(item[1]);
      });
    } else {
      parts = [];

      _forOwn(obj, function (val, key) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      });
    }

    return parts.join('&');
  }
};

module.exports.example = {
  code: '{{ urlencode "&" }}',
  result: '"%26"'
};
