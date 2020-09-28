function detectCase(string: string): "upper" | "lower" {
    if (!string) return null
    const lowercase = string.toLowerCase()
    const uppercase = string.toUpperCase()
    if (string === lowercase && string !== uppercase) return "lower"
    else if (string === uppercase && string !== lowercase) return "upper"
    else return null
}

// TODO: replicate stuff like spaces/irrelevant characters
// ("text", "f  uc.k" => "t  ex.t")
// and maybe even quirky text
// ("text", "𝕗𝕦𝕔𝕜" => "𝕥𝕖𝕩𝕥")
export default function replicateTextStyle(target: string, source: string): string {
    const consistentCase = detectCase(source)
    if (consistentCase)
        return consistentCase === "upper" ? target.toUpperCase() : target.toLowerCase()

    let restCase = null
    let result = ""
    for (let i = 0; i < target.length; i++) {
        const _case = restCase || detectCase(source[i]) || "lower"
        const char = target[i]
        result += _case === "upper" ? char.toUpperCase() : char.toLowerCase()
        if (i === source.length - 1) restCase = _case
    }
    return result
}
