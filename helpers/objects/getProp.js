'use strict';
const _ = require('lodash');

/**
 * get property in object
 * this is similar to handlebars-helpers' [`get`](https://github.com/helpers/handlebars-helpers#get), but the context is called on a returned function.
 * this allows you to easily convert arrays of objects to arrays of a specific property from each objects
 * @param  {string} prop key/path, passed to [`_.get()`](https://lodash.com/docs/4.17.4#get)
 * @return {*} value of the property from the object
 */
module.exports = function (prop) {
  return (context) => _.get(context, prop);
};

module.exports.example = {
  code: '{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a"))}}',
  result: '"1,2"'
};
