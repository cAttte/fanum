import WORDS from "./data/words"
import EXCEPTIONS from "./findExceptions"
import { default as findProfanity } from "./findProfanity"
import { default as checkProfanity } from "./checkProfanity"
import { default as censorProfanity } from "./censorProfanity"

export default class Fanum {
    words: Record<string, string>
    exceptions: Record<string, Function>

    constructor(
        words: Record<string, string> | string[] = Object.assign(
            WORDS.TAME,
            WORDS.SWEARS,
            WORDS.INSULTS,
            WORDS.SLURS
        ),
        exceptions: Record<string, Function> = EXCEPTIONS
    ) {
        // [ "word" ] => { word: null }
        if (Array.isArray(words)) words = Object.fromEntries(words.map(w => [w, null]))
        this.words = words
        this.exceptions = exceptions
    }

    findProfanity = findProfanity
    checkProfanity = checkProfanity
    censorProfanity = censorProfanity
}
