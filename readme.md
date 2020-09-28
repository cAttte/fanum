# fanum

A JavaScript profanity filter.

## Installation

    $ npm install fanum

## Usage

-   [Fanum](#fanum)
    -   [constructor(options?)](#constructoroptions)
    -   [findProfanity(text)](#findprofanitytext)
    -   [checkProfanity(text)](#checkprofanitytext)
    -   [censorProfanity(text, options)](#censorprofanitytext-options)
-   [Typedefs](#typedefs)
    -   [FanumOptions](#fanumoptions)
    -   [Profanities](#profanities)
    -   [CensorOptions](#censoroptions)

### Fanum

The main class.

```js
const Fanum = require("fanum")
const fanum = new Fanum()

fanum.checkProfanity("fu ck shi t")
//=> true
fanum.censorProfanity("holy sh.1t what the f uck")
//=> "holy **** what the ****"
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

-   **Type:** [`Profanities`](#Profanities)

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

The word/replacement list to use.

-   **Type:** `Object<string, string> | string[]`
-   **Default:** `Object.assign(fanum.WORDS.SWEARS, fanum.WORDS.INSULTS, fanum.WORDS.SLURS)`

##### exceptions

The exception list to use.

-   **Type:** `Object<string, string | Function>`
-   **Default:** `fanum.EXCEPTIONS`

##### maxCharacterSeparation

The maximum number of "irrelevant" characters there can be inbetween the characters of a word. For example, if this option is set to `1`, "f..uck" will no longer be considered profane. Can be _Infinity_.

-   **Type:** `number`
-   **Default:** `25`

#### Profanities

A list of profanity found.

-   **Type:** `Array<{ index, word, raw, replacement }>`

##### index

The index in the input string of the word.

-   **Type:** `number`

##### word

The "base" or "ID" of the word. For example, `"fuck"`.

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

How to detect how long masks should be. If `"raw"`, the input length will be used (`"b a d .w o r d"` will be converted to `"**************"`). If `"word"`, the length of the base word will be used (`"b a d .w o r d"` will be converted to `"*******"`). Used in conjunction with `mode` `"mask"`.

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
