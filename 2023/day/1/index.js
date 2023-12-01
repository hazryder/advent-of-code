import fs from "fs"

const NUMBERS = {
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9"
}

const NUMBERS_MATCH = `one|two|three|four|five|six|seven|eight|nine`

function calculateFileValue(filepath) {
    let inputText = fs.readFileSync(filepath, "utf-8").split('\n')

    let total = 0

    for (let line of inputText) {
        total += calculateLineValue(line)
    }

    console.log("Total:", total)
}

function calculateLineValue(line) {
    let firstVal = getLineValueFirstDigit(line)
    if (!firstVal) firstVal = getLineValueFirstWord(line)

    let lastVal = getLineValueLastDigit(line)
    if (!lastVal) lastVal = getLineValueLastWord(line)

    return Number(`${firstVal}${lastVal}`)
}

function getLineValueFirstDigit(line) {
    let match = line.match(/\d/)

    if (!match || !match[0]) return null
    else return match[0]
}

function getLineValueLastDigit(line) {
    let match = line.match(/(\d)(?!.*\d)/)

    if (!match || !match[0]) return null
    else return match[0]
}

function getLineValueFirstWord(line) {
    let match = line.match(new RegExp(`(${NUMBERS_MATCH})`))

    if (!match || !match[0]) return null
    else return NUMBERS[match[0]]
}

function getLineValueLastWord(line) {
    let match = line.match(new RegExp(`(${NUMBERS_MATCH})(?!.*(${NUMBERS_MATCH}))`))

    if (!match || !match[0]) return null
    else return NUMBERS[match[0]]
}

calculateFileValue("./input.txt")