import CHARACTERS from "../data/characters"
import pluralize = require("pluralize")
import createChooseRegex from "./createChooseRegex"

/**
 * @typedef Profanity
 * @property {number} index The index in the input string of the word.
 * @property {string} word The "base" or "ID" of the word. For example, `"fuck"`.
 * @property {string} raw The actual input as found inside the string. For example, `"Fuc.k"`.
 * @property {string} replacement The replacement of the word, if any. For example, `"frick"`.
 */
export type Profanity = {
    index: number
    word: string
    raw: string
    replacement: string
}

export default function findWord(
    text: string,
    word: string,
    singular?: string
): Profanity[] {
    const profanities = []
    const letters = word.replace(/_/g, "").split("")
    const max = this.options.maxCharacterSeparation
    const separator =
        createChooseRegex(CHARACTERS.IRRELEVANT) + (max === Infinity ? "*" : `{0,${max}}`)
    const regexBody = letters
        .map(letter => {
            const characters = CHARACTERS[letter.toLowerCase()] || [letter]
            return createChooseRegex(characters)
        })
        .join(separator)
    const regex = new RegExp(regexBody, "g")
    let match: RegExpExecArray

    while ((match = regex.exec(text)) != null) {
        profanities.push({
            index: match.index,
            word: singular || word,
            raw: match[0],
            replacement: singular
                ? pluralize(this.options.words[singular])
                : this.options.words[word] || null
        })
    }
    return profanities
}
