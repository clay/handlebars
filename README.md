# nymag-handlebars

[![Build Status](https://travis-ci.org/nymag/nymag-handlebars.svg)](https://travis-ci.org/nymag/nymag-handlebars)
[![Coverage Status](https://coveralls.io/repos/github/nymag/nymag-handlebars/badge.svg?branch=master)](https://coveralls.io/github/nymag/nymag-handlebars?branch=master)
[![Code Climate](https://codeclimate.com/github/nymag/nymag-handlebars/badges/gpa.svg)](https://codeclimate.com/github/nymag/nymag-handlebars)

A collection of helpers and partials for handlebars

# Installation

```
npm install --save nymag-handlebars
```

# Usage

By default, `nymag-handlebars` will export a function that returns a new handlebars instance with all of the helpers and partials added.

```js
var hbs = require('nymag-handlebars')(),
  template = hbs.compile('&lt;h1&gt;Hello {{ place }}!&lt;/h1&gt;'),
  result = template({ place: 'World' });

// result: &lt;h1&gt;Hello World!&lt;/h1&gt;
```

## Passing env in

If you want to configure and use your own handlebars environment, you can pass it through

```js
var Handlebars = require('express-handlebars'),
  env = new Handlebars({ /* some config */ }),
  hbs = require('nymag-handlebars')(env),
  app = require('express')();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
```

---

# Helpers

Currently **21 helpers** in **9 categories**:


### components

* [**displaySelf**](https://github.com/nymag/nymag-handlebars#displaySelf) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.test.js) )
* [**displaySelfAll**](https://github.com/nymag/nymag-handlebars#displaySelfAll) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.test.js) )
* [**getComponentName**](https://github.com/nymag/nymag-handlebars#getComponentName) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.test.js) )

### conditionals

* [**compare**](https://github.com/nymag/nymag-handlebars#compare) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.test.js) )
* [**if**](https://github.com/nymag/nymag-handlebars#if) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.test.js) )
* [**ifAll**](https://github.com/nymag/nymag-handlebars#ifAll) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.test.js) )
* [**ifAny**](https://github.com/nymag/nymag-handlebars#ifAny) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.test.js) )
* [**ifNone**](https://github.com/nymag/nymag-handlebars#ifNone) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.test.js) )
* [**modulo**](https://github.com/nymag/nymag-handlebars#modulo) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.test.js) )

### html

* [**striptags**](https://github.com/nymag/nymag-handlebars#striptags) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/striptags.js) | no tests )
* [**wordCount**](https://github.com/nymag/nymag-handlebars#wordCount) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.test.js) )

### misc

* [**indexOf**](https://github.com/nymag/nymag-handlebars#indexOf) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.test.js) )
* [**set**](https://github.com/nymag/nymag-handlebars#set) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.test.js) )

### numbers

* [**addCommas**](https://github.com/nymag/nymag-handlebars#addCommas) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.test.js) )
* [**toK**](https://github.com/nymag/nymag-handlebars#toK) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.test.js) )

### objects

* [**commaSeparated**](https://github.com/nymag/nymag-handlebars#commaSeparated) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

### strings

* [**kebabCase**](https://github.com/nymag/nymag-handlebars#kebabCase) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )
* [**longestWord**](https://github.com/nymag/nymag-handlebars#longestWord) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.test.js) )
* [**randomString**](https://github.com/nymag/nymag-handlebars#randomString) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.test.js) )

### time

* [**articleDate**](https://github.com/nymag/nymag-handlebars#articleDate) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.test.js) )

### urls

* [**urlencode**](https://github.com/nymag/nymag-handlebars#urlencode) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.test.js) )

---


## components


### displaySelf ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.test.js) )

Return the first component (from a list of components) with a truthy  `displaySelf`  property. Used by Spaces.

#### Params
* `components` _(array)_ with  `displaySelf`  properties

**Returns** _(object)_ first component with  `displaySelf: true`

#### Example

```hbs
{{> component-list (displaySelf content) }}

```

---

### displaySelfAll ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.test.js) )

Return all components (from a list of components) with a truthy  `displaySelf`  property. Used by Spaces.

#### Params
* `components` _(array)_ with  `displaySelf`  properties

**Returns** _(array)_ all components with  `displaySelf: true`

#### Example

```hbs
{{> component-list (displaySelfAll content) }}

```

---

### getComponentName ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.test.js) )

get a component's name from the reference

#### Params
* `ref` _(string)_ 

---

## conditionals


### compare ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.test.js) )

compare two values, with an operator
note: if you don't pass an operator, it assumes '==='

#### Params
* `left` left value
* `operator` _(string)_ 
* `right` right value
* `options` 

---

### if ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.test.js) )

if

#### Params
* `conditional` to check for truthiness
* `value` to print if conditional is truthy
* `options` 

---

### ifAll ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.test.js) )

block helper for checking if ALL arguments passed in are truthy
e.g. {{#ifAll foo bar baz}}all are truthy{{else}}not all are truthy{{/ifAll}}

#### Params

---

### ifAny ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.test.js) )

block helper for checking if ANY arguments passed in are truthy
e.g. {{#ifAny foo bar baz}}at least one is truthy{{else}}none are truthy{{/ifAny}}

#### Params

---

### ifNone ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.test.js) )

block helper for checking if NO arguments passed in are truthy
e.g. {{#ifNone foo bar baz}}all are falsy{{else}}not all are falsy{{/ifNone}}

#### Params

---

### modulo ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.test.js) )

_No description_



---

## html


### striptags ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/striptags.js) | no tests )

_No description_



---

### wordCount ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.test.js) )

counts the words in a string of text or html

#### Params
* `html` 

---

## misc


### indexOf ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.test.js) )

_No description_



---

### set ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.test.js) )

set data into current context

#### Params
* `key` _(string)_ _.set() key/path
* `val` 

**Returns** _(string)_ doesn't actually print anything

---

## numbers


### addCommas ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.test.js) )

add commas to numbers.
note: this overrides handlebars-helpers' addCommas helper
because we want to preserve zeroes in decimals (for money)
e.g. 1234.50 → 1,234.50 instead of 1,234.5
note: decimals are only preserved if passed in as a string
(they don't exist in js numbers)

#### Params
* `num` 

---

### toK ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.test.js) )

convert number to shorthand
e.g. 1000 → 1k

#### Params
* `x` 

---

## objects


### commaSeparated ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

Turn an object into a comma-delineated list of key names,
based on if their values are true/false
e.g. { a: true, b: false, c: true } → a, b, c

#### Params
* `obj` _(object)_ 
* `shouldCapitalize` _(boolean)_ capitalizes first word in each key

---

## strings


### kebabCase ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )

_No description_



---

### longestWord ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.test.js) )

returns the number of characters in the longest word of
a string. Punctuation is NOT ignored.

#### Params
* `str` _(string)_ 

---

### randomString ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.test.js) )

generatea random string
e.g.  `greatest-hit-`  →  `greatest-hit-noctz56h` 
note: allows passing length=x to generate strings of different lengths

#### Params
* `prefix` 
* `options` 

---

## time


### articleDate ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.test.js) )

generate article dates and times

#### Params
* `datetime` _(Date)_ 

---

## urls


### urlencode ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.test.js) )

_No description_



---

---

# Partials

Currently **1 partial**:

* **component-list** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.hbs) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.test.js) )

---

# Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nymag/nymag-handlebars/issues/new).

This project is released under the [MIT license](https://github.com/nymag/nymag-handlebars/blob/master/LICENSE).
