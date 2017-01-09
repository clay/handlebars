const _ = require('lodash'),
  randomstring = require('randomstring');

/**
 * append randomly-generated string to a string
 * e.g. `greatest-hit-` → `greatest-hit-noctz56`
 * @param  {string} str
 * @return {string}
 */
module.exports = function (str) {
  if (!_.isString(str)) {
    str = '';
  }

  return str + randomstring.generate(7);
};
