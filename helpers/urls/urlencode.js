const _ = require('lodash');

// ported from the nunjucks urlencode filter
// note: handlebars-helpers' `encodeURI` doesn't handle arrays or objects
module.exports = function (obj) {
  if (_.isString(obj)) {
    return encodeURIComponent(obj);
  } else {
    let parts;

    if (_.isArray(obj)) {
      parts = obj.map(function (item) {
        return encodeURIComponent(item[0]) + '=' + encodeURIComponent(item[1]);
      });
    } else {
      parts = [];

      _.forOwn(obj, function (val, key) {
        parts.push(encodeURIComponent(key) + '=' + encodeURIComponent(val));
      });
    }

    return parts.join('&');
  }
};
