'use strict';

let log;

/**
 * The logger of clayhandlebars, set up the first time something is logged: requiring clayhandlebars
 * shouldn't start a logger (clay-log keeps the most recently started one as its default).
 * @param {...*} args level, message and data, as clay-log takes them
 * @returns {*}
 */
module.exports = function (...args) {
  log = log || require('clay-log').init({ name: 'clayhandlebars' });

  return log(...args);
};
