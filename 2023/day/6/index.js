import { loadInputFromFile } from "../../lib/common.js"

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let races = parseRaces(inputStrings)

    let winningRecords = calculateWinningRecords(races)

    let starValue = calculateFirstStarValue(winningRecords)

    console.log("Star value:", starValue)
}

function calculateSecondStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let race = parseRace(inputStrings)

    let winningRecords = calculateWinningRecords([race])

    console.log("Star value:", winningRecords[0].length)
}

function parseRaces(inputStrings) {
    let times = [...inputStrings[0].matchAll(new RegExp(/\d+/, "g"))].map(e => Number(e[0]))
    let distances = [...inputStrings[1].matchAll(new RegExp(/\d+/, "g"))].map(e => Number(e[0]))

    return times.map((e, i) => ({
        time: e,
        distance: distances[i]
    }))
}

function parseRace(inputStrings) {
    return {
        time: [...inputStrings[0].matchAll(new RegExp(/\d+/, "g"))].map(e => Number(e[0])).join(""),
        distance: [...inputStrings[1].matchAll(new RegExp(/\d+/, "g"))].map(e => Number(e[0])).join(""),
    }
}

function calculateWinningRecords(races) {
    return races.map(e => calculateWinningRaceRecords(e))
}

function calculateWinningRaceRecords(race) {
    let winningValues = []

    for (let holdTime = 1; holdTime <= race.time; holdTime++) {
        let distance = holdTime * (race.time - holdTime)

        if(distance > race.distance) winningValues.push(holdTime)
    }

    return winningValues
}

function calculateFirstStarValue(records) {
    let _records = records.map(e => e.length)

    return _records.reduce((acc, curr) => acc * curr, 1)
}

calculateFirstStar()
calculateSecondStar()