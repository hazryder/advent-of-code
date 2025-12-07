<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $lines = file('problems/09/input.txt', FILE_IGNORE_NEW_LINES);

    $validRanges = [];
    $valuesToCheck = [];

    foreach ($lines as $line) {
        // If the line contains a '-', it's a range
        if (strpos($line, '-') !== false) {
            [$start, $end] = explode('-', $line);
            $validRanges[] = [
                'min' => (int)$start,
                'max' => (int)$end,
            ];
        } 
        // otherwise, as long as it's not an empty line, it's a value to check
        elseif (trim($line) !== '') {
            $valuesToCheck[] = (int)$line;
        }
    }

    // For each value to check, if it falls within any valid range, count it
    $totalValid = 0;

    foreach ($valuesToCheck as $value) {
        foreach ($validRanges as $range) {
            if ($value >= $range['min'] && $value <= $range['max']) {
                $totalValid++;
                break; // No need to check other ranges
            }
        }
    }

    print ($totalValid);
}

