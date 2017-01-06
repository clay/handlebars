const operators = {
  '===': (l, r) => l === r,
  '!==': (l, r) => l !== r,
  '<': (l, r) => l < r,
  '>': (l, r) => l > r,
  '<=': (l, r) => l <= r,
  '>=': (l, r) => l >= r,
  typeof: (l, r) => typeof l == r
};

/**
 * compare two values, with an operator
 * note: if you don't pass an operator, it assumes '==='
 * @param  {*} left     left value
 * @param  {string} operator
 * @param  {*} right    right value
 * @param  {object} [options]
 * @return {string}
 */
module.exports = function (left, operator, right, options) {
  let result;

  if (arguments.length < 2) {
    throw new Error('Handlerbars Helper "compare" needs 2 parameters');
  }

  if (options === undefined) {
    options = right;
    right = operator;
    operator = '===';
  }

  if (!operators[operator]) {
    throw new Error(`Handlerbars Helper "compare" doesn't know the operator ${operator}`);
  }

  result = operators[operator](left, right);

  // if used as a block helper, this will have options.fn and options.inverse
  // if used inline, simply return true/emptystring
  if (result) {
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : '';
  }
};
