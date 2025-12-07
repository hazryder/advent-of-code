<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $lines = file('problems/10/input.txt', FILE_IGNORE_NEW_LINES);

    $validRanges = [];

    foreach ($lines as $line) {
        // If the line contains a '-', it's a range
        if (strpos($line, '-') !== false) {
            [$start, $end] = explode('-', $line);
            $validRanges[] = [
                'min' => (int)$start,
                'max' => (int)$end,
            ];
        } 
    }

    // Sort ranges by min asc
    usort($validRanges, function($a, $b) {
        return $a['min'] <=> $b['min'];
    });

    // Merge overlapping and touching ranges
    $merged = [];
    $current = null;

    // Iterate through ranges, if overlapping or touching, merge them
    // otherwise, add current to merged and start new
    foreach ($validRanges as $range) {
        if ($current === null) {
            // First range
            $current = $range;
        } elseif ($range['min'] <= $current['max'] + 1) {
            // Overlaps or touches current range - merge them
            $current['max'] = max($current['max'], $range['max']);
        } else {
            // Gap exists - save current and start a new one
            $merged[] = $current;
            $current = $range;
        }
    }

    if ($current !== null) {
        $merged[] = $current;
    }

    // Calculate total covered numbers
    $total = 0;
    foreach ($merged as $range) {
        $total += $range['max'] - $range['min'] + 1;
    }

    print $total;
}

