'use strict';
const { get } = require('../../lib/path');

/**
 * get property in object
 * this is similar to handlebars-helpers' [`get`](https://github.com/helpers/handlebars-helpers#get), but the context is called on a returned function.
 * this allows you to easily convert arrays of objects to arrays of a specific property from each objects
 * @param  {string} prop key or path, like `"a"`, `"a.b"` or `"a[0].b"`
 * @return {*} value of the property from the object
 */
module.exports = function (prop) {
  return context => get(context, prop);
};

module.exports.example = {
  code: '{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a"))}}',
  result: '"1, 2"'
};
