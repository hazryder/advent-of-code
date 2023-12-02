import fs from "fs"

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let games = createGamesFromStrings(inputStrings)

    let inputTokens = {
        red: 12,
        green: 13,
        blue: 14
    }

    let validGames = calculateValidGames(games, inputTokens)

    let starValue = validGames.reduce((acc, curr) => {
        return acc + curr.id
    }, 0)

    console.log("Star value:", starValue)
}

function loadInputFromFile(filepath) {
    return fs.readFileSync(filepath, "utf-8")
        .split("\n")
        .map(e =>
            e.replace("\r", "")
        )
}

function createGamesFromStrings(strings) {
    return strings.map(e => {
        let id = Number(
            e.split(":")[0]
                .match(/\d+/)[0]
        )

        let tokenString = e.split(":")[1].replaceAll(" ", "")

        let tokenSetStrings = tokenString.split(";")

        let tokenSets = tokenSetStrings.map(x => {
            let tokenStrings = x.split(",")

            let tokens = {}

            for (let tokenString of tokenStrings) {
                let amount = Number(
                    tokenString.match(/\d+/)[0]
                )

                let colour = tokenString.match(/[a-z]+/)[0]

                tokens[colour] = (tokens[colour] ?? 0) + amount
            }

            return tokens
        })

        return {
            id: id,
            tokenSets: tokenSets
        }
    })
}

function calculateValidGames(games, inputTokens) {
    let validGames = []

    for (let game of games) {
        let isValid = true

        for (let tokenSet of game.tokenSets) {
            for (let colour of Object.keys(inputTokens)) {
                if (
                    tokenSet[colour] &&
                    (tokenSet[colour] > inputTokens[colour])
                ) {
                    isValid = false

                    break
                }
            }

            if (!isValid) break
        }

        if (isValid) validGames.push(game)
    }

    return validGames
}

calculateFirstStar()