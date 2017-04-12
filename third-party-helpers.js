'use strict';
// a unified collection of third party helpers, used on the server
const yaml = require('helper-yaml');

/**
 * pass an environment in
 * @param  {handlebars} env
 */
module.exports = function (env) {
  env.registerHelper('yaml', yaml.sync);
};
