import escapeRegex from "./escapeRegex"

export default function chooseRegex(strings: string[]): string {
    return "(" + strings.map(escapeRegex).join("|") + ")"
}
