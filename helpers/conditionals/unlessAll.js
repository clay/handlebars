'use strict';
const _initial = require('lodash/initial'),
  _last = require('lodash/last'),
  _takeWhile = require('lodash/takeWhile');

/**
 * block helper for checking that NOT ALL arguments passed in are truthy
 * _note:_ this is the inverse of the ifAll helper
 * @return {string} calls block functions
 */
module.exports = function () {
  const conditionals = _initial(arguments),
    options = _last(arguments),
    taken = _takeWhile(conditionals, c => !!c === true);

    // see if any of the conditionals are falsy without needing to
    // iterate through all of them

  if (taken.length === conditionals.length) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
};

module.exports.example = {
  code: `{{#unlessAll foo bar baz}}
  not all are truthy
{{else}}
  all are truthy
{{/ifAll}}`
};
