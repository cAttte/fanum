import CHARACTERS from "../../data/characters"
import createChooseRegex from "./any"

export default function createWordRegex(word: string, max: number = Infinity) {
    const separator =
        createChooseRegex(CHARACTERS.IRRELEVANT) + (max === Infinity ? "*" : `{0,${max}}`)
    const regexBody = word
        .split("")
        .map(letter => {
            const characters = CHARACTERS[letter.toLowerCase()] || [letter]
            return createChooseRegex(characters)
        })
        .join(separator)
    return regexBody
}
