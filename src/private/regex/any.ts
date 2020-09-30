import escapeRegex from "./escape"

export default function createAnyRegex(strings: string[]): string {
    return "(" + strings.map(escapeRegex).join("|") + ")"
}
