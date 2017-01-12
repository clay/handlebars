'use strict';
const _ = require('lodash');

module.exports = function (components) {
  return _.filter(components, item => item.displaySelf);
};
