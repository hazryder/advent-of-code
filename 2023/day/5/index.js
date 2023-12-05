import { loadInputFromFile } from "../../lib/common.js"

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let seeds = parseSeeds(inputStrings[0])

    let maps = parseMaps(inputStrings.slice(2))

    calculateMapValues(seeds, maps)

    let starValue = Math.min(...seeds.map(e => e.location))

    console.log("Star value:", starValue)
}

function parseSeeds(seedStr) {
    let matches = seedStr.match(new RegExp(/\d+/, "g"))

    return matches.map(e => ({
        id: Number(e)
    }))
}

function parseMaps(mapStrings) {
    let maps = [
        {
            name: "seed-to-soil"
        },
        {
            name: "soil-to-fertilizer"
        },
        {
            name: "fertilizer-to-water"
        },
        {
            name: "water-to-light"
        },
        {
            name: "light-to-temperature"
        },
        {
            name: "temperature-to-humidity"
        },
        {
            name: "humidity-to-location"
        }
    ]

    for (let map of maps) {
        let startLine = mapStrings.indexOf(mapStrings.find(e => e.includes(map.name))) + 1
        let endLine = calculateMapEndLine(mapStrings, startLine)

        map.rows = parseMapRows(mapStrings.slice(
            startLine,
            endLine
        ))
    }

    return maps
}

function parseMapRows(rowStrings) {
    let rows = []

    for (let str of rowStrings) {
        let matches = str.match(new RegExp(/\d+/, "g"))

        rows.push({
            sourceStart: Number(matches[1]),
            destinationStart: Number(matches[0]),
            range: Number(matches[2])
        })
    }

    return rows
}

function calculateMapEndLine(mapStrings, startLine) {
    for (let i = startLine; i < mapStrings.length; i++) {
        if(mapStrings[i] === "") {
            return i
        } 
    }

    return mapStrings.length
}

function calculateMapValues(seeds, maps) {
    for (let seed of seeds) {
       seed.location = maps.reduce((acc, curr) => {
        return calculateMapValue(acc, curr)
       }, seed.id)
    }
}

function calculateMapValue(input, map) {
    for (let row of map.rows) {
        if (input >= row.sourceStart && input <= (row.sourceStart + row.range)) {
            return input - (row.sourceStart - row.destinationStart)
        }
    }

    return input
}

calculateFirstStar()