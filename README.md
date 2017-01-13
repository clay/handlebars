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
  template = hbs.compile('<h1>Hello {{ place }}!</h1>'),
  result = template({ place: 'World' });

// result: <h1>Hello World!</h1>
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

Currently **22 helpers** in **9 categories**:


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
* [**getProp**](https://github.com/nymag/nymag-handlebars#getProp) ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/getProp.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/getProp.test.js) )

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

### displaySelfAll ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.test.js) )

Return all components (from a list of components) with a truthy  `displaySelf`  property. Used by Spaces.

#### Params
* `components` _(array)_ with  `displaySelf`  properties

**Returns** _(array)_ all components with  `displaySelf: true`

#### Example

```hbs
{{> component-list (displaySelfAll content) }}

```

### getComponentName ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.test.js) )

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


### compare ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.test.js) )

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

### if ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.test.js) )

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

### ifAll ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.test.js) )

block helper for checking if ALL arguments passed in are truthy



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifAll foo bar baz}}
  all are truthy
{{else}}
  not all are truthy
{{/ifAll}}

```

### ifAny ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.test.js) )

block helper for checking if ANY arguments passed in are truthy



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifAny foo bar baz}}
  at least one is truthy
{{else}}
  none are truthy
{{/ifAny}}

```

### ifNone ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.test.js) )

block helper for checking if NO arguments passed in are truthy



**Returns** _(string)_ calls block functions

#### Example

```hbs
{{#ifNone foo bar baz}}
  all are falsy
{{else}}
  not all are falsy
{{/ifNone}}

```

### modulo ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.test.js) )

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

## html


### striptags ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/striptags.js) | no tests )

straight passthrough to  [striptags](https://www.npmjs.com/package/striptags)



#### Example

```hbs
{{ striptags "<p><b>Hello</b> <em>World!</em></p>" }}
//=> Hello World!
```

### wordCount ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.test.js) )

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


### indexOf ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.test.js) )

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

### set ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.test.js) )

set data into current context<br /> _note:_  doesn't return anything

#### Params
* `key` _(string)_ `_.set()`  key/path
* `val` _(*)_ value to set

#### Example

```hbs
{{ set "a.b.c" "abc" }}{{ a.b.c }}
//=> "abc"
```

## numbers


### addCommas ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.test.js) )

add commas to numbers.<br /> _note:_  this overrides handlebars-helpers'  `addCommas`  helper because we want to preserve zeroes in decimals (for money)<br />e.g.  `1234.50`  →  `1,234.50`  instead of  `1,234.5` <br /> _note:_  decimals are only preserved if passed in as a string (they don't exist in js numbers)

#### Params
* `num` _(number|string)_ 

**Returns** _(string)_ 

#### Example

```hbs
{{ addCommas "1234.50" }}
//=> "1,234.50"
```

### toK ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.test.js) )

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


### commaSeparated ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

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

### getProp ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/getProp.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/getProp.test.js) )

get property in object<br />this is similar to handlebars-helpers'  [`get`](https://github.com/helpers/handlebars-helpers#get) , but the context is called on a returned function.<br />this allows you to easily convert arrays of objects to arrays of a specific property from each objects

#### Params
* `prop` _(string)_ key/path, passed to  [`_.get()`](https://lodash.com/docs/4.17.4#get)

**Returns** value of the property from the object

#### Example

```hbs
{{ join (map [{ a: "1" }, { a: "2" }] (getProp "a"))}}
//=> "1,2"
```

## strings


### kebabCase ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )

straight passthrough to  [`_.kebabCase`](https://lodash.com/docs/4.17.4#kebabCase)



#### Example

```hbs
{{ kebabCase "Foo Bar Baz" }}
//=> "foo-bar-baz"
```

### longestWord ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.test.js) )

returns the number of characters in the longest word of a string. Punctuation is NOT ignored.

#### Params
* `str` _(string)_ string to search through

**Returns** _(number)_ of letters in the longest word

#### Example

```hbs
{{ longestWord "Foo Ba b" }}
//=> 3
```

### randomString ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.test.js) )

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

## time


### articleDate ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.test.js) )

generate article dates and times, based on a relative format

#### Params
* `datetime` _(Date|string)_ for  `moment.js`  to parse

**Returns** _(string)_ 

#### Example

```hbs
{{ articleDate "Fri, 13 Jan 2017 18:22:16 GMT" }}
//=> "Yesterday at 6:22 p.m."
```

## urls


### urlencode ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.test.js) )

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

* **component-list** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.hbs) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.test.js) )

---

# Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nymag/nymag-handlebars/issues/new).

This project is released under the [MIT license](https://github.com/nymag/nymag-handlebars/blob/master/LICENSE).
