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

* [displaySelf](https://github.com/nymag/nymag-handlebars#displaySelf)
* [displaySelfAll](https://github.com/nymag/nymag-handlebars#displaySelfAll)
* [getComponentName](https://github.com/nymag/nymag-handlebars#getComponentName)
### conditionals

* [compare](https://github.com/nymag/nymag-handlebars#compare)
* [if](https://github.com/nymag/nymag-handlebars#if)
* [ifAll](https://github.com/nymag/nymag-handlebars#ifAll)
* [ifAny](https://github.com/nymag/nymag-handlebars#ifAny)
* [ifNone](https://github.com/nymag/nymag-handlebars#ifNone)
* [modulo](https://github.com/nymag/nymag-handlebars#modulo)
### html

* [striptags](https://github.com/nymag/nymag-handlebars#striptags)
* [wordCount](https://github.com/nymag/nymag-handlebars#wordCount)
### misc

* [indexOf](https://github.com/nymag/nymag-handlebars#indexOf)
* [set](https://github.com/nymag/nymag-handlebars#set)
### numbers

* [addCommas](https://github.com/nymag/nymag-handlebars#addCommas)
* [toK](https://github.com/nymag/nymag-handlebars#toK)
### objects

* [commaSeparated](https://github.com/nymag/nymag-handlebars#commaSeparated)
### strings

* [kebabCase](https://github.com/nymag/nymag-handlebars#kebabCase)
* [longestWord](https://github.com/nymag/nymag-handlebars#longestWord)
* [randomString](https://github.com/nymag/nymag-handlebars#randomString)
### time

* [articleDate](https://github.com/nymag/nymag-handlebars#articleDate)
### urls

* [urlencode](https://github.com/nymag/nymag-handlebars#urlencode)

---

## components

**displaySelf** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelf.test.js) )

_No description_


**displaySelfAll** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/displaySelfAll.test.js) )

_No description_


**getComponentName** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/components/getComponentName.test.js) )

_No description_


## conditionals

**compare** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/compare.test.js) )

_No description_


**if** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/if.test.js) )

_No description_


**ifAll** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAll.test.js) )

_No description_


**ifAny** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifAny.test.js) )

_No description_


**ifNone** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/ifNone.test.js) )

_No description_


**modulo** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/conditionals/modulo.test.js) )

_No description_


## html

**striptags** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/striptags.js) | no tests )

_No description_


**wordCount** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/html/wordCount.test.js) )

_No description_


## misc

**indexOf** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/indexOf.test.js) )

_No description_


**set** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/misc/set.test.js) )

_No description_


## numbers

**addCommas** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/addCommas.test.js) )

_No description_


**toK** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/numbers/toK.test.js) )

_No description_


## objects

**commaSeparated** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/objects/commaSeparated.test.js) )

_No description_


## strings

**kebabCase** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/kebabCase.js) | no tests )

_No description_


**longestWord** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/longestWord.test.js) )

_No description_


**randomString** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/strings/randomString.test.js) )

_No description_


## time

**articleDate** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/time/articleDate.test.js) )

_No description_


## urls

**urlencode** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.js) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/helpers/urls/urlencode.test.js) )

_No description_



---

# Partials

Currently **1 partial**:

* **component-list** ( [code](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.hbs) | [tests](https://github.com/nymag/nymag-handlebars/blob/master/partials/component-list.test.js) )

---

# Contributing

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](https://github.com/nymag/nymag-handlebars/issues/new).

This project is released under the [MIT license](https://github.com/nymag/nymag-handlebars/blob/master/LICENSE).
