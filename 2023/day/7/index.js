import { loadInputFromFile } from "../../lib/common.js"

const CARDS = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"]

function calculateFirstStar() {
    let inputStrings = loadInputFromFile("./input.txt")

    let hands = parseHands(inputStrings)

    hands = calculateHandRanks(hands)

    let sortedHands = sortHands(hands)

    console.log(hands)

    // parse hands
    // calc hand strengths
    // order by strength
    // calc winnings
    // total winnings

}

function calculateSecondStar() {
    let inputStrings = loadInputFromFile("./input.txt")
}

function parseHands(inputStrings) {
    let handStrings = inputStrings.map(e => e.substring(0, 5))
    let handWagers = inputStrings.map(e => e.substring(6))

    return handStrings.map((e, i) => ({
        cards: e.split(""),
        sortedCards: e.split("").sort(),
        wager: Number(handWagers[i])
    }))
}

function calculateHandRanks(hands) {
    return hands.map(e => {
        let handType
        if(e.sortedCards[0] === e.sortedCards[4]) {
            // Five of a kind
            handType = 7
        } else if(e.sortedCards[0] === e.sortedCards[3]) {
            // Four of a kind
            handType = 6
        } else if(e.sortedCards[0] === e.sortedCards[2] && e.sortedCards[3] === e.sortedCards[4]) {
            // Full house
            handType = 5
        } else if(e.sortedCards[0] === e.sortedCards[2]) {
            // Three of a kind
            handType = 4
        } else if(e.sortedCards[0] === e.sortedCards[1] && e.sortedCards[2] === e.sortedCards[3]) {
            // Two pairs
            handType = 3
        } else if(e.sortedCards[0] === e.sortedCards[1]) {
            // One pair
            handType = 2
        } else {
            // High card
            handType = 1
        }

        return {
            handType,
            ...e
        }
    })
}

function sortHands(hands) {
    let sortedHands = []

    for(let handType = 7; handType > 0; handType--) {
        sortedHands.push(
            hands.filter(hand => hand.handType === handType)
                .sort((a, b) => {
                    return CARDS.indexOf(a.cards.substring(0,1)) > CARDS.indexOf(b.cards.substring(0,1)) ? -1 : 1
                })
        )
    }
}

calculateFirstStar()
calculateSecondStar()