import CHARACTERS from "../data/characters"
import replicateTextStyle from "../private/replicateTextStyle"
import { CensorOptions } from "../censorProfanity"
import { Profanity } from "./findWord"

export default function censorWord(match: Profanity, options: CensorOptions): string {
    if (options.mode === "mask") {
        const word = options.maskLengthBehavior === "raw" ? match.raw : match.word
        const mask = Array.isArray(options.mask)
            ? Array(match.raw.length)
                  .fill(null)
                  .map(() => {
                      return options.mask[Math.floor(Math.random() * options.mask.length)]
                  })
                  .join("")
                  .slice(0, word.length)
            : options.mask.repeat(match.raw.length).slice(0, word.length)
        if (options.maskIrrelevantCharacters) {
            return mask
        } else {
            let masked = ""
            let i = 0
            for (const character of match.raw) {
                if (CHARACTERS.IRRELEVANT.includes(character)) masked += character
                else masked += mask[i]
                i++
            }
            return masked
        }
    } else if (options.mode === "static") {
        const mask = Array.isArray(options.mask)
            ? options.mask[Math.floor(Math.random() * options.mask.length)]
            : options.mask
        return mask
    } else if (options.mode === "replace") {
        if (!match.replacement)
            throw new Error(`Replacement for "${match.word}" unavailable.`)
        return options.replicateTextStyle
            ? replicateTextStyle(match.replacement, match.raw)
            : match.replacement
    }
    return match.raw
}
