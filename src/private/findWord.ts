import pluralize = require("pluralize")
import createWordRegex from "./regex/word"

/**
 * @typedef Profanity
 * @property {number} index The index in the input string of the word.
 * @property {string} word The word found. For example, `"fucks"`.
 * @property {string} base The "base" word, unmodified, from the word list. For example, `"fuck"`.
 * @property {string} raw The actual input as found inside the string. For example, `"Fuc.ks"`.
 * @property {string} replacement The replacement of the word, if any. For example, `"frick"`.
 */
export type Profanity = {
    index: number
    word: string
    base: string
    raw: string
    replacement: string
}

export default function findWord(text: string, word: string, base?: string): Profanity[] {
    const profanities = []
    const regexBody = createWordRegex(word, this.options.maxCharacterSeparation)
    const regex = new RegExp(regexBody, "g")
    let match: RegExpExecArray

    while ((match = regex.exec(text)) != null) {
        profanities.push({
            index: match.index,
            word: word,
            base: base || word,
            raw: match[0],
            replacement:
                base && this.options.words[base]
                    ? pluralize(this.options.words[base])
                    : this.options.words[word] || null
        })
    }
    return profanities
}
