'use strict';

const names = {
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

function slugToSiteName(slug) {
  return names[slug];
}

/**
 * return comma-separated site names from comma-separated slugs
 * @param  {string} slugs comma-separated string of slugs
 * @return {string}
 */
module.exports = function (slugs) {
  return slugs.split(', ').map(slugToSiteName).join(', ');
};

module.exports.example = {
  code: '{{ slugToSiteName (commaSeparated crosspost) }}',
};
