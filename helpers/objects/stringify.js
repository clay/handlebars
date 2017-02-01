'use strict';

/**
 * stringify JSON
 * @param  {object} obj
 * @returns {string}
 */
module.exports = function (obj) {
  return JSON.stringify(obj);
};

module.exports.example = {
  code: '{{{ stringify { a: "b" } }}}',
  result: '"{"a":"b"}"'
};
