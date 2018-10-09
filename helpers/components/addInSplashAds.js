'use strict';

const _forEach = require('lodash/forEach'),
  _compact = require('lodash/compact');

function getComponentType(component) {
  const componentTypeMatch = component._ref.match(/\/components\/([A-Za-z\-]+)\/instances\//);

  if (componentTypeMatch && componentTypeMatch.length >= 2) {
    return componentTypeMatch[1];
  }
}

/**
 * Add in article ads to list of components in an article
 * @param {array} content - the list of components in the article
 * @param {object} articleData - the entire article's data, used to pull in the different ad units defined
 * @param {string} afterCmp - the component type to insert the ad after
 * @return {object} splash
 */
module.exports = function (content, articleData, afterCmp) {
  var adUnits;

  let newContent = []; // don't just replace the content (it's a sealed array), create a new array!

  if (articleData) {
    adUnits = articleData.inSplashDesktopAd || articleData.inSplashTabletAd || articleData.inSplashMobileAd;
  }

  if (adUnits) {
    _forEach(content, function (component) {
      const componentType = getComponentType(component);


      // add the current component before any ads
      newContent.push(component);
      if (componentType === afterCmp) {
        /* istanbul ignore else */
        if (articleData.inSplashMobileAd) {
          newContent.push(articleData.inSplashMobileAd);
        }
        /* istanbul ignore else */
        if (articleData.inSplashTabletAd) {
          newContent.push(articleData.inSplashTabletAd);
        }
        /* istanbul ignore else */
        if (articleData.inSplashDesktopAd) {
          newContent.push(articleData.inSplashDesktopAd);
        }
      }
    });
    return _compact(newContent); // get rid of undefined ads
  } else {
    return content;
  }
};

module.exports.example = {
  code: '{{> component-list (addInSplashAds content this "picks-links-container") }}'
};
