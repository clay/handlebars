'use strict';

const _ = require('lodash'),
  names = {
    di: 'Daily Intelligencer',
    vulture: 'Vulture',
    thecut: 'The Cut',
    scienceofus: 'Science of Us',
    grubstreet: 'Grub Street',
    selectall: 'Select All',
    betamale: 'Beta Male',
    strategist: 'The Strategist',
    vindicated: 'The Vindicated'
  };

module.exports = function (slugs) {
  return _.forEach(slugs, function (slug) { 
    console.log(slug);
    return names[slug]; 
  });
};


