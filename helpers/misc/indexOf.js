'use strict';
module.exports = function (outside, inside) {
  if (!outside) {
    throw new Error('indexOf helper needs something to look inside!');
  } else {
    return outside.indexOf(inside);
  }
};
