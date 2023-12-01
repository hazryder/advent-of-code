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

function calculateFileValueFirstStar(filepath) {
    let inputText = fs.readFileSync(filepath, "utf-8").split('\n')

    let total = 0

    for (let line of inputText) {
        total += calculateLineValue(line)
    }

    console.log("First star:", total)
}

function calculateFileValueSecondStar(filepath) {
    let inputText = fs.readFileSync(filepath, "utf-8").split('\n')

    let total = 0

    for (let line of inputText) {
        for(let number of Object.keys(NUMBERS)) {
            line = line.replaceAll(number, NUMBERS[number])
        }
        
        total += calculateLineValue(line)
    }

    console.log("Second star:", total)
}

function calculateLineValue(line) {
    let firstVal = getLineValueFirstDigit(line)
    let lastVal = getLineValueLastDigit(line)

    // console.log("Line", line, "Value: ", Number(`${firstVal}${lastVal}`))

    return Number(`${firstVal}${lastVal}`)
}

function getLineValueFirstDigit(line) {
    return getMatch(line, new RegExp(/\d/))
}

function getLineValueLastDigit(line) {
    return getMatch(line, new RegExp(/(\d)(?!.*\d)/))
}

function getMatch(line, regex) {
    let match = line.match(regex)

    if (!match || !match[0]) return null
    else {
        return match[0]
    }
}

calculateFileValueFirstStar("./input.txt")
calculateFileValueSecondStar("./input.txt")