import { loadInputFromFile } from "../../lib/common.js"

const NUMBERS_MATCH = /\d/
const SPECIAL_CHARS_MATCH = /^(?:(?![.\d]).)*$/ // Match everything except digits and '.'

function calculateFirstStar() {
    let grid = loadInputFromFile("./input.txt")

    let cells = createCellArray(grid)

    let validCells = calculateCellsWithAdjacentSpecialChars(cells)

    let validNumbers = calculateValidNumbers(cells, validCells)

    let starValue = validNumbers.reduce((acc, curr) => {
        return acc + curr
    }, 0)

    console.log("Star value:", starValue)
}

function createCellArray(lineArray) {
    return lineArray.map((str, y) =>
        str.split("").map((value, x) =>
            ({ value, x, y })
        ));
}

// Locate cells containing numbers with adjacent special characters, 
// where that cell isn't part of a number already included in the list of valid cells
function calculateCellsWithAdjacentSpecialChars(cells) {
    let validCells = []

    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[0].length; x++) {
            let cell = cells[y][x]

            if (cellContainsCharacter(cell, NUMBERS_MATCH)) {
                if(cellHasAdjacentCharacter(cells, cell, SPECIAL_CHARS_MATCH)) {
                    let cellValid = true

                    // Seach right
                    for (let x = cell.x + 1; true; x++) {
                        let lateralCell = cells[cell.y][x]
            
                        if (lateralCell && cellContainsCharacter(lateralCell, NUMBERS_MATCH)) {
                            if (validCells.includes(lateralCell)) {
                                cellValid = false
                            }
                        }
                        else {
                            break
                        }
                    }

                    // Search left
                    for (let x = cell.x - 1; true; x--) {
                        let lateralCell = cells[cell.y][x]
            
                        if (lateralCell && cellContainsCharacter(lateralCell, NUMBERS_MATCH)) {
                            if (validCells.includes(lateralCell)) {
                                cellValid = false
                            }
                        }
                        else {
                            break
                        }
                    }

                    if(cellValid) {
                        validCells.push(cell)
                    }
                }
            }
        }
    }

    return validCells
}

function calculateValidNumbers(cells, validCells) {
    let validNumbers = []

    for (let cell of validCells) {
        let number = `${cell.value}`

        // Check each following lateral char for numbers, until one isn't found
        // Concat all these values
        for (let x = cell.x + 1; true; x++) {
            let adjacentCell = cells[cell.y][x]

            if (adjacentCell && cellContainsCharacter(adjacentCell, NUMBERS_MATCH)) {
                number = `${number}${adjacentCell.value}`
            }
            else {
                break
            }
        }

        // Check each preceeding lateral char for numbers, until one isn't found
        // Concat all these values
        for (let x = cell.x - 1; true; x--) {
            let adjacentCell = cells[cell.y][x]

            if (adjacentCell && cellContainsCharacter(adjacentCell, NUMBERS_MATCH)) {
                number = `${adjacentCell.value}${number}`
            }
            else {
                break
            }
        }

        validNumbers.push(Number(number))
    }

    return validNumbers
}

function cellContainsCharacter(cell, match) {
    return cell.value.match(match)
}

function cellHasAdjacentCharacter(cells, cell, match) {
    // Check each surrounding cell for a match
    for (let y = cell.y - 1; y <= (cell.y + 1); y++) {
        for (let x = cell.x - 1; x <= (cell.x + 1); x++) {
            // Fix bounds to top/bottom rows
            if (cells[y]) {
                let adjacentCell = cells[y][x]

                if (adjacentCell &&
                    adjacentCell !== cell &&
                    cellContainsCharacter(adjacentCell, match)
                ) {
                    return adjacentCell
                }
            }
        }
    }

    return null
}

calculateFirstStar()