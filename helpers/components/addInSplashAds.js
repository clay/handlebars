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
 * @param {object} articleData - the various ad units passed in from the article
 * @param {string} afterComponent - the component type to insert the ad after
 * @return {object} splash
 */
module.exports = function (content, articleData, afterComponent) {
  var adUnits;

  let newContent = []; // don't just replace the content (it's a sealed array), create a new array!

  if (articleData) {
    adUnits = articleData.inSplashDesktopAd || articleData.inSplashTabletAd || articleData.inSplashMobileAd;
  }
  // console.log('Got ad units:', adUnits);
  if (adUnits) {
    _.forEach(content, function (component) {
      const componentType = getComponentType(component);

      // console.log('Found a component with type:', componentType);
      // add the current component before any ads
      newContent.push(component);
      if (componentType === afterComponent) {
        // console.log('Component type matches: ', afterComponent);
        if (articleData.inSplashMobileAd) {
          // console.log('Pushing a mobile ad');
          newContent.push(articleData.inSplashMobileAd);
        }
        if (articleData.inSplashTabletAd) {
          // console.log('Pushing a tablet ad');
          newContent.push(articleData.inSplashTabletAd);
        }
        if (articleData.inSplashDesktopAd) {
          // console.log('Pushing a desktop ad');
          newContent.push(articleData.inSplashDesktopAd);
        }
      }
    });
    return _.compact(newContent); // get rid of undefined ads
  } else {
    // console.log('No ad units, returning unmodified content');
    return content;
  }
};
