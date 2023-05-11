# clayhandlebars

[![Build Status](https://travis-ci.org/clay/handlebars.svg)](https://travis-ci.org/clay/handlebars)
[![Coverage Status](https://coveralls.io/repos/github/clay/handlebars/badge.svg?branch=master)](https://coveralls.io/github/clay/handlebars?branch=master)
[![Code Climate](https://codeclimate.com/github/clay/handlebars/badges/gpa.svg)](https://codeclimate.com/github/clay/handlebars)

A collection of helpers and partials for handlebars

# Installation

```
npm install --save clayhandlebars
```

# Usage

By default, `clayhandlebars` will export a function that returns a new handlebars instance with all of the helpers and partials added.

```js
var hbs = require('clayhandlebars')(),
  template = hbs.compile('<h1>Hello {{ place }}!</h1>'),
  result = template({ place: 'World' });

// result: <h1>Hello World!</h1>
```

## Passing env in

If you want to configure and use your own handlebars environment, you can pass it through

```js
var Handlebars = require('express-handlebars'),
  env = new Handlebars({ /* some config */ }),
  hbs = require('clayhandlebars')(env),
  app = require('express')();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
```

---

# Helpers

Currently **57 helpers** in **10 categories**:


### arrays

* [**join**](https://github.com/clay/handlebars#join--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/join.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/join.test.js) )
* [**map**](https://github.com/clay/handlebars#map--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.test.js) )
* [**range**](https://github.com/clay/handlebars#range--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.test.js) )

### components

* [**addAnnotatedTextAria**](https://github.com/clay/handlebars#addannotatedtextaria--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.test.js) )
* [**addInSplashAds**](https://github.com/clay/handlebars#addinsplashads--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.test.js) )
* [**addOrderedIds**](https://github.com/clay/handlebars#addorderedids--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.test.js) )
* [**adsToDummies**](https://github.com/clay/handlebars#adstodummies--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.test.js) )
* [**displaySelf**](https://github.com/clay/handlebars#displayself--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.test.js) )
* [**displaySelfAll**](https://github.com/clay/handlebars#displayselfall--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.test.js) )
* [**filterComponents**](https://github.com/clay/handlebars#filtercomponents--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/filterComponents.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/filterComponents.test.js) )
* [**getComponentName**](https://github.com/clay/handlebars#getcomponentname--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.test.js) )

### conditionals

* [**compare**](https://github.com/clay/handlebars#compare--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.test.js) )
* [**if**](https://github.com/clay/handlebars#if--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.test.js) )
* [**ifAll**](https://github.com/clay/handlebars#ifall--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.test.js) )
* [**ifAny**](https://github.com/clay/handlebars#ifany--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.test.js) )
* [**ifNone**](https://github.com/clay/handlebars#ifnone--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.test.js) )
* [**modulo**](https://github.com/clay/handlebars#modulo--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.test.js) )
* [**unlessAll**](https://github.com/clay/handlebars#unlessall--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.test.js) )

### html

* [**perWordClasses**](https://github.com/clay/handlebars#perwordclasses--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/perWordClasses.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/html/perWordClasses.test.js) )
* [**striptags**](https://github.com/clay/handlebars#striptags--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/striptags.js) | no tests )
* [**wordCount**](https://github.com/clay/handlebars#wordcount--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.test.js) )

### misc

* [**default**](https://github.com/clay/handlebars#default--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/default.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/default.test.js) )
* [**extractImgHeight**](https://github.com/clay/handlebars#extractimgheight--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.test.js) )
* [**extractImgWidth**](https://github.com/clay/handlebars#extractimgwidth--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.test.js) )
* [**indexOf**](https://github.com/clay/handlebars#indexof--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.test.js) )
* [**set**](https://github.com/clay/handlebars#set--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/set.test.js) )
* [**slugToSiteName**](https://github.com/clay/handlebars#slugtositename--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.test.js) )

### numbers

* [**add**](https://github.com/clay/handlebars#add--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.test.js) )
* [**addCommas**](https://github.com/clay/handlebars#addcommas--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.test.js) )
* [**addOrdinalSuffix**](https://github.com/clay/handlebars#addordinalsuffix--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.test.js) )
* [**divide**](https://github.com/clay/handlebars#divide--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.test.js) )
* [**multiply**](https://github.com/clay/handlebars#multiply--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.test.js) )
* [**num**](https://github.com/clay/handlebars#num--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.test.js) )
* [**random**](https://github.com/clay/handlebars#random--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.test.js) )
* [**round**](https://github.com/clay/handlebars#round--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.test.js) )
* [**subtract**](https://github.com/clay/handlebars#subtract--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.test.js) )
* [**toK**](https://github.com/clay/handlebars#tok--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.test.js) )

### objects

* [**commaSeparated**](https://github.com/clay/handlebars#commaseparated--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.test.js) )
* [**getProp**](https://github.com/clay/handlebars#getprop--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.test.js) )
* [**stringify**](https://github.com/clay/handlebars#stringify--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.test.js) )

### strings

* [**capitalize**](https://github.com/clay/handlebars#capitalize--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.test.js) )
* [**capitalizeAll**](https://github.com/clay/handlebars#capitalizeall--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.test.js) )
* [**concat**](https://github.com/clay/handlebars#concat--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.test.js) )
* [**includes**](https://github.com/clay/handlebars#includes--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.test.js) )
* [**kebabCase**](https://github.com/clay/handlebars#kebabcase--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )
* [**longestWord**](https://github.com/clay/handlebars#longestword--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.test.js) )
* [**lowercase**](https://github.com/clay/handlebars#lowercase--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.test.js) )
* [**randomString**](https://github.com/clay/handlebars#randomstring--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.test.js) )
* [**removeSpaces**](https://github.com/clay/handlebars#removespaces--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.test.js) )
* [**replace**](https://github.com/clay/handlebars#replace--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.test.js) )
* [**trim**](https://github.com/clay/handlebars#trim--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.test.js) )
* [**truncate**](https://github.com/clay/handlebars#truncate--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.test.js) )

### time

* [**articleDate**](https://github.com/clay/handlebars#articledate--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.test.js) )
* [**dateMinimal**](https://github.com/clay/handlebars#dateminimal--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.test.js) )
* [**formatLocalDate**](https://github.com/clay/handlebars#formatlocaldate--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.test.js) )
* [**moment**](https://github.com/clay/handlebars#moment--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/moment.js) | no tests )

### urls

* [**urlencode**](https://github.com/clay/handlebars#urlencode--code--tests-) ( [code](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.test.js) )

---


## arrays


### join ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/join.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/join.test.js) )

join all elements of array into a string, optionally using a given separator

#### Params
* `array` _(array)_ 
* `[sep]` _(string)_ the separator to use (defaults to ', ')

**Returns** _(string)_ 

#### Example

```hbs
{{ join ["a", "b", "c"] "-" }}
//=> "a-b-c"
```

### map ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.test.js) )

map through array, call function on each item

#### Params
* `array` _(array|string)_ of items to iterate through
* `fn` _(function)_ to run on each item

**Returns** _(array)_ 

#### Example

```hbs
{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a")) }}
//=> "1, 2"
```

### range ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.test.js) )

return an array of numbers, in order<br /> _note:_  can be used inline or as a block helper (will iterate through all numbers)

#### Params
* `[start]` _(number)_ on this number (defaults to 0)
* `end` _(number)_ on this number
* `[options]` _(object)_ 

**Returns** _(array)_ 

#### Example

```hbs
{{#range 1 5}}{{ this }}{{/range}}
//=> 1234
```

## components


### addAnnotatedTextAria ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.test.js) )

Add aria to phrases in paragraphs, corresponds to annotation ids.

#### Params
* `content` _(array)_ list of components

**Returns** _(array)_ content

#### Example

```hbs
{{> component-list (addAnnotatedTextAria content)}}

```

### addInSplashAds ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.test.js) )

Add in article ads to list of components in an article

#### Params
* `content` _(array)_ the list of components in the article
* `articleData` _(object)_ the entire article's data, used to pull in the different ad units defined
* `afterComponent` _(string)_ the component type to insert the ad after

**Returns** _(object)_ splash

#### Example

```hbs
{{> component-list (addInSplashAds content this "picks-links-container") }}

```

### addOrderedIds ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.test.js) )

Add ordered ids to components within a componentlist

#### Params
* `content` _(Array)_ list of components
* `prefix` _(string)_ prefix for the ids
* `[offset]` _(number)_ index to start at, defaults to 1

**Returns** _(Array)_ content

#### Example

```hbs
{{> component-list (addOrderedIds content "annotation-") }}

```

### adsToDummies ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.test.js) )

Given a list of component instance objects, replace each ad component<br />with a site's "dummy" ad instance, matching the properties of the ad<br />instance replaced.

#### Params
* `content` _(Array)_ an array of component instance objects,
                         e.g.  `[{_ref: 'a/uri/etc', foo: 'bar'}, ...]`
* `[dummyAd]` _(Object)_ an ad object with the reference to the dummy ad instance

**Returns** _(Array)_ an array of components, with ads replaced with the
                  ad dummy instance

### displaySelf ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.test.js) )

Return the first component (from a list of components) with a truthy  `displaySelf`  property. Used by Spaces.

#### Params
* `components` _(array)_ with  `displaySelf`  properties

**Returns** _(object)_ first component with  `displaySelf: true`

#### Example

```hbs
{{> component-list (displaySelf content) }}

```

### displaySelfAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.test.js) )

Return all components (from a list of components) with a truthy  `displaySelf`  property. Used by Spaces.

#### Params
* `components` _(array)_ with  `displaySelf`  properties

**Returns** _(array)_ all components with  `displaySelf: true`

#### Example

```hbs
{{> component-list (displaySelfAll content) }}

```

### filterComponents ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/filterComponents.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/filterComponents.test.js) )

filters component references in a component list

#### Params
* `content` _(array)_ list of components
* `shouldKeep` _(boolean)_ if true, only matching component references are returned; if false, then only non-matching component references are returned
* `componentName` _(string)_ name of the component to remove from the list (accepts multiple arguments)

**Returns** _(array)_ content

#### Example

```hbs
{{> component-list (filterComponents content false "some-component" "another-component")}}

```

### getComponentName ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.test.js) )

get a component's name from the reference

#### Params
* `ref` _(string)_ full component uri

**Returns** _(string)_ 

#### Example

```hbs
{{ getComponentName "domain.com/components/foo" }}
//=> foo
```

## conditionals


### compare ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.test.js) )

compare two values, with an operator.<br /> _note:_  if you don't pass an operator, it assumes  `===` <br /> _note:_  this can be used as a block  _or_  inline helper

#### Params
* `left` _(*)_ left value
* `operator` _(string)_ to compare with
* `right` _(*)_ right value
* `[options]` _(object)_ 

**Returns** _(string)_ if inline, otherwise calls block functions

#### Example

```hbs
{{ compare 10 ">" 5 }}
//=> "true"
```

### if ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.test.js) )

overwrite default handlebars 'if' helper<br />this adds support for an inline helper,  `{{if foo bar}}`   _(if foo is truthy, print bar)_ <br />as well as an inline if/else helper,  `{{if foo bar else=baz}}`   _(if foo is truthy, print bar. otherwise, print baz)_

#### Params
* `conditional` _(*)_ to check for truthiness
* `value` _(*)_ to print if conditional is truthy
* `[options]` _(object)_ 

**Returns** _(string)_ if inline, otherwise calls block functions

#### Example

```hbs
{{ if true "bar" else="baz" }}
//=> "bar"
```

### ifAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.test.js) )

helper for checking if ALL arguments passed in are truthy<br /> _note:_  this can be used as a block  _or_  inline helper



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifAll foo bar baz}}
  all are truthy
{{else}}
  not all are truthy
{{/ifAll}}

```

### ifAny ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.test.js) )

helper for checking if ANY arguments passed in are truthy<br /> _note:_  this can be used as a block  _or_  inline helper



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}

```

### ifNone ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.test.js) )

helper for checking if NO arguments passed in are truthy<br /> _note:_  this can be used as a block  _or_  inline helper



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifNone foo bar baz}}
  all are falsy
{{else}}
  not all are falsy
{{/ifNone}}

```

### modulo ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.test.js) )

compare the modulo of two values to a third value

#### Params
* `dividend` _(number)_ 
* `divisor` _(number)_ 
* `remainder` _(number)_ 
* `[options]` _(object)_ 

**Returns** _(string)_ if inline, otherwise calls block functions

#### Example

```hbs
{{modulo 3 2 1}}
//=> true
```

### unlessAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.test.js) )

helper for checking that NOT ALL arguments passed in are truthy<br /> _note:_  this can be used as a block  _or_  inline helper<br /> _note:_  this is the inverse of the ifAll helper



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#unlessAll foo bar baz}}
  not all are truthy
{{else}}
  all are truthy
{{/ifAll}}

```

## html


### perWordClasses ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/perWordClasses.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/html/perWordClasses.test.js) )

wraps each word in spans with classes allowing designers and devs to target individual words with css

#### Params
* `html` _(string)_ to add classes to
* `options` _(object)_ 
* `[options.hash.perLetter]` _(boolean)_ if you want an extra span wrapping each letter. defaults to true

**Returns** _(string)_ words wrapped in classes

#### Example

```hbs
{{{ perWordClasses "One two three" perLetter=false }}}
//=> <span class="_one">One</span> <span class="_two">two</span> <span class="_three">three</span>
```

### striptags ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/striptags.js) | no tests )

straight passthrough to  [striptags](https://www.npmjs.com/package/striptags)



#### Example

```hbs
{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}
//=> Hello World!
```

### wordCount ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.test.js) )

counts the words in a string of text or html

#### Params
* `[html]` _(string)_ 

**Returns** _(number)_ the number of words

#### Example

```hbs
{{wordCount "<div> This is <b> cool </b> </div>"}}
//=> 3
```

## misc


### default ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/default.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/default.test.js) )

return the first value if it's not empty, otherwise return the second value<br /> _note:_  this overrides handlebar-helper's  [default](https://github.com/helpers/handlebars-helpers#default)  helper, since that only checks for null values (not all falsy/empty values)

#### Params
* `value` _(*)_ to check
* `defaultValue` _(*)_ value to return if first value is falsy

#### Example

```hbs
{{ default "" "foo" }}
//=> foo
```

### extractImgHeight ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.test.js) )

Extract the height of a mediaplay image given the image URL.

#### Params
* `url` _(string)_ 

**Returns** _(object)_ extracted height

#### Example

```hbs
{{ extractImgHeight feedImgUrl }}
//=> 946
```

### extractImgWidth ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.test.js) )

Extract the width of a mediaplay image given the image URL.

#### Params
* `url` _(string)_ 

**Returns** _(Object)_ extracted width

#### Example

```hbs
{{ extractImgWidth feedImgUrl }}
//=> 1420
```

### indexOf ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.test.js) )

get the index of something inside something else

#### Params
* `outside` _(*)_ array, string, etc (anything with  `indexOf` )
* `inside` _(*)_ anything that can exist inside something else

**Returns** _(number)_ 

#### Example

```hbs
{{ indexOf "foo" "o" }}
//=> 1
```

### set ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/set.test.js) )

set data into current context or other optional context/object<br /> _note:_  doesn't return anything

#### Params
* `[obj]` _(object)_ context or object for storing data beyond current context
* `key` _(string)_ `_set()`  key/path
* `val` _(*)_ value to set

#### Example

```hbs
{{ set "a.b.c" "abc" }}{{ a.b.c }}
//=> "abc"
```

### slugToSiteName ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.test.js) )

return comma-separated site names from comma-separated slugs

#### Params
* `slugs` _(string)_ comma-separated string of slugs

**Returns** _(string)_ 

#### Example

```hbs
{{ slugToSiteName (commaSeparated crosspost) }}

```

## numbers


### add ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.test.js) )

Return the product of  `a`  plus  `b`

#### Params
* `a` _(number)_ 
* `b` _(number)_ 

**Returns** _(number)_ 

#### Example

```hbs
{{ add 3 2 }}
//=> 5
```

### addCommas ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.test.js) )

add commas to numbers.<br /> _note:_  this overrides handlebars-helpers'  `addCommas`  helper because we want to preserve zeroes in decimals (for money)<br />e.g.  `1234.50`  →  `1,234.50`  instead of  `1,234.5` <br /> _note:_  decimals are only preserved if passed in as a string (they don't exist in js numbers)

#### Params
* `num` _(number|string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ addCommas "1234.50" }}
//=> "1,234.50"
```

### addOrdinalSuffix ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.test.js) )

add ordinal after a number<br />e.g.  `1`  →  `1st` ,  `2`  →  `2nd` ,  `3`  →  `3rd`

#### Params
* `num` _(number|string)_ number to add ordinal after

**Returns** _(string)_ 

#### Example

```hbs
{{ addOrdinalSuffix 1 }}
//=> 1st
```

### divide ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.test.js) )

Return the result of  `a`  divided by  `b`

#### Params
* `a` _(number)_ 
* `b` _(number)_ 

**Returns** _(number)_ 

#### Example

```hbs
{{ divide 100 4 }}
//=> 25
```

### multiply ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.test.js) )

Return the product of  `a`  multiplied by  `b`

#### Params
* `a` _(number)_ 
* `b` _(number)_ 

**Returns** _(number)_ 

#### Example

```hbs
{{ multiply 10 10 }}
//=> 100
```

### num ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.test.js) )

converts things (usually strings) into numbers<br /> _note:_  this is useful if you need to parse user input

#### Params
* `x` _(number|string)_ thing to convert into a number

**Returns** _(string)_ 

#### Example

```hbs
{{ num "123" }}
//=> 123
```

### random ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.test.js) )

Returns a number within a specified range.

#### Params
* `min` _(Number)_ 
* `max` _(Number)_ 

**Returns** _(Number)_ 

### round ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.test.js) )

Return the rounded value of  `x` , optionally always rounding up or down

#### Params
* `x` _(number|string)_ 
* `[direction]` _(string)_ always round  `x`  up or down, expects values 'up' or 'down', otherwise just round

**Returns** _(number)_ 

#### Example

```hbs
{{ round 1.5 "down" }}
//=> 1
```

### subtract ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.test.js) )

Return the product of  `a`  minus  `b`

#### Params
* `a` _(number)_ 
* `b` _(number)_ 

**Returns** _(number)_ 

#### Example

```hbs
{{ subtract 3 2 }}
//=> 1
```

### toK ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.test.js) )

format thousands using  `k` <br />e.g.  `1000`  →  `1k`

#### Params
* `x` _(number|string)_ number to format

**Returns** _(string)_ 

#### Example

```hbs
{{ toK 1234.5 }}
//=> "1.2k"
```

## objects


### commaSeparated ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

Turn an object into a comma-delineated list of key names, depending if their values are true/false

#### Params
* `obj` _(object)_ 
* `shouldCapitalize` _(boolean)_ capitalizes first word in each key

**Returns** _(string)_ 

#### Example

```hbs
{{ commaSeparated {alpha: true, "bravo charlie": true} true }}
//=> "Alpha, Bravo charlie"
```

### getProp ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.test.js) )

get property in object<br />this is similar to handlebars-helpers'  [`get`](https://github.com/helpers/handlebars-helpers#get) , but the context is called on a returned function.<br />this allows you to easily convert arrays of objects to arrays of a specific property from each objects

#### Params
* `prop` _(string)_ key/path, passed to  [`_get()`](https://lodash.com/docs/4.17.4#get)

**Returns** value of the property from the object

#### Example

```hbs
{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a"))}}
//=> "1, 2"
```

### stringify ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.test.js) )

stringify JSON<br /> _note:_  doesn't blow up on circular references

#### Params
* `obj` _(object)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{{ stringify { a: "b" } }}}
//=> "{"a":"b"}"
```

## strings


### capitalize ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.test.js) )

capitalize the first character in a string

#### Params
* `str` _(string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ capitalize "foo bar" }}
//=> "Foo bar"
```

### capitalizeAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.test.js) )

capitalize every word in a string

#### Params
* `str` _(string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ capitalizeAll "foo bar" }}
//=> "Foo Bar"
```

### concat ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.test.js) )

concatenate any number of strings



**Returns** _(string)_ concatenated string

#### Example

```hbs
{{ concat "Foo" "Bar" "Baz" }}
//=> "FooBarBaz"
```

### includes ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.test.js) )

check if a substring exist within a string. This is very similiar to the<br />indexOf helper, except it uses String.prototype.includes() and returns a<br />boolean.<br />note: handlebars returns booleans as strings, so only return a value if the substring is found<br />otherwise, return undefined (rather than false)

#### Params
* `string` _(string)_ 
* `substring` _(string)_ 

#### Example

```hbs
{{ includes "hello world" "world" }}
//=> true
```

### kebabCase ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )

straight passthrough to  [`_kebabCase`](https://lodash.com/docs/4.17.4#kebabCase)



#### Example

```hbs
{{ kebabCase "Foo Bar Baz" }}
//=> "foo-bar-baz"
```

### longestWord ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.test.js) )

returns the number of characters in the longest word of a string. Punctuation is NOT ignored.

#### Params
* `str` _(string)_ string to search through

**Returns** _(number)_ of letters in the longest word

#### Example

```hbs
{{ longestWord "Foo Ba b" }}
//=> 3
```

### lowercase ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.test.js) )

lower cases a string<br /> _note:_  non-strings will return emptystring

#### Params
* `str` _(string)_ 

**Returns** _(string)_ lower cased

#### Example

```hbs
{{ lowercase "Foo" }}
//=> "foo"
```

### randomString ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.test.js) )

generate a random string<br /> _note:_  by default it generates an 8-character string

#### Params
* `[prefix]` _(string)_ string to append random stuff to
* `[options]` _(object)_ 
* `[options.hash.characters]` _(number)_ generate string of a custom length

**Returns** _(string)_ 

#### Example

```hbs
{{ randomString "greatest-hit-" characters=3 }}
//=> "greatest-hit-z56"
```

### removeSpaces ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.test.js) )

remove spaces, used by in-page  `id`  attributes so we can do in-page links<br />(per the HTML spec IDs cannot have spaces)

#### Params
* `str` _(string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ removeSpaces "Foo Bar" }}
//=> "FooBar"
```

### replace ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.test.js) )

replace all occurrences of  `a`  with  `b` <br /> _note:_  this does simple string replacement, not regex

#### Params
* `str` _(string)_ to replace inside
* `a` _(string)_ to replace
* `b` _(string)_ the replacement

**Returns** _(string)_ 

#### Example

```hbs
{{ replace "Foo Bar" "Bar" "Baz" }}
//=> "Foo Baz"
```

### trim ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.test.js) )

trim leading and trailing whitespace from a string

#### Params
* `str` _(string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ trim "   Foo   " }}
//=> "Foo"
```

### truncate ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.test.js) )

If a string is over a given length, truncate and append an ellipsis character to the end.

#### Params
* `str` _(string)_ to shorten
* `len` _(number)_ desired length
* `options` _(object)_ 
* `[options.hash.suffix]` _(string)_ to append to truncated string, defaulting to an ellipsis

**Returns** _(string)_ 

#### Example

```hbs
{{ truncate "Foo Bar" 4 }}
//=> "Foo…"
```

## time


### articleDate ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.test.js) )

generate article dates and times, based on a relative format

#### Params
* `datetime` _(Date|string)_ for  `date-fns`  to parse

**Returns** _(string)_ 

#### Example

```hbs
{{ articleDate "Fri, 13 Jan 2017 18:22:16 GMT" }}
//=> "Yesterday at 6:22 p.m."
```

### dateMinimal ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.test.js) )

generate display date (without time), based on a relative format

#### Params
* `datetime` _(Date|string)_ for  `date-fns`  to parse

**Returns** _(string)_ 

#### Example

```hbs
{{ dateMinimal "Fri, 13 Jan 2017 18:22:16 GMT" }}
//=> "Yesterday"
```

### formatLocalDate ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.test.js) )

Formats a date with date-fns

#### Params
* `date` _(*)_ 
* `[format]` _(string)_ 

**Returns** _(string)_ 

### moment ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/moment.js) | no tests )

_No description_



## urls


### urlencode ( [code](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.test.js) )

encode urls (ported from the nunjucks  `urlencode`  filter)<br /> _note:_   `handlebars-helpers`  contains an  `encodeURI`  helper, but it doesn't handle arrays or objects.

#### Params
* `obj` _(*)_ data to encode

**Returns** _(string)_ urlencoded data

#### Example

```hbs
{{ urlencode "&" }}
//=> "%26"
```

---

# Partials

Currently **1 partial**:

* **component-list** ( [code](https://github.com/clay/handlebars/blob/master/partials/component-list.hbs) | [tests](https://github.com/clay/handlebars/blob/master/partials/component-list.test.js) )

---

# Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/clay/handlebars/issues/new).

This project is released under the [MIT license](https://github.com/clay/handlebars/blob/master/LICENSE).
