module.exports = function (dividend, divisor, remainder, options) {
  var result = dividend % divisor;

  // if used as a block helper, this will have options.fn and options.inverse
  // if used inline, simply return true/emptystring
  if (result === remainder) {
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : '';
  }
};
