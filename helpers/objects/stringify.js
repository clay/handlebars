'use strict';
const stringify = require('json-stringify-safe');

/**
 * stringify JSON
 * _note:_ doesn't blow up on circular references
 * @param  {object} obj
 * @returns {string}
 */
module.exports = function (obj) {
  return stringify(obj, null, 0);
};

module.exports.example = {
  code: '{{{ stringify { a: "b" } }}}',
  result: '"{"a":"b"}"'
};
