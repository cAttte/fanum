/**
 * Check whether a string contains profanity.
 * @param {string} text The text to check profanity for.
 */
export default function checkProfanity(text: string): boolean {
    const matches = this.findProfanity(text)
    if (matches.length) return true
    else return false
}
