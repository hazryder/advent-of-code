<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $lines = file('problems/07/input.txt');

    $grid = [];

    foreach ($lines as $line) {
        $grid[] = str_split(trim($line));
    }

    $total = 0;

    for ($y = 0; $y < count($grid); $y++) {
        for ($x = 0; $x < count($grid[$y]); $x++) {
            $cell = $grid[$y][$x];

            if ($cell === '@') {
                // Check each of the surrounding 8 cells
                $surrounding = 0;
                for ($dy = -1; $dy <= 1; $dy++) {
                    for ($dx = -1; $dx <= 1; $dx++) {
                        if ($dy === 0 && $dx === 0) {
                            continue; // Skip the center cell
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
                // If less than 4 surrounding '@', count this cell
                if ($surrounding < 4) {
                    $total++;
                }
            }
        }
    }

    print ($total);
}
