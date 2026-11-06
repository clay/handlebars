'use strict';

/**
 * Returns a number within a specified range.
 * @param  {Number} min
 * @param  {Number} max
 * @return {Number}
 */
module.exports = function (min, max) {
  if (!Number.isFinite(min)) {
    throw new Error('Handlebars Helper "random" requires a minimum that is numeric and finite');
  }
  if (!Number.isFinite(max)) {
    throw new Error('Handlebars Helper "random" requires a maximum that is numeric and finite');
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

module.exports.example = {
  code: '{{ random 1 7 }}',
  result: '3'
};
