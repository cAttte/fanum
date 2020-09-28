import CHARACTERS from "./data/characters"

function escapeRegex(string: string): string {
    return string.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&")
}

function chooseRegex(strings: string[]): string {
    return "(" + strings.map(escapeRegex).join("|") + ")"
}

type Profanities = Array<{
    index: number
    word: string
    raw: string
    replacement: string
}>

/**
 * Find profanity in a string.
 * @param {string} text The text to search for profanity in.
 */
export default function findProfanity(text: string): Profanities {
    const profanities = []
    for (const word of Object.keys(this.options.words)) {
        const letters = word.replace(/_/g, "").split("")
        const max = this.options.maxCharacterSeparation
        const separator =
            chooseRegex(CHARACTERS.IRRELEVANT) + (max === Infinity ? "*" : `{0,${max}}`)
        const regexBody = letters
            .map(letter => {
                const characters = CHARACTERS[letter.toLowerCase()] || [letter]
                return chooseRegex(characters)
            })
            .join(separator)
        const regex = new RegExp(regexBody, "g")
        let match: RegExpExecArray
        while ((match = regex.exec(text)) != null) {
            profanities.push({
                index: match.index,
                word: word,
                raw: match[0],
                replacement: this.options.words[word] || null
            })
        }
    }
    return profanities
}
