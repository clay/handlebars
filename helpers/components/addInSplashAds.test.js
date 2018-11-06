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
    mediaplayComponent = {
      _ref: 'localhost/components/mediaplay-image/instances/new'
    },
    desktopAd = {
      _ref: 'localhost/components/ad/desktopAd/'
    },
    tabletAd = {
      _ref: 'localhost/components/ad/tabletAd/'
    },
    mobileAd = {
      _ref: 'localhost/components/ad/mobileAd/'
    };

  it('passes through content of an article', function () {
    expect(filter(content)).to.deep.equal(content);
  });

  it('inserts ads after given component', function () {
    var result = filter([paragraph4, paragraph1, mediaplayComponent, paragraph1], { inSplashDesktopAd: desktopAd, inSplashTabletAd: tabletAd, inSplashMobileAd: mobileAd }, 'mediaplay-image');

    expect(_.includes(result, mobileAd)).to.equal(true);
  });

  it('returns the same content when no ad units are passed in', function () {
    var result = filter([paragraph4, paragraph1, mediaplayComponent, paragraph1]);

    expect(result[0]).to.equal(paragraph4);
    expect(result[1]).to.equal(paragraph1);
    expect(result[2]).to.equal(mediaplayComponent);
    expect(result[3]).to.equal(paragraph1);
  });

  it('returns the same content when the string passed in is not a component in the content', function () {
    var result = filter([desktopAd, paragraph1, mediaplayComponent, paragraph1], { inSplashDesktopAd: desktopAd, inSplashTabletAd: tabletAd, inSplashMobileAd: mobileAd }, 'notAComponent');

    expect(result[0]).to.equal(desktopAd);
    expect(result[1]).to.equal(paragraph1);
    expect(result[2]).to.equal(mediaplayComponent);
    expect(result[3]).to.equal(paragraph1);
  });

  it('should just return the content if there is no articleData', function () {
    var result = filter([mobileAd, paragraph1, mediaplayComponent, paragraph1], {}, 'notAComponent');

    expect(_.includes(result, mobileAd)).to.equal(true);
  });
});
