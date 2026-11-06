'use strict';

/**
 * encode urls (ported from the nunjucks `urlencode` filter)
 * _note:_ `handlebars-helpers` contains an `encodeURI` helper, but it doesn't handle arrays or objects.
 * @param  {*} obj data to encode
 * @return {string} urlencoded data
 */
module.exports = function (obj) {
  if (typeof obj === 'string' || obj instanceof String) {
    return encodeURIComponent(obj);
  }

  const pairs = Array.isArray(obj) ? obj.map(item => [item[0], item[1]]) : Object.keys(Object(obj)).map(key => [key, obj[key]]);

  return pairs.map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
};

module.exports.example = {
  code: '{{ urlencode "&" }}',
  result: '"%26"'
};
