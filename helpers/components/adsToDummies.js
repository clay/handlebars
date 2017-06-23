'use strict';

const _map = require('lodash/map'),
  _includes = require('lodash/includes'),
  _assign = require('lodash/assign'),
  _compact = require('lodash/compact');

/**
 * Given a list of component instance objects, replace each ad component
 * with a site's "dummy" ad instance, matching the properties of the ad
 * instance replaced.
 * @param {Array} content - an array of component instance objects,
 *                          e.g. `[{_ref: 'a/uri/etc', foo: 'bar'}, ...]`
 * @param {Object} [dummyAd] - an ad object with the reference to the dummy ad instance
 * @return {Array} - an array of components, with ads replaced with the
 *                   ad dummy instance
 */

module.exports = function (content, dummyAd) {
  return _compact(_map(content, function (cmpt) {
    if (_includes(cmpt._ref, '/components/ad/') && dummyAd && dummyAd._ref) {
      return _assign({}, cmpt, { _ref: dummyAd._ref });
    } else if (_includes(cmpt._ref, '/components/ad/')) {
      return false;
    } else {
      return cmpt;
    }
  }));
};
