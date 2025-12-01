<?php

require_once __DIR__ . '/../../lib/Dial.php';

$start = microtime(true);

$instructions = file('problems/02/input.txt', FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

$dial = new Dial(50);

foreach ($instructions as $instruction) {
    $direction = $instruction[0];
    $amount = (int)substr($instruction, 1);

    $dial->turn($direction, $amount);
}

$end = microtime(true);
$executionTime = ($end - $start) * 1000;

echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

print($dial->getHits());