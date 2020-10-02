import censorWord from "./private/censorWord"

/**
 * @typedef CensorOptions
 * @property {"mask" | "static" | "replace"} mode If `"mask"`, the `mask` option will be repeated to fit every word. If `"static"`, every word will be replaced with the mask, regardless of their length. If `"replace"`, the words will be replaced with their safe counterparts; if they're unavailable, an error will be thrown.
 * @property {string | Array<string>} mask The mask to use with `mode` `"mask"` or `"static"`. If an array, a random element will be chosen for every word.
 * @property {"raw" | "word"} maskLengthBehavior How to detect how long masks should be. If `"raw"`, the input length will be used (`"b a d .w o r d"` will be converted to `"**************"`). If `"word"`, the length of the base word will be used (`"b a d .w o r d"` will be converted to `"*******"`). Used in conjunction with `mode` `"mask"`.
 * @property {boolean} maskIrrelevantCharacters Whether to mask "irrelevant" or non-letter characters. For example, if this option is false, `"f uc  k"` will be masked as `"* **  *"`. Used in conjunction with `maskLengthBehavior` `"raw"` and `mode` `"mask"`.
 * @property {boolean} replicateTextStyle Whether to replicate the style of replaced words. For example, `"fUCK"` will be replaced as `"fRICK"`. Used in conjunction with `mode` `"replace"`.
 */
export type CensorOptions = {
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
        mask = "*",
        maskLengthBehavior = "word",
        maskIrrelevantCharacters = true,
        replicateTextStyle = true
    }: CensorOptions = {}
): string {
    const options = {
        mode,
        mask,
        maskLengthBehavior,
        maskIrrelevantCharacters,
        replicateTextStyle
    }

    for (const match of this.findProfanity(text)) {
        const start = match.index
        const end = match.index + match.raw.length
        text = text.slice(0, start) + censorWord(match, options) + text.slice(end)
    }
    return text
}
