import pluralize = require("pluralize")
import findWord from "./private/findWord"
import { Profanity } from "./private/findWord"

/**
 * Find profanity in a string.
 * @param {string} text The text to search for profanity in.
 */
export default function findProfanity(text: string): Profanity[] {
    let profanities = []
    for (const word of Object.keys(this.options.words)) {
        if (pluralize.isSingular(word)) {
            const plural = pluralize(word)
            const pluralMatches = findWord.bind(this)(text, plural, word)
            profanities = profanities.concat(pluralMatches)
        }
        const matches = findWord.bind(this)(text, word)
        profanities = profanities.concat(matches)
    }
    let indices = []
    profanities = profanities.filter((_, i) => {
        const duplicate = indices.includes(profanities[i].index)
        indices.push(profanities[i].index)
        return !duplicate
    })

    return profanities
}
