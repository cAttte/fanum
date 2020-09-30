import { Profanity } from "./findWord"
import createWordRegex from "./regex/word"

export default function findException(
    match: Profanity,
    input: string,
    exceptions: string[]
): boolean {
    const before = input.slice(0, match.index)
    const after = input.slice(match.index + match.raw.length)
    let isException = false

    for (const exception of exceptions) {
        const exceptionIndex = exception.indexOf(match.base)
        if (exceptionIndex === -1) continue
        const exceptionBefore = exception.slice(0, exceptionIndex)
        const exceptionAfter = exception.slice(exceptionIndex + match.base.length)
        const exceptionBeforeRegex = new RegExp(createWordRegex(exceptionBefore) + "$")
        const exceptionAfterRegex = new RegExp("^" + createWordRegex(exceptionAfter))
        if (before.match(exceptionBeforeRegex) && after.match(exceptionAfterRegex)) {
            isException = true
            break
        }
    }

    return isException
}
