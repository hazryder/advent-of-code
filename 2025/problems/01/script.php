<?php

$instructions = file('problems/01/input.txt');

$dial = 50;
$hits = 0;

foreach ($instructions as $instruction) {
    $direction = $instruction[0];
    $amount = (int)substr($instruction, 1);
    
    $oldDial = $dial;

    switch ($direction) {
        case "L":
            $dial = ($dial - $amount) % 100;
            if ($dial < 0) {
                $dial += 100;
            }
            // Count crossings: how many times did we pass 0 going left?
            // If we went from 10 to 95, we crossed 0 once (10->0->99->95)
            if ($oldDial < $amount) {
                $hits += (int)(($amount - $oldDial) / 100) + 1;
            }
            break;

        case "R":
            $newDial = $dial + $amount;
            // Count crossings before wrapping
            $hits += (int)($newDial / 100);
            $dial = $newDial % 100;
            break;
    }
}

print($hits);