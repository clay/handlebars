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

Currently **56 helpers** in **10 categories**:


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

_No description_



#### Example

```hbs
{{ join ["a", "b", "c"] "-" }}
//=> "a-b-c"
```

### map ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/map.test.js) )

_No description_



#### Example

```hbs
{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a")) }}
//=> "1, 2"
```

### range ( [code](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/arrays/range.test.js) )

_No description_



#### Example

```hbs
{{#range 1 5}}{{ this }}{{/range}}
//=> 1234
```

## components


### addAnnotatedTextAria ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addAnnotatedTextAria.test.js) )

_No description_



#### Example

```hbs
{{> component-list (addAnnotatedTextAria content)}}

```

### addInSplashAds ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addInSplashAds.test.js) )

_No description_



#### Example

```hbs
{{> component-list (addInSplashAds content this "picks-links-container") }}

```

### addOrderedIds ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/addOrderedIds.test.js) )

_No description_



#### Example

```hbs
{{> component-list (addOrderedIds content "annotation-") }}

```

### adsToDummies ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/adsToDummies.test.js) )

_No description_



### displaySelf ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelf.test.js) )

_No description_



#### Example

```hbs
{{> component-list (displaySelf content) }}

```

### displaySelfAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/displaySelfAll.test.js) )

_No description_



#### Example

```hbs
{{> component-list (displaySelfAll content) }}

```

### getComponentName ( [code](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/components/getComponentName.test.js) )

_No description_



#### Example

```hbs
{{ getComponentName "domain.com/components/foo" }}
//=> foo
```

## conditionals


### compare ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/compare.test.js) )

_No description_



#### Example

```hbs
{{ compare 10 ">" 5 }}
//=> "true"
```

### if ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/if.test.js) )

_No description_



#### Example

```hbs
{{ if true "bar" else="baz" }}
//=> "bar"
```

### ifAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAll.test.js) )

_No description_



#### Example

```hbs
{{#ifAll foo bar baz}}
  all are truthy
{{else}}
  not all are truthy
{{/ifAll}}

```

### ifAny ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifAny.test.js) )

_No description_



#### Example

```hbs
{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}

```

### ifNone ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/ifNone.test.js) )

_No description_



#### Example

```hbs
{{#ifNone foo bar baz}}
  all are falsy
{{else}}
  not all are falsy
{{/ifNone}}

```

### modulo ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/modulo.test.js) )

_No description_



#### Example

```hbs
{{modulo 3 2 1}}
//=> true
```

### unlessAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/conditionals/unlessAll.test.js) )

_No description_



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

_No description_



#### Example

```hbs
{{{ perWordClasses "One two three" perLetter=false }}}
//=> <span class="_one">One</span> <span class="_two">two</span> <span class="_three">three</span>
```

### striptags ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/striptags.js) | no tests )

_No description_



#### Example

```hbs
{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}
//=> Hello World!
```

### wordCount ( [code](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/html/wordCount.test.js) )

_No description_



#### Example

```hbs
{{wordCount "<div> This is <b> cool </b> </div>"}}
//=> 3
```

## misc


### default ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/default.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/default.test.js) )

_No description_



#### Example

```hbs
{{ default "" "foo" }}
//=> foo
```

### extractImgHeight ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgHeight.test.js) )

_No description_



#### Example

```hbs
{{ extractImgHeight feedImgUrl }}
//=> 946
```

### extractImgWidth ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/extractImgWidth.test.js) )

_No description_



#### Example

```hbs
{{ extractImgWidth feedImgUrl }}
//=> 1420
```

### indexOf ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/indexOf.test.js) )

_No description_



#### Example

```hbs
{{ indexOf "foo" "o" }}
//=> 1
```

### set ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/set.test.js) )

_No description_



#### Example

```hbs
{{ set "a.b.c" "abc" }}{{ a.b.c }}
//=> "abc"
```

### slugToSiteName ( [code](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/misc/slugToSiteName.test.js) )

_No description_



#### Example

```hbs
{{ slugToSiteName (commaSeparated crosspost) }}

```

## numbers


### add ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/add.test.js) )

_No description_



#### Example

```hbs
{{ add 3 2 }}
//=> 5
```

### addCommas ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addCommas.test.js) )

_No description_



#### Example

```hbs
{{ addCommas "1234.50" }}
//=> "1,234.50"
```

### addOrdinalSuffix ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/addOrdinalSuffix.test.js) )

_No description_



#### Example

```hbs
{{ addOrdinalSuffix 1 }}
//=> 1st
```

### divide ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/divide.test.js) )

_No description_



#### Example

```hbs
{{ divide 100 4 }}
//=> 25
```

### multiply ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/multiply.test.js) )

_No description_



#### Example

```hbs
{{ multiply 10 10 }}
//=> 100
```

### num ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/num.test.js) )

_No description_



#### Example

```hbs
{{ num "123" }}
//=> 123
```

### random ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/random.test.js) )

_No description_



### round ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/round.test.js) )

_No description_



#### Example

```hbs
{{ round 1.5 "down" }}
//=> 1
```

### subtract ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/subtract.test.js) )

_No description_



#### Example

```hbs
{{ subtract 3 2 }}
//=> 1
```

### toK ( [code](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/numbers/toK.test.js) )

_No description_



#### Example

```hbs
{{ toK 1234.5 }}
//=> "1.2k"
```

## objects


### commaSeparated ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

_No description_



#### Example

```hbs
{{ commaSeparated {alpha: true, "bravo charlie": true} true }}
//=> "Alpha, Bravo charlie"
```

### getProp ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/getProp.test.js) )

_No description_



#### Example

```hbs
{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a"))}}
//=> "1, 2"
```

### stringify ( [code](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/objects/stringify.test.js) )

_No description_



#### Example

```hbs
{{{ stringify { a: "b" } }}}
//=> "{"a":"b"}"
```

## strings


### capitalize ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalize.test.js) )

_No description_



#### Example

```hbs
{{ capitalize "foo bar" }}
//=> "Foo bar"
```

### capitalizeAll ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/capitalizeAll.test.js) )

_No description_



#### Example

```hbs
{{ capitalizeAll "foo bar" }}
//=> "Foo Bar"
```

### concat ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/concat.test.js) )

_No description_



#### Example

```hbs
{{ concat "Foo" "Bar" "Baz" }}
//=> "FooBarBaz"
```

### includes ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/includes.test.js) )

_No description_



#### Example

```hbs
{{ includes "hello world" "world" }}
//=> true
```

### kebabCase ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )

_No description_



#### Example

```hbs
{{ kebabCase "Foo Bar Baz" }}
//=> "foo-bar-baz"
```

### longestWord ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/longestWord.test.js) )

_No description_



#### Example

```hbs
{{ longestWord "Foo Ba b" }}
//=> 3
```

### lowercase ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/lowercase.test.js) )

_No description_



#### Example

```hbs
{{ lowercase "Foo" }}
//=> "foo"
```

### randomString ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/randomString.test.js) )

_No description_



#### Example

```hbs
{{ randomString "greatest-hit-" characters=3 }}
//=> "greatest-hit-z56"
```

### removeSpaces ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/removeSpaces.test.js) )

_No description_



#### Example

```hbs
{{ removeSpaces "Foo Bar" }}
//=> "FooBar"
```

### replace ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/replace.test.js) )

_No description_



#### Example

```hbs
{{ replace "Foo Bar" "Bar" "Baz" }}
//=> "Foo Baz"
```

### trim ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/trim.test.js) )

_No description_



#### Example

```hbs
{{ trim "   Foo   " }}
//=> "Foo"
```

### truncate ( [code](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/strings/truncate.test.js) )

_No description_



#### Example

```hbs
{{ truncate "Foo Bar" 4 }}
//=> "Foo…"
```

## time


### articleDate ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/articleDate.test.js) )

_No description_



#### Example

```hbs
{{ articleDate "Fri, 13 Jan 2017 18:22:16 GMT" }}
//=> "Yesterday at 6:22 p.m."
```

### dateMinimal ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/dateMinimal.test.js) )

_No description_



#### Example

```hbs
{{ dateMinimal "Fri, 13 Jan 2017 18:22:16 GMT" }}
//=> "Yesterday"
```

### formatLocalDate ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/time/formatLocalDate.test.js) )

_No description_



### moment ( [code](https://github.com/clay/handlebars/blob/master/helpers/time/moment.js) | no tests )

_No description_



## urls


### urlencode ( [code](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/clay/handlebars/blob/master/helpers/urls/urlencode.test.js) )

_No description_



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
