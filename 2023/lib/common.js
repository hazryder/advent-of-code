import fs from "fs"

export function loadInputFromFile(filepath) {
    return fs.readFileSync(filepath, "utf-8")
        .split("\n")
        .map(e =>
            e.replace("\r", "")
        )
}