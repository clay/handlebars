'use strict';
const operators = {
  '===': (l, r) => l === r,
  '!==': (l, r) => l !== r,
  '<': (l, r) => l < r,
  '>': (l, r) => l > r,
  '<=': (l, r) => l <= r,
  '>=': (l, r) => l >= r,
  typeof: (l, r) => typeof l === r
};

/**
 * compare two values, with an operator.
 * _note:_ if you don't pass an operator, it assumes `===`
 * _note:_ this can be used as a block _or_ inline helper
 * @param  {*} left     left value
 * @param  {string} operator to compare with
 * @param  {*} right    right value
 * @param  {object} [options]
 * @return {string} if inline, otherwise calls block functions
 */
module.exports = function (left, operator, right, options) {

  if (arguments.length < 3) { // options is always passed in
    throw new Error('Handlebars Helper "compare" needs 2 parameters');
  }

  if (options === undefined) {
    options = right;
    right = operator;
    operator = '===';
  }

  if (!Object.prototype.hasOwnProperty.call(operators, operator)) { // not `operators[operator]`: 'constructor' and 'toString' are not operators
    throw new Error(`Handlebars Helper "compare" doesn't know the operator ${operator}`);
  }

  const result = operators[operator](left, right);

  // if used as a block helper, this will have options.fn and options.inverse
  // if used inline, simply return true/emptystring
  if (result) {
    return options.fn ? options.fn(this) : true;
  } else {
    return options.inverse ? options.inverse(this) : '';
  }
};

module.exports.example = {
  code: '{{ compare 10 ">" 5 }}',
  result: '"true"'
};
