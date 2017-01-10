'use strict';
/**
 * get a component's name from the reference
 * @param  {string} ref
 * @return {string}
 */
module.exports = function (ref) {
  var result = /components\/(.+?)[\/\.]/.exec(ref) || /components\/(.*)/.exec(ref);

  return result && result[1];
};
