<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $instructionsRaw = file_get_contents('problems/03/input.txt');
    $instructionsSplit = explode(',', $instructionsRaw);

    $instructions = [];
    
    foreach ($instructionsSplit as $instructionPair) {
        [$lower, $upper] = explode('-', $instructionPair);
        $instruction = new Instruction((int)$lower, (int)$upper);
        $instructions[] = $instruction; 
    }

    $total = 0;

    foreach ($instructions as $instruction) {
        $total += $instruction->getTotalOfInvalidIds();
    }

    print($total);
}

class Instruction 
{
    public function __construct(
        private int $lowerBound,
        private int $upperBound,
    ){}

    public function getTotalOfInvalidIds(): int
    {
        $total = 0;

        for ($i = $this->lowerBound; $i <= $this->upperBound; $i++) {
            $strVal = (string)$i;
            $length = strlen($strVal);
            if ($length % 2 !== 0) {
                // Odd length, cannot be invalid
                continue;
            }

            // If the first half matches the second half, it's invalid
            $halfLength = $length / 2;
            $firstHalf = substr($strVal, 0, $halfLength);
            $secondHalf = substr($strVal, $halfLength);
            if ($firstHalf === $secondHalf) {
                $total += $i;
            }
        }

        return $total;
    }
}