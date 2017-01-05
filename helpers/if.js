// overwrite default handlebars if helper
// adds support for an inline helper, {{if foo bar}}
// (if foo is truthy, print bar)

/**
 * if
 * @param  {*} conditional to check for truthiness
 * @param  {*} value       to print if conditional is truthy
 * @param  {object} [options]
 * @return {string}
 */
module.exports = function (conditional, value, options) {
  if (options === undefined) {
    // only two arguments! behave like default handlebars if helper
    options = value;

    return conditional ? options.fn(this) : options.inverse(this);
  } else {
    // do the new inline behavior
    if (conditional) {
      return value;
    } else {
      return options.hash.else || ''; // return falsy value or emptystring
    }
  }
};
