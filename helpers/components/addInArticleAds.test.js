'use strict';
var name = getName(__filename),
  filterName = __filename.split('/').pop().split('.').shift(),
  filter = require('./' + filterName),
  expect = require('chai').expect,
  _ = require('lodash');

describe(name, function () {
  var content = [{
      _ref: 'fakeParagraph1'
    }, {
      _ref: 'fakeParagraph2'
    }],
    paragraph1 = {
      _ref: 'localhost/components/clay-paragraph/instances/100words',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor nisi leo, non bibendum risus blandit sit amet. Donec mauris sapien, laoreet et odio ac, elementum dictum ex. Nullam eget rhoncus diam, non dignissim diam. Donec diam ex, posuere vitae convallis ac, ultricies vel magna. Nam purus nunc, cursus a accumsan sit amet, semper id metus. Mauris mi elit, congue eu nisl et, hendrerit consequat enim. Nunc ultricies ultrices vulputate. Duis tincidunt sodales leo, id porttitor mauris mollis sed. Mauris risus felis, sagittis bibendum velit sed, blandit consectetur magna. Sed tempus, justo at accumsan dictum, metus nibh pretium enim, in.'
    },
    paragraph4 = {
      _ref: 'localhost/components/clay-paragraph/instances/400words',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc congue, sem vel facilisis faucibus, dolor diam feugiat nisi, ut blandit velit libero tincidunt nulla. Pellentesque eleifend nibh eget est elementum, ut ullamcorper enim imperdiet. Sed porttitor aliquet vulputate. Nulla porta ante molestie, fermentum risus nec, tristique nunc. Nulla in iaculis nulla. In ante elit, pulvinar quis sem id, vulputate suscipit lectus. Sed bibendum at mi eu convallis. Proin at scelerisque nisl. Nunc in mattis arcu, mollis dapibus ligula. Aliquam nisl nibh, dapibus eu ultricies non, semper at nulla. Integer gravida tortor elit, et commodo massa lacinia et. Proin consectetur nisi a dignissim blandit. Mauris vel gravida lacus. Fusce condimentum aliquet purus id ullamcorper. Phasellus auctor sapien molestie dignissim bibendum. Donec aliquam ante orci, commodo malesuada nulla rhoncus id. Nulla volutpat gravida ante, et consectetur eros congue ut. Sed eu maximus est. Duis consectetur convallis tortor, id semper enim euismod et. Mauris eleifend, justo eget faucibus semper, quam diam hendrerit sapien, eu posuere mi velit eget erat. Aliquam maximus facilisis enim, sit amet faucibus massa lobortis eget. Vestibulum elementum ac elit mollis bibendum. Fusce justo mi, efficitur at imperdiet et, gravida ut nisl. Maecenas congue tortor nec leo ultrices pharetra. Aliquam quis est id justo malesuada molestie ac et nulla. Donec accumsan velit in faucibus bibendum. Cras accumsan enim lobortis consequat volutpat. In felis elit, mollis consectetur erat varius, mollis dictum turpis. Quisque fermentum lobortis odio, ac hendrerit velit interdum quis. Pellentesque maximus egestas neque aliquam accumsan. Donec a arcu sed justo dictum posuere sed quis libero. Praesent consectetur dapibus turpis vitae dignissim. Sed tincidunt pulvinar massa sit amet tristique. Pellentesque risus metus, faucibus id imperdiet nec, posuere id purus. Nulla a sapien justo. In quis nulla eget libero ullamcorper efficitur. Donec efficitur sit amet leo non molestie. Praesent in pulvinar purus. Etiam porta rutrum ornare. Cras tincidunt elit dolor, eget tempus lorem mattis id. Nullam euismod leo eu tellus posuere blandit. Phasellus malesuada blandit nisi. Phasellus vel iaculis justo. Suspendisse luctus quam at ipsum aliquam, at mollis erat suscipit. Nullam vel luctus urna. Sed sodales orci sollicitudin dolor lacinia condimentum. Maecenas a condimentum ipsum, vitae euismod ligula. Nunc rutrum vel urna non vulputate. Etiam blandit ante at nulla rhoncus malesuada. Vestibulum porttitor nisl sagittis, placerat magna ullamcorper, volutpat tellus. Phasellus ac odio at nulla tempus blandit. Fusce tincidunt turpis est, nec tempor mi fringilla et. Vestibulum id vestibulum ex. Integer.'
    },
    subsection = {
      _ref: 'localhost/components/subsection/instances/fixture',
      content: [
        paragraph4, paragraph1
      ]
    },
    subsectionWithNonTextChild = {
      _ref: 'localhost/components/subsection/instances/fixture',
      content: [
        mediaplayComponent
      ]
    },
    nonTextComponent = {
      _ref: 'localhost/components/other-component/'
    },
    mediaplayComponent = {
      _ref: 'localhost/components/mediaplay/'
    },
    relatedStoriesComponent = {
      _ref: 'localhost/components/related-stories/'
    },
    ooyalaPlayerComponent = {
      _ref: 'localhost/components/ooyala-player/',
      videoId: 'lj09283r098dfg'
    },
    desktopOutStreamAd = {
      _ref: 'localhost/components/ad/desktopOutStream/'
    },
    desktopPremiumAd = {
      _ref: 'localhost/components/ad/desktopPremium/'
    },
    desktop300x250Ad = {
      _ref: 'localhost/components/ad/desktop300x250/'
    },
    tabletAd = {
      _ref: 'localhost/components/ad/tablet/'
    },
    firstMobileAd = {
      _ref: 'localhost/components/ad/mobileFirst/'
    },
    otherMobileAd = {
      _ref: 'localhost/components/ad/mobileOther/'
    },
    featureTypesCoverStory = {
      'Cover Story Online': true
    },
    featureTypesRegularArticle = {
      'Cover Story Online' : false
    },
    readMore = {
      _ref: 'localhost/components/read-more/instances/long',
      content: [paragraph1, paragraph4, paragraph1, paragraph4, paragraph4]
    };

  it('passes through content of an article', function () {
    expect(filter(content)).to.deep.equal(content);
  });

  it('inserts ads in an article that has subsections', function () {
    var result = filter([subsection, subsection, subsection, subsection, subsection], { inArticleMobileFirstAd: firstMobileAd, inArticleMobileSubsequentAd: otherMobileAd }, featureTypesRegularArticle);

    expect(_.includes(result, firstMobileAd)).to.equal(true);
    expect(_.includes(result, otherMobileAd)).to.equal(true);
  });

  it('inserts ads in an article that has more than two "text" components remaining', function () {
    var result = filter([paragraph1, paragraph4, paragraph4, paragraph1, paragraph4, paragraph1, nonTextComponent], { inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    expect(_.includes(result, tabletAd)).to.equal(true);
  });

  it('does not insert ads if there are 2 or fewer "text" components remaining', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, paragraph4], { inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    expect(_.includes(result, tabletAd)).to.equal(false);
  });

  it('does not insert ads if there are more than 2 components remaining, but they aren\'t "text" components', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, nonTextComponent, nonTextComponent], { inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    // that third paragraph is included because it checks to make sure the ad will be surrounded by text
    expect(_.includes(result, tabletAd)).to.equal(false);
  });

  it('does not insert ads if they don\'t exist', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, paragraph4, paragraph1], undefined, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph1);
    expect(result[1]).to.equal(paragraph4);
    expect(result[2]).to.equal(paragraph1);
    expect(result[3]).to.equal(paragraph4);
    expect(result[4]).to.equal(paragraph1);
  });

  it('inserts ad after the component where it hits 500 characters', function () {
    var result = filter([paragraph4, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopPremiumAd: desktopPremiumAd, inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph4); // 400 words, no ad yet
    expect(result[1]).to.equal(paragraph4); // 800 words, insert an ad!
    expect(result[2]).to.equal(tabletAd);
    expect(result[3]).to.equal(paragraph1);
    expect(result[4]).to.equal(paragraph1);
    expect(result[5]).to.equal(paragraph1);
  });

  it('inserts tablet ad after 500 characters', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopPremiumAd: desktopPremiumAd, inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph1);
    expect(result[1]).to.equal(paragraph4);
    expect(result[2]).to.equal(tabletAd);
    expect(result[3]).to.equal(paragraph1);
    expect(result[4]).to.equal(paragraph1);
    expect(result[5]).to.equal(paragraph1);
  });

  it('inserts first mobile ad after first 500 characters', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopPremiumAd: desktopPremiumAd, inArticleTabletAd: tabletAd, inArticleMobileFirstAd: firstMobileAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph1);
    expect(result[1]).to.equal(paragraph4);
    expect(result[2]).to.equal(tabletAd);
    expect(result[3]).to.equal(firstMobileAd);
    expect(result[4]).to.equal(paragraph1);
    expect(result[5]).to.equal(paragraph1);
    expect(result[6]).to.equal(paragraph1);
  });

  it('inserts other mobile ad after first 1000 characters', function () {
    var result = filter([paragraph1, paragraph4, paragraph1, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopOutStreamAd: desktopOutStreamAd, inArticleTabletAd: tabletAd, inArticleMobileFirstAd: firstMobileAd, inArticleMobileSubsequentAd: otherMobileAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph1);
    expect(result[1]).to.equal(paragraph4);
    expect(result[2]).to.equal(tabletAd);
    expect(result[3]).to.equal(firstMobileAd);
    expect(result[4]).to.equal(paragraph1);
    expect(result[5]).to.equal(paragraph4);
    expect(result[6]).to.equal(tabletAd); //  note: it adds a tablet ad every time
    expect(result[7]).to.equal(otherMobileAd);
    expect(result[8]).to.equal(desktopOutStreamAd);
    expect(result[9]).to.equal(paragraph1);
    expect(result[10]).to.equal(paragraph1);
    expect(result[11]).to.equal(paragraph1);
  });

  it('inserts premium desktop ad after first 1900 characters', function () {
    var result = filter([paragraph4, paragraph4, paragraph4, paragraph4, paragraph1, paragraph1, paragraph1, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopOutStreamAd: desktopOutStreamAd, inArticleDesktopPremiumAd: desktopPremiumAd, inArticleTabletAd: tabletAd, inArticleMobileFirstAd: firstMobileAd, inArticleMobileSubsequentAd: otherMobileAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph4);
    expect(result[1]).to.equal(paragraph4);
    expect(result[2]).to.equal(tabletAd);
    expect(result[3]).to.equal(firstMobileAd);
    expect(result[4]).to.equal(paragraph4);
    expect(result[5]).to.equal(paragraph4);
    expect(result[6]).to.equal(tabletAd); // note: it adds a tablet ad every time
    expect(result[7]).to.equal(otherMobileAd);
    expect(result[8]).to.equal(desktopOutStreamAd);
    expect(result[9]).to.equal(paragraph1);
    expect(result[10]).to.equal(paragraph1);
    expect(result[11]).to.equal(paragraph1);
    expect(result[12]).to.equal(desktopPremiumAd);
    expect(result[13]).to.equal(paragraph4);
    expect(result[14]).to.equal(tabletAd);
    expect(result[15]).to.equal(otherMobileAd);
    expect(result[16]).to.equal(paragraph1);
    expect(result[17]).to.equal(paragraph1);
    expect(result[18]).to.equal(paragraph1);
  });

  it('does not insert an outstream ad within three components of an "embed"-type component', function () {
    var result = filter([mediaplayComponent, paragraph1, paragraph1, relatedStoriesComponent, paragraph4, paragraph4, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopOutStreamAd: desktopOutStreamAd }, featureTypesRegularArticle),
      relatedStoriesIndex = _.findIndex(result, relatedStoriesComponent),
      outStreamIndex = _.findIndex(result, desktopOutStreamAd);

    expect(_.includes(result, desktopOutStreamAd)).to.equal(true);
    expect(outStreamIndex - relatedStoriesIndex).to.be.above(3);
  });

  it('does not insert an outstream ad within five components of an "video"-type component', function () {
    var result = filter([paragraph1, paragraph1, ooyalaPlayerComponent, paragraph4, paragraph4, paragraph4, paragraph1, paragraph1, paragraph1, paragraph1, paragraph1], { inArticleDesktopOutStreamAd: desktopOutStreamAd }, featureTypesRegularArticle),
      ooyalaPlayerIndex = _.findIndex(result, ooyalaPlayerComponent),
      outStreamIndex = _.findIndex(result, desktopOutStreamAd);

    expect(_.includes(result, desktopOutStreamAd)).to.equal(true);
    expect(outStreamIndex - ooyalaPlayerIndex).to.be.above(5);
  });


  it('does not insert an outstream ad in cover story articles', function () {
    var result = filter([mediaplayComponent, paragraph1, paragraph1, paragraph4, paragraph4, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktopOutStreamAd: desktopOutStreamAd }, featureTypesCoverStory);

    expect(_.includes(result, desktopOutStreamAd)).to.equal(false);
  });

  it('inserts desktop 300x250 ads in cover story articles', function () {
    var result = filter([mediaplayComponent, paragraph1, paragraph1, paragraph4, paragraph4, paragraph4, paragraph1, paragraph1, paragraph1], { inArticleDesktop300x250: desktop300x250Ad }, featureTypesCoverStory);

    expect(_.includes(result, desktop300x250Ad)).to.equal(true);
  });

  it('does not insert ads based on content of the "read more" component', function () {
    var result = filter([paragraph1, readMore, paragraph1, paragraph1, paragraph1], { inArticleTabletAd: tabletAd }, featureTypesRegularArticle);

    expect(_.includes(result, tabletAd)).to.equal(false);
  });

  it('does not insert ads after components with non-text child components', function () {
    var result = filter([paragraph1, subsectionWithNonTextChild], { inArticleMobileFirstAd: firstMobileAd, inArticleMobileSubsequentAd: otherMobileAd }, featureTypesRegularArticle);

    expect(result[0]).to.equal(paragraph1);
    expect(result[1]).to.equal(subsectionWithNonTextChild);
  });


});
