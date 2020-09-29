# fanum

A JavaScript profanity filter.

## Installation

    $ npm install fanum

## Usage

```js
const { WORDS, EXCEPTIONS, Fanum } = require("fanum")
// or
import { WORDS, EXCEPTIONS, Fanum } from "fanum"
```

-   [WORDS](#words)
-   [EXCEPTIONS](#exceptions)
-   [Fanum](#fanum)
    -   [constructor()](#constructoroptions)
    -   [options](#options-1)
    -   [findProfanity()](#findprofanitytext)
    -   [checkProfanity()](#checkprofanitytext)
    -   [censorProfanity()](#censorprofanitytext-options)

<!---->

-   [Typedefs](#typedefs)
    -   [FanumOptions](#fanumoptions)
    -   [Profanity](#Profanity)
    -   [CensorOptions](#censoroptions)
    -   [WordList](#wordlist)
    -   [ExceptionList](#exceptionlist)

### WORDS

Fanum exports a list of bad words by default, split into five different categories: `INAPPROPRIATE`, `TAME`, `SWEARS`, `INSULTS` and `SLURS`. Beware that passing the whole object as the `words` option won't work; you'll have to mix the categories you want into a single object (e.g. `Object.assign(WORDS.INSULTS, WORDS.SLURS)`). Also note that words under the `INAPPROPRIATE` category do not have any replacements, so trying to use them with the `"replace"` `mode` in [censorProfanity()](#censorprofanitytext-options) will throw an error.

-   **Type:** `{ INAPPROPRIATE: WordList, TAME: WordList, SWEARS: WordList, INSULTS: WordList, SLURS: WordList }`

### EXCEPTIONS

It also exports a list of exceptions for some of the default words. These are not divided into categories, though.

-   **Type:** [`ExceptionList`](#ExceptionList)

### Fanum

The main class.

```js
const { Fanum } = require("fanum")
const fanum = new Fanum()

fanum.checkProfanity("fu ck shi t")
// => true
fanum.censorProfanity("holy sh.1t what the f uck")
// => "holy **** what the ****"
```

#### constructor(options?)

##### options

Options to detect profanity.

-   **Type:** [`FanumOptions`](#FanumOptions)

#### findProfanity(text)

Find profanity in a string.

##### text

The text to search for profanity in.

-   **Type:** `string`

##### returns

The profanity found, if any.

-   **Type:** [`Profanity[]`](#Profanity)

### options

The options passed to the constructor. Exposed so that you can modify options after instantiating Fanum. For example:

```js
const fanum = new Fanum()
fanum.options.words.bad_word = "nice word"
fanum.options.exceptions.bad_word = ["not a bad word"]
// (this would, of course, also include all of the default words)
```

-   **Type:** [`FanumOptions`](#FanumOptions)

#### checkProfanity(text)

Check whether a string contains profanity.

##### text

The text to check profanity for.

-   **Type:** `string`

##### returns

Whether the string contains profanity.

-   **Type:** `boolean`

#### censorProfanity(text, options)

Censor profanity in a string.

##### text

The text to censor profanity in.

-   **Type:** `string`

##### options

Options to censor profanity.

-   **Type:** [`CensorOptions`](#CensorOptions)

### Typedefs

#### FanumOptions

Options to detect profanity.

-   **Type:** `{ words?, exceptions?, maxCharacterSeparation? }`

##### words

A list of words (and their replacements) that will be used to detect profanity.

-   **Type:** [`WordList`](#WordList)
-   **Default:** `Object.assign(WORDS.SWEARS, WORDS.INSULTS, WORDS.SLURS)`

##### exceptions

A list of exceptions that will ignore certain uses or false positives of profanity.

-   **Type:** [`ExceptionList`](#ExceptionList)
-   **Default:** `EXCEPTIONS`

##### maxCharacterSeparation

The maximum number of "irrelevant" characters there can be inbetween the characters of a word. For example, if this option is set to `1`, "f..uck" will no longer be considered profane. Can be _Infinity_.

-   **Type:** `number`
-   **Default:** `25`

#### Profanity

A profane word found.

-   **Type:** `{ index, word, raw, replacement? }`

##### index

The index in the input string of the word.

-   **Type:** `number`

##### word

The "base" word; its identifier. For example, `"fuck"`.

-   **Type:** `string`

##### raw

The actual input as found inside the string. For example, `"Fuc.k"`.

-   **Type:** `string`

##### replacement

The replacement of the word, if any. For example, `"frick"`.

-   **Type:** `string`

#### CensorOptions

Options to censor profanity.

-   **Type:** `{ mode, mask, maskLengthBehavior, maskIrrelevantCharacters, replicateTextStyle }`

##### mode

If `"mask"`, the `mask` option will be repeated to fit every word. If `"static"`, every word will be replaced with the mask, regardless of their length. If `"replace"`, the words will be replaced with their safe counterparts; if they're unavailable, an error will be thrown.

-   **Type:** `"mask" | "static" | "replace"`
-   **Default:** `"mask"`

##### mask

The mask to use with `mode` `"mask"` or `"static"`. If an array, a random element will be chosen for every word.

-   **Type:** `string | string[]`
-   **Default:** `"*"`

##### maskLengthBehavior

How to detect how long masks should be. If `"raw"`, the input length will be used (`"b a d .w o r d"` will be converted to `"**************"`). If `"word"`, the length of the base word will be used (`"b a d .w o r d"` will be converted to `"*******"`—length of `"badword"`). Used in conjunction with `mode` `"mask"`.

-   **Type:** `"raw" | "word"`
-   **Default:** `"word"`

##### maskIrrelevantCharacters

Whether to mask "irrelevant" or non-letter characters. For example, if this option is false, `"f uc k"` will be masked as `"* ** *"`. Used in conjunction with `maskLengthBehavior` `"raw"` and `mode` `"mask"`.

-   **Type:** `boolean`
-   **Default:** `true`

##### replicateTextStyle

Whether to replicate the style of replaced words. For example, `"fUCK"` will be replaced as `"fRICK"`. Used in conjunction with `mode` `"replace"`.

-   **Type:** `boolean`
-   **Default:** `true`

#### WordList

A list of words (and their replacements) that will be used to detect profanity.

-   **Type:** `{ [key: string]: string? }`

#### ExceptionList

A list of exceptions that will ignore certain uses or false positives of profanity.

-   **Type:** `{ [key: string]: (string | Function)[] }`

### Examples

Here are _a few_ examples to get you started!

#### Swear word counter

```js
const fanum = new Fanum()
const inputString = "maybe use something like Inquirer to obtain user input?"
const words = fanum.findProfanity(inputString).map(m => m.word)
if (!words.length) {
    console.log("Your string is clean!")
} else {
    const avg = words.map(w => w.length).reduce((a, b) => a + b) / words.length
    console.log(
        `Your string contains ${words.length} swear words, ` +
            `with an average length of ${avg} letters.`
    )
}
```

#### Grawlix

```js
const fanum = new Fanum()
const unholyString = "shut the fuck up you useless piece of shit"
fanum.censorProfanity(unholyString, { mask: ["@", "#", "$", "%", "&", "!"] })
// => "shut the #!%$ up you useless piece of $#!&"
```

#### Custom words

```js
const fanum = new Fanum()
const unholyString = "oh boy, these are some very bad words!"

fanum.options.words.very = "really"
fanum.options.words.bad = "cool"
fanum.censorProfanity(unholyString, { mode: "static", mask: "[REDACTED]" })
// => "oh boy, these are some [REDACTED] [REDACTED] words!"
fanum.censorProfanity(unholyString, { mode: "replace" })
// => "oh boy, these are some really cool words!"
```
