import WORDS from "./data/words"
import EXCEPTIONS from "./data/exceptions"
import { default as findProfanity } from "./findProfanity"
import { default as checkProfanity } from "./checkProfanity"
import { default as censorProfanity } from "./censorProfanity"
import { Profanity } from "./private/findWord"

/**
 * @typedef WordList
 * @type {Object<string, string> | string[]}
 */
type WordList =
    | {
          [key: string]: string
      }
    | string[]

/**
 * @typedef ExceptionList
 * @type {Object<string, Array<string | Function>>}
 */
type ExceptionList = {
    [key: string]: (string | ((match: Profanity, input: string) => boolean))[]
}

/**
 * @typedef FanumOptions
 * @property {WordList} words The word/replacement list to use.
 * @property {ExceptionList} exceptions The exception list to use.
 * @property {boolean} extendWordList Whether the provided word and/or exception lists should be "merged" with the default word lists. Useful if you want to extend them and don't want to add the words manually after instantiation. This option is only used within the constructor; mutating it after instantiation has no effect.
 * @property {number} maxCharacterSeparation The maximum number of "irrelevant" characters there can be inbetween the characters of a word. For example, if this option is set to `1`, "f..uck" will no longer be considered profane. Can be Infinity.
 */
type FanumOptions = {
    words?: WordList
    exceptions?: ExceptionList
    extendWordList?: boolean
    maxCharacterSeparation?: number
}

/**
 * Main class.
 * @class
 */
export default class Fanum {
    options: FanumOptions = {}

    /**
     * @constructor
     * @param {FanumOptions} options Options to detect profanity.
     */
    constructor({
        words = Object.assign(WORDS.SWEARS, WORDS.INSULTS, WORDS.SLURS),
        exceptions = EXCEPTIONS,
        extendWordList = false,
        maxCharacterSeparation = 25
    }: FanumOptions = {}) {
        // [ "word" ] => { word: null }
        if (Array.isArray(words)) words = Object.fromEntries(words.map(w => [w, null]))
        if (extendWordList && typeof words === "object")
            words = Object.assign(WORDS.SWEARS, WORDS.INSULTS, WORDS.SLURS, words)
        if (extendWordList && typeof exceptions === "object")
            exceptions = Object.assign(EXCEPTIONS, exceptions)

        this.options.words = words
        this.options.exceptions = exceptions
        this.options.maxCharacterSeparation = maxCharacterSeparation
    }

    findProfanity = findProfanity
    checkProfanity = checkProfanity
    censorProfanity = censorProfanity
}
