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

const NUMBERS_MATCH = "one|two|three|four|five|six|seven|eight|nine"

function calculateFileValueFirstStar(filepath) {
    let inputText = fs.readFileSync(filepath, "utf-8").split('\n')

    let total = 0

    for (let line of inputText) {
        total += calculateLineValueDigits(line)
    }

    console.log("First star:", total)
}

function calculateFileValueSecondStar(filepath) {
    let inputText = fs.readFileSync(filepath, "utf-8").split('\n')

    let total = 0

    for (let line of inputText) {
        let value = calculateLineValueDigitsWords(line)

        console.log("Line", line, "Value: ", value)
        
        total += value
    }

    console.log("Second star:", total)
}

function calculateLineValueDigits(line) {
    let firstVal = getLineValueFirstDigit(line)
    let lastVal = getLineValueLastDigit(line)

    return Number(`${firstVal}${lastVal}`)
}

function calculateLineValueDigitsWords(line) {
    let firstVal = getLineValueFirstDigitOrWord(line)
    let lastVal = getLineValueLastDigitOrWord(line)

    return Number(`${firstVal}${lastVal}`)
}

function getLineValueFirstDigit(line) {
    return getMatch(line, new RegExp(/\d/))
}

function getLineValueLastDigit(line) {
    return getMatch(line, new RegExp(/(\d)(?!.*\d)/))
}

function getLineValueFirstDigitOrWord(line) {
    return getMatch(line, new RegExp(`\\d|${NUMBERS_MATCH}`))
}

function getLineValueLastDigitOrWord(line) {
    let matches = getMatches(line, new RegExp(`(?=(\\d|${NUMBERS_MATCH})(?!.*(\\d|${NUMBERS_MATCH})))`, "g"))

    if (isNaN(parseInt(matches[matches.length -1][1]))) {
        return NUMBERS[matches[matches.length -1][1]]
    }
    else {
        return matches[matches.length -1][1]
    }
}

function getMatch(line, regex) {
    let match = line.match(regex)

    if (!match || !match[0]) return null
    else if (isNaN(parseInt(match[0]))) {
        return NUMBERS[match[0]]
    }
    else {
        return match[0]
    }
}

function getMatches(line, regex) {
    return [...line.matchAll(regex)]
}

calculateFileValueFirstStar("./input.txt")
calculateFileValueSecondStar("./input.txt")