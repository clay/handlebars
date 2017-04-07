'use strict';

const _ = require('lodash');

function getComponentType(component) {
  const componentTypeMatch = component._ref.match(/\/components\/([A-Za-z\-]+)\/instances\//);

  if (componentTypeMatch && componentTypeMatch.length >= 2) {
    return componentTypeMatch[1];
  }
}

/**
 * Add in article ads to list of components in an article
 * @param {array} content - the list of components in the article
 * @param {object} adUnits - the various ad units passed in from the article
 * @param {string} afterComponent - the component type to insert the ad after
 * @return {object} splash
 */
module.exports = function (content, adUnits, afterComponent) {
  let newContent = []; // don't just replace the content (it's a sealed array), create a new array!

  // console.log('Got ad units:', adUnits);
  if (adUnits) {
    _.forEach(content, function (component) {
      const componentType = getComponentType(component);

      // console.log('Found a component with type:', componentType);
      // add the current component before any ads
      newContent.push(component);
      if (componentType === afterComponent) {
        // console.log('Component type matches: ', afterComponent);
        if (adUnits.mobileAd) {
          // console.log('Pushing a mobile ad');
          newContent.push(adUnits.mobileAd);
        }
        if (adUnits.tabletAd) {
          // console.log('Pushing a tablet ad');
          newContent.push(adUnits.tabletAd);
        }
        if (adUnits.desktopAd) {
          // console.log('Pushing a desktop ad');
          newContent.push(adUnits.desktopAd);
        }
      }
    });
    return _.compact(newContent); // get rid of undefined ads
  } else {
    // console.log('No ad units, returning unmodified content');
    return content;
  }
};
