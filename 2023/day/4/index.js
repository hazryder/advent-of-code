import { loadInputFromFile } from "../../lib/common.js"

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let cards = createCards(inputStrings)

    let starValue = cards.reduce((acc, curr) => {
        return acc + curr.score
    }, 0)

    console.log("Star value:", starValue)
}

function createCards(inputStrings) {
    let cards = []

    for (let str of inputStrings) {
        let splitStr = str.split(":")

        let cardId = splitStr[0].match(/\d+/)[0]

        let winningString = splitStr[1].split("|")[0]
        let winningNumbers = winningString.trim().replaceAll("  ", " ").split(" ")

        let userString = splitStr[1].split("|")[1]
        let userNumbers = userString.trim().replaceAll("  ", " ").split(" ")

        let matchingNumbers = userNumbers.filter(e => winningNumbers.includes(e))

        let score = matchingNumbers.length === 0 ? 0 :
            2 ** (matchingNumbers.length -1)

        cards.push({
            cardId,
            winningNumbers,
            userNumbers,
            matchingNumbers,
            score
        })
    }

    return cards
}

calculateFirstStar()