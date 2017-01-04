const operators = {
  '===': (l, r) => l === r,
  '!=': (l, r) => l != r,
  '!==': (l, r) => l !== r,
  '<': (l, r) => l < r,
  '>': (l, r) => l > r,
  '<=': (l, r) => l <= r,
  '>=': (l, r) => l >= r,
  typeof: (l, r) => typeof l == r
};

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

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
};
