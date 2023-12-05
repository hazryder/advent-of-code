import { loadInputFromFile } from "../../lib/common.js"

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let seeds = parseSeeds(inputStrings[0])

    let maps = parseMaps(inputStrings.slice(2))

    seeds = calculateMapValues(seeds, maps)

    let starValue = Math.min(...seeds.map(e => e.location))

    console.log("Star value:", starValue)
}

function calculateSecondStar() {
    let startTime = new Date()
    
    let inputStrings = loadInputFromFile("./input.txt")

    let seeds = parseSeeds(inputStrings[0])

    let maps = parseMaps(inputStrings.slice(2))

    let starValue = calculateSecondStarValue(seeds, maps)

    let endTime = new Date()

    console.log("Star value:", starValue, endTime - startTime)
}

function parseSeeds(seedStr) {
    let matches = seedStr.match(new RegExp(/\d+/, "g"))

    return matches.map(e => ({
        id: Number(e)
    }))
}

function calculateSecondStarValue(seeds, maps) {
    let lowestLocation = Number.MAX_VALUE

    for (let i = 0; i < seeds.length; i+= 2) {
        console.log("Processing seed", i, "/", seeds.length, "(", seeds[i+1].id, "sub-seeds)")

        let startTime = new Date()

        for (let j = seeds[i].id; j <= (seeds[i].id + seeds[i+1].id); j++) {
            let seed = calculateMapValues([{id: j}], maps)

            if (seed[0].location <= lowestLocation) {
                lowestLocation = seed[0].location

                console.log("Got new lowest location", lowestLocation)
            }
        }

        let endTime = new Date()

        console.log("Processed in:", endTime - startTime, "ms")
    }

    return lowestLocation
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
    let _seeds = [...seeds]

    for (let seed of _seeds) {
       seed.location = maps.reduce((acc, curr) => {
        return calculateMapValue(acc, curr)
       }, seed.id)
    }

    return _seeds
}

function calculateMapValue(input, map) {
    for (let row of map.rows) {
        if (input >= row.sourceStart && input <= (row.sourceStart + row.range)) {
            return input - (row.sourceStart - row.destinationStart)
        }
    }

    return input
}

//calculateFirstStar()
calculateSecondStar()