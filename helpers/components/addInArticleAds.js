'use strict';
/* eslint complexity: ["error", 15] */

const _ = require('lodash'),
  wordcount = require('../html/wordCount.js');

/**
 * Gets text from a component's 'content' componentList
 * @param {*} component
 * @return {array} of strings
 */
function getTextContents(component) {
  return component.content.map(_.property('text'));
}

/**
 * Counts the words in component's text property or componentList
 * @param {*} component
 * @return {boolean}
 */
function getWordCount(component) {
  let contentsWordCount = 0;

  // if component has a content componentList, loop through children and count words
  if (_.has(component, 'content') && _.isArray(component.content)) {

    _.forEach(component.content, function (childComponent) {
      if (_.has(childComponent,'text')) {
        contentsWordCount += wordcount(childComponent.text);
      }
    });

    return contentsWordCount;
  } else {
    return wordcount(component.text);
  }
}

/**
 * Checks if component has text
 * @param {*} component
 * @return {boolean}
 */
function isTextComponent(component) {
  let textContents;

  // assumes that if a component has a content property that it is a componentList
  // and might have text components
  if (_.has(component,'content') && _.isArray(component.content)) {
    textContents = getTextContents(component);

    return !! textContents.length;
  }

  return _.has(component, 'text');

  // note: this assumes that any component with a `text` property
  // is a component that will contain a large block of text,
  // e.g. clay-paragraph and blockquote
  // this is true now, but may not be true in the future
  // todo: change this to use a specific list of acceptable components
  // if this assumption becomes incorrect in the future
}

/**
 * Returns the type of component this is
 * @param {*} component
 * @return {string}
 */
function getComponentType(component) {
  let componentType = '';

  if (_.has(component, 'videoId') || !!component._ref.match(/\/(ooyala-player|video|video-promo)\//ig) ||
    _.has(component, 'url') && !!component.url.match(/youtube\.com/ig)) {
    componentType = 'video';
  } else if (!!component._ref.match(/\/(embedly|mediaplay-image|related-stories|related-story|article-sidebar|see-also|tumblr-post)\//ig) ||
    _.has(component, 'url') && !!component.url.match(/twitter\.com\/|instagram\.com/ig)) {
    componentType = 'embed';
  } else if (!!component._ref.match(/\/(read-more|walking-tour-slideshow|clay-subheader)\//ig)) {
    componentType = 'ignore';   // explicitly ignore the read more component here, or it will be picked up as text
  } else if (isTextComponent(component) ) {
    componentType = 'text';
  }

  return componentType;
}

/**
 * Checks if surrounding components have text
 * @param {array} content
 * @param {number} index
 * @return {boolean}
 */
function isSurroundedByText(content, index) {
  return isTextComponent(content[index]) && isTextComponent(content[index + 1]) && isTextComponent(content[index - 1]);
}

/**
 * Make sure the counter is over the limit
 * @param {number} counter
 * @param {number} limit
 * @returns {boolean}
 */
function isCounterOverLimit(counter, limit) {
  return counter >= limit;
}

/**
 * See if there are two or fewer text components remaining
 * @param {array} content
 * @param {number} index
 * @returns {boolean}
 */
function isNearEndOfArticle(content, index) {
  let explodedContent = [],
    remainingTextComponents;

  _.forEach(content,function (component, i) {
    if (i > index) {
      // if a component has a content property and it is an array, add that array
      // to be counted. Assumes that it is a component like 'subsection' and that
      // the 'content' array contains other components
      if (_.has(component,'content') && _.isArray(component.content)) {
        explodedContent = explodedContent.concat(component.content);
      } else {
        explodedContent.push(component);
      }
    }
  });

  remainingTextComponents = _.filter(explodedContent, function (val) {
    // get the components that are past the current component (index) and
    // are text components
    return isTextComponent(val);
  });

  return remainingTextComponents.length <= 2;
}

/**
 * Insert ads into newContent
 * @param {array} newContent
 * @param {object} options
 * @param {boolean} options.isFirst
 * @param {object} options.component (current component!)
 * @param {object} [options.inArticleDesktopOutStreamAd]
 * @param {object} [options.inArticleMobileOutStreamAd]
 * @param {object} [options.inArticleDesktopPremiumAd]
 * @param {object} [options.inArticleTabletAd]
 * @param {object} [options.inArticleMobileFirstAd]
 * @param {object} [options.inArticleMobileSubsequentAd]
 * @param {object} [options.inArticleDesktop300x250]
 */
function insertAd(newContent, options) {
  // add desktop out stream in-article ad
  newContent.push(options.inArticleDesktopOutStreamAd);

  // add mobile out stream in-article ad
  newContent.push(options.inArticleMobileOutStreamAd);

  // add desktop premium in-article ads
  newContent.push(options.inArticleDesktopPremiumAd);

  // add tablet ads before mobile ads
  newContent.push(options.inArticleTabletAd);

  // add feature article 300x250 ads
  if (options.inArticleDesktop300x250 && Object.keys(options.inArticleDesktop300x250).length) {
    newContent.push(options.inArticleDesktop300x250);
  }

  // add first / subsequent mobile ads
  if (options.isFirst) {
    if (options.foundOutStreamMobile == false) {
      newContent.push(options.inArticleMobileFirstAd);
    }
  } else {
    newContent.push(options.inArticleMobileSubsequentAd);
  }
}

/**
 * Looks ahead in the content to check for Out Stream ad barriers, like video or other embeds
 * @param {array} content All unadulterated components for this article
 * @param {number} index The current index of article content
 * @returns {boolean}
 */
function isWithinEmbedLookahead(content, index) {
  let length = content.length,
    withinBounds = length >= index + 5,
    i, bounds, componentType;

  if (withinBounds) {
    for (i = index, bounds = index + 5; i < bounds; i++) {
      componentType = getComponentType(content[i]);
      if (componentType === 'video' || componentType === 'embed') {
        return false;
      }
    }
  }

  return true;
}

/**
 * Add in article ads to list of components in an article
 * @param {array} content - the list of components in the article
 * @param {object} articleData - all the data from the article, to grab the ad instances
 * @param {object} featureTypes - the feature types associated with the article
 * @return {object} article
 */
module.exports = function (content, articleData, featureTypes) {
  var adUnits;

  let mobileCounter = 0,
    desktopCounter = 0,
    mobileLimit = 500,
    desktopPremiumLimit = 1900,
    foundPremiumDesktop = false,
    foundOutStreamDesktop = false,
    foundOutStreamMobile = false,
    first300x250 = false,
    subsequent300x250Counter = 0,
    outStreamTrigger = 1,
    isFirst = true,
    newContent = [], // don't just replace the content (it's a sealed array), create a new array!
    isFeatureCoverStory = featureTypes ? featureTypes['Cover Story Online'] : false;

  if (articleData) {
    adUnits = articleData.inArticleDesktopOutStreamAd || articleData.inArticleMobileOutStreamAd || articleData.inArticleDesktopPremiumAd || articleData.inArticleTabletAd || articleData.inArticleMobileFirstAd || articleData.inArticleMobileSubsequentAd || articleData.inArticleDesktop300x250;
  }

  _.forEach(content, function (component, index) {
    let tempCount = 0,
      componentType,

      // boolean to prevent ad from being inserted (i.e. enforce word count threshold on text components)
      // temporary solution until we implement more long-term logic around word count
      // and/or pixel-based distance between ad-repeat instances
      textComponentTooShort = getWordCount(content[index]) < 30;

    // make sure it is a text component and that adUnits has something in it
    // default behavior if adUnits is undefined is to never insert ads and just insert the current component
    if (adUnits) {
      componentType = getComponentType(component);
      switch (componentType) {
        case 'text':
          tempCount = getWordCount(component);

          // Increment the mobileCounter by the number of words in the current component
          mobileCounter += tempCount;
          desktopCounter += tempCount;
          outStreamTrigger = Math.max(0, outStreamTrigger - 1);
          break;
        case 'video':
          outStreamTrigger = 5;
          break;
        case 'embed':
          outStreamTrigger = 3;
          break;
        default:
          // else, decrement the outStreamTrigger offset
          outStreamTrigger = Math.max(0, outStreamTrigger - 1);
      }
    }

    // add the current component before any ads
    newContent.push(component);

    // Premium In-Article desktop ads, including Premium In-Article Video and Shade units insertion logic
    if (!foundPremiumDesktop && isCounterOverLimit(desktopCounter, desktopPremiumLimit) &&
      !isNearEndOfArticle(content, index) && isSurroundedByText(content, index)) {
      insertAd(newContent, {
        inArticleDesktopPremiumAd: articleData.inArticleDesktopPremiumAd
      });
      // only display one of this type of ad
      foundPremiumDesktop = true;
      // reset desktopCounter
      desktopCounter = 0;
    }

    // Out Stream Desktop insertion logic
    if (!isFeatureCoverStory && !foundOutStreamDesktop && !isNearEndOfArticle(content, index) && index >= 3 && outStreamTrigger === 0 &&
      isWithinEmbedLookahead(content, index + 1)) {
      insertAd(newContent, {
        inArticleDesktopOutStreamAd: articleData.inArticleDesktopOutStreamAd
      });

      // only display one of this type of ad
      foundOutStreamDesktop = true;
    }

    // Out Stream Mobile insertion logic
    if (!isFeatureCoverStory && !foundOutStreamMobile && !isNearEndOfArticle(content, index) && index >= 3 && outStreamTrigger === 0 &&
      isWithinEmbedLookahead(content, index + 1)) {
      insertAd(newContent, {
        inArticleMobileOutStreamAd: articleData.inArticleMobileOutStreamAd
      });

      // only display one of this type of ad
      foundOutStreamMobile = true;
    }

    // feature article 300x250 logic - this ad is only on the layout for feature articles, dont need if logic around placement
    if (adUnits) {
      if (isTextComponent(content[index]) && !textComponentTooShort) {
        subsequent300x250Counter += 1;

        if (isSurroundedByText(content, index) && subsequent300x250Counter % 5 === 0 && first300x250 && !isNearEndOfArticle(content, index) && getWordCount(content[index + 1]) > 85) {
          insertAd(newContent, {
            inArticleDesktop300x250: articleData.inArticleDesktop300x250
          });
        }
      }


      // insert first 300x250
      if (isSurroundedByText(content, index) && first300x250 == false && !isNearEndOfArticle(content, index) && getComponentType(content[index + 1]) !== 'ignore') {
        insertAd(newContent, {
          inArticleDesktop300x250: articleData.inArticleDesktop300x250
        });
        first300x250 = true;
        subsequent300x250Counter = 0;
      }
    }

    if (isCounterOverLimit(mobileCounter, mobileLimit) && !isNearEndOfArticle(content, index) && isSurroundedByText(content, index)) {
      insertAd(newContent, {
        isFirst: isFirst,
        foundOutStreamMobile: foundOutStreamMobile,
        inArticleTabletAd: articleData.inArticleTabletAd,
        inArticleMobileFirstAd: articleData.inArticleMobileFirstAd,
        inArticleMobileSubsequentAd: articleData.inArticleMobileSubsequentAd
      });
      // reset mobileCounter
      mobileCounter = 0;
      // we've added at least one ad, so set isFirst to false
      isFirst = false;
    }

  });
  return _.compact(newContent); // get rid of undefined ads
};

