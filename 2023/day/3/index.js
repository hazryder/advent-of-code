import { loadInputFromFile } from "../../lib/common.js"

const NUMBERS_MATCH = /\d/
const SPECIAL_CHARS_MATCH = /^(?:(?![.\d]).)*$/ // Match everything except digits and '.'

function calculateFirstStar() {
    let grid = loadInputFromFile("./input.txt")

    let cells = createCellArray(grid)

    let validCells = calculateCellsWithAdjacentSpecialChars(cells)

    let validNumbers = calculateValidNumbers(cells, validCells)

    let starValue = validNumbers.reduce((acc, curr) => {
        return acc + curr.value
    }, 0)

    console.log("Star value:", starValue)
}

function calculateSecondStar() {
    let grid = loadInputFromFile("./input.txt")

    let cells = createCellArray(grid)

    let validCells = calculateCellsWithAdjacentSpecialChars(cells)

    let validNumbers = calculateValidNumbers(cells, validCells)

    let starCells = calculateStarCells(cells)

    let validStarCells = calculateValidStarCells(validNumbers, starCells)

    let starValue = validStarCells.reduce((acc, curr) => {
        return acc + curr.gearRatio
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
                if (cellHasAdjacentCharacter(cells, cell, SPECIAL_CHARS_MATCH)) {
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

                    if (cellValid) {
                        validCells.push(cell)
                    }
                }
            }
        }
    }

    return validCells
}

function calculateStarCells(cells) {
    let starCells = []

    for (let y = 0; y < cells.length; y++) {
        for (let x = 0; x < cells[0].length; x++) {
            if(cells[y][x].value === "*") {
                starCells.push(cells[y][x])
            }
        }
    }

    return starCells
}

function calculateValidNumbers(cells, validCells) {
    let validNumbers = []

    for (let cell of validCells) {
        let _value = `${cell.value}`
        let _cells = [cell]

        // Check each following lateral char for numbers, until one isn't found
        // Concat all these values
        for (let x = cell.x + 1; true; x++) {
            let adjacentCell = cells[cell.y][x]

            if (adjacentCell && cellContainsCharacter(adjacentCell, NUMBERS_MATCH)) {
                _value = `${_value}${adjacentCell.value}`

                _cells.push(adjacentCell)
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
                _value = `${adjacentCell.value}${_value}`

                _cells = [adjacentCell].concat(_cells)
            }
            else {
                break
            }
        }

        validNumbers.push({ value: Number(_value), cells: _cells })
    }

    return validNumbers
}

function calculateValidStarCells(validNumbers, starCells) {
    // for each * cell, check each surrounding cell
    // if two surrounding cells are contained within validnumbercells, but not within the same number, add to valid gears
    let validStarCells = []

    for (let starCell of starCells) {
        let adjacentValidNumbers = []

        for (let y = starCell.y - 1; y <= (starCell.y + 1); y++) {
            for (let x = starCell.x - 1; x <= (starCell.x + 1); x++) {
                for (let number of validNumbers) {
                    for (let numberCell of number.cells) {
                        if(numberCell.x === x && numberCell.y === y && !adjacentValidNumbers.includes(number)) {
                            adjacentValidNumbers.push(number)
                        }
                    }
                }
            }
        }

        if(adjacentValidNumbers.length === 2) {
            validStarCells.push({
                cell: starCell,
                gearRatio: Number(adjacentValidNumbers[0].value) * Number(adjacentValidNumbers[1].value),
                adjacentNumbers: adjacentValidNumbers
            })
        }
    }

    return validStarCells
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
calculateSecondStar()