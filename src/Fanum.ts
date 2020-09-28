import WORDS from "./data/words"
import EXCEPTIONS from "./findExceptions"
import { default as findProfanity } from "./findProfanity"
import { default as checkProfanity } from "./checkProfanity"
import { default as censorProfanity } from "./censorProfanity"

/**
 * @typedef FanumOptions
 * @property {Object<string, string> | string[]} words The word/replacement list to use.
 * @property {Object<string, Function>} exceptions The exception list to use.
 * @property {number} maxCharacterSeparation The maximum number of "irrelevant" characters there can be inbetween the characters of a word. For example, if this option is set to `1`, "f..uck" will no longer be considered profane. Can be Infinity.
 */
type FanumOptions = {
    words?: Record<string, string> | string[]
    exceptions?: Record<string, Function>
    maxCharacterSeparation?: number
}

/**
 * Main class.
 * @class
 */
export default class Fanum {
    options: FanumOptions = {
        words: Object.assign(WORDS.SWEARS, WORDS.INSULTS, WORDS.SLURS),
        exceptions: EXCEPTIONS,
        maxCharacterSeparation: 25
    }

    /**
     * @constructor
     * @param {FanumOptions} options Options to detect profanity.
     */
    constructor(options: FanumOptions = {}) {
        // [ "word" ] => { word: null }
        if (Array.isArray(options.words))
            options.words = Object.fromEntries(options.words.map(w => [w, null]))
        Object.assign(this.options, options)
    }

    findProfanity = findProfanity
    checkProfanity = checkProfanity
    censorProfanity = censorProfanity
}
