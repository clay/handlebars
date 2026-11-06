'use strict';
const { toList } = require('../../lib/collection');

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
  return toList(content).map(function (cmpt) {
    const isAd = typeof cmpt._ref === 'string' && cmpt._ref.includes('/components/ad/');

    if (isAd && dummyAd && dummyAd._ref) {
      return Object.assign({}, cmpt, { _ref: dummyAd._ref });
    } else if (isAd) {
      return false;
    } else {
      return cmpt;
    }
  }).filter(Boolean);
};
