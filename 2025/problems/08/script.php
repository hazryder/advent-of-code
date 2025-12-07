<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $lines = file('problems/08/input.txt', FILE_IGNORE_NEW_LINES);

    $grid = [];
    foreach ($lines as $line) {
        $grid[] = str_split($line);
    }

    $totalAllPasses = 0;
    $passNumber = 0;

    while (true) {
        $passNumber++;
        
        // Find all valid cells in this pass
        $validCells = findValidCells($grid);
        $validCount = count($validCells);
        
        echo "Pass $passNumber: $validCount valid cells\n";
        
        if ($validCount == 0) {
            break;
        }
        
        $totalAllPasses += $validCount;
        
        // Update grid: replace valid cells with '.'
        foreach ($validCells as $cell) {
            [$row, $col] = $cell;
            $grid[$row][$col] = '.';
        }
    }

    print($totalAllPasses);
}

function findValidCells(array $grid): array {
    $validCells = [];
    
    for ($y = 0; $y < count($grid); $y++) {
        for ($x = 0; $x < count($grid[$y]); $x++) {
            $cell = $grid[$y][$x];

            if ($cell !== '@') {
                continue;
            }

            // Check each of the surrounding 8 cells
            $surrounding = 0;
            for ($dy = -1; $dy <= 1; $dy++) {
                for ($dx = -1; $dx <= 1; $dx++) {
                    if ($dy === 0 && $dx === 0) {
                        continue;
                    }

                    $ny = $y + $dy;
                    $nx = $x + $dx;

                    if ($ny >= 0 && $ny < count($grid) && $nx >= 0 && $nx < count($grid[$ny])) {
                        if ($grid[$ny][$nx] === '@') {
                            $surrounding++;
                        }
                    }
                }
            }
            
            // If less than 4 surrounding '@', this is a valid cell
            if ($surrounding < 4) {
                $validCells[] = [$y, $x];
            }
        }
    }

    return $validCells;
}
