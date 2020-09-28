import CHARACTERS from "./data/characters"
import replicateTextStyle from "./private/replicateTextStyle"

/**
 * @typedef CensorOptions
 * @property {"mask" | "static" | "replace"} mode If `"mask"`, the `mask` option will be repeated to fit every word. If `"static"`, every word will be replaced with the mask, regardless of their length. If `"replace"`, the words will be replaced with their safe counterparts; if they're unavailable, an error will be thrown.
 * @property {string | Array<string>} mask The mask to use with `mode` `"mask"` or `"static"`. If an array, a random element will be chosen for every word.
 * @property {"raw" | "word"} maskLengthBehavior How to detect how long masks should be. If `"raw"`, the input length will be used (`"b a d .w o r d"` will be converted to `"**************"`). If `"word"`, the length of the base word will be used (`"b a d .w o r d"` will be converted to `"*******"`). Used in conjunction with `mode` `"mask"`.
 * @property {boolean} maskIrrelevantCharacters Whether to mask "irrelevant" or non-letter characters. For example, if this option is false, `"f uc  k"` will be masked as `"* **  *"`. Used in conjunction with `maskLengthBehavior` `"raw"` and `mode` `"mask"`.
 * @property {boolean} replicateTextStyle Whether to replicate the style of replaced words. For example, `"fUCK"` will be replaced as `"fRICK"`. Used in conjunction with `mode` `"replace"`.
 */
type CensorOptions = {
    mode?: "mask" | "static" | "replace"
    mask?: string | string[]
    maskLengthBehavior?: "raw" | "word"
    maskIrrelevantCharacters?: boolean
    replicateTextStyle?: boolean
}

/**
 * Censor profanity in a string.
 * @param {string} text The text to censor profanity in.
 * @param {CensorOptions} options Options to detect profanity.
 */
export default function censorProfanity(
    text: string,
    {
        mode = "mask",
        mask: maskCharacter = "*",
        maskLengthBehavior = "word",
        maskIrrelevantCharacters = true,
        replicateTextStyle: replicateTextStyleOption = true
    }: CensorOptions = {}
): string {
    for (const profanity of this.findProfanity(text)) {
        text = text.replace(profanity.raw, match => {
            if (mode === "mask") {
                const word = maskLengthBehavior === "raw" ? match : profanity.word
                const mask = Array.isArray(maskCharacter)
                    ? Array(match.length)
                          .fill(null)
                          .map(() => {
                              return maskCharacter[
                                  Math.floor(Math.random() * maskCharacter.length)
                              ]
                          })
                          .join("")
                          .slice(0, word.length)
                    : maskCharacter.repeat(match.length).slice(0, word.length)
                if (maskIrrelevantCharacters) {
                    return mask
                } else {
                    let masked = ""
                    let i = 0
                    for (const character of match) {
                        if (CHARACTERS.IRRELEVANT.includes(character)) masked += character
                        else masked += mask[i]
                        i++
                    }
                    return masked
                }
            } else if (mode === "static") {
                const mask = Array.isArray(maskCharacter)
                    ? maskCharacter[Math.floor(Math.random() * maskCharacter.length)]
                    : maskCharacter
                return mask
            } else if (mode === "replace") {
                if (!profanity.replacement)
                    throw new Error(`Replacement for "${profanity.word}" unavailable.`)
                return replicateTextStyleOption
                    ? replicateTextStyle(profanity.replacement, profanity.raw)
                    : profanity.replacement
            }
            return match
        })
    }
    return text
}
