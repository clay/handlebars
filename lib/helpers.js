'use strict';

// Every helper by the name templates call it with. index.js (Node) and client.js (the browser bundle) register the same
// list; lib/helpers.test.js checks that it has every file under helpers/.
module.exports = {
  // arrays
  join: require('../helpers/arrays/join'),
  map: require('../helpers/arrays/map'),
  range: require('../helpers/arrays/range'),

  // components
  addAnnotatedTextAria: require('../helpers/components/addAnnotatedTextAria'),
  addInSplashAds: require('../helpers/components/addInSplashAds'),
  addOrderedIds: require('../helpers/components/addOrderedIds'),
  adsToDummies: require('../helpers/components/adsToDummies'),
  displaySelf: require('../helpers/components/displaySelf'),
  displaySelfAll: require('../helpers/components/displaySelfAll'),
  filterComponents: require('../helpers/components/filterComponents'),
  getComponentName: require('../helpers/components/getComponentName'),

  // conditionals
  compare: require('../helpers/conditionals/compare'),
  if: require('../helpers/conditionals/if'),
  ifAll: require('../helpers/conditionals/ifAll'),
  ifAny: require('../helpers/conditionals/ifAny'),
  ifNone: require('../helpers/conditionals/ifNone'),
  modulo: require('../helpers/conditionals/modulo'),
  unlessAll: require('../helpers/conditionals/unlessAll'),

  // html
  perWordClasses: require('../helpers/html/perWordClasses'),
  striptags: require('../helpers/html/striptags'),
  wordCount: require('../helpers/html/wordCount'),

  // misc
  default: require('../helpers/misc/default'),
  extractImgHeight: require('../helpers/misc/extractImgHeight'),
  extractImgWidth: require('../helpers/misc/extractImgWidth'),
  indexOf: require('../helpers/misc/indexOf'),
  set: require('../helpers/misc/set'),
  slugToSiteName: require('../helpers/misc/slugToSiteName'),

  // numbers
  add: require('../helpers/numbers/add'),
  addCommas: require('../helpers/numbers/addCommas'),
  addOrdinalSuffix: require('../helpers/numbers/addOrdinalSuffix'),
  divide: require('../helpers/numbers/divide'),
  multiply: require('../helpers/numbers/multiply'),
  num: require('../helpers/numbers/num'),
  random: require('../helpers/numbers/random'),
  round: require('../helpers/numbers/round'),
  subtract: require('../helpers/numbers/subtract'),
  toK: require('../helpers/numbers/toK'),

  // objects
  commaSeparated: require('../helpers/objects/commaSeparated'),
  getProp: require('../helpers/objects/getProp'),
  stringify: require('../helpers/objects/stringify'),

  // strings
  capitalize: require('../helpers/strings/capitalize'),
  capitalizeAll: require('../helpers/strings/capitalizeAll'),
  concat: require('../helpers/strings/concat'),
  includes: require('../helpers/strings/includes'),
  kebabCase: require('../helpers/strings/kebabCase'),
  longestWord: require('../helpers/strings/longestWord'),
  lowercase: require('../helpers/strings/lowercase'),
  randomString: require('../helpers/strings/randomString'),
  removeSpaces: require('../helpers/strings/removeSpaces'),
  replace: require('../helpers/strings/replace'),
  trim: require('../helpers/strings/trim'),
  truncate: require('../helpers/strings/truncate'),

  // time
  articleDate: require('../helpers/time/articleDate'),
  dateMinimal: require('../helpers/time/dateMinimal'),
  formatLocalDate: require('../helpers/time/formatLocalDate'),
  moment: require('../helpers/time/moment'),

  // urls
  urlencode: require('../helpers/urls/urlencode')
};
