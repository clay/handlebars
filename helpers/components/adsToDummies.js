'use strict';

const _ = require('lodash');

/**
 * Given a list of component instance objects, replace each ad component
 * with a site's "dummy" ad instance, matching the properties of the ad
 * instance replaced.
 * @param {Array} content - an array of component instance objects,
 *                          e.g. `[{_ref: 'a/uri/etc', foo: 'bar'}, ...]`
 * @return {Array} - an array of components, with ads replaced with the
 *                   ad dummy instance
 */

module.exports = function (content) {
  return _.map(content, function (cmpt) {
    var dummy;

    if (_.includes(cmpt._ref, '/components/ad/')) {
      dummy = {
        viewportMin: cmpt.viewportMin,
        viewportMax: cmpt.viewportMax,
        _ref: cmpt._ref
          .split('/')
          .slice(0, -3)
          .join('/') + '/ad-dummy/instances/general'
      };

      return dummy;
    } else {
      return cmpt;
    }
  });
};
