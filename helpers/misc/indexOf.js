'use strict';
/**
 * get the index of something inside something else
 * @param  {*} outside array, string, etc (anything with `indexOf`)
 * @param  {*} inside  anything that can exist inside something else
 * @return {number}
 */
module.exports = function (outside, inside) {
  if (!outside) {
    throw new Error('indexOf helper needs something to look inside!');
  } else {
    return outside.indexOf(inside);
  }
};

module.exports.example = {
  code: '{{ indexOf "foo" "o" }}',
  result: '1'
};
