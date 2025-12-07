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
            // For each chunk length of 1 to half of the string length (can't have a pair of chunks larger than half)
            // If length is not divisible by chunk length, skip
            // Chunk the string into parts of chunk length
            // If each part is equal, it's invalid
            for ($chunk = 1; $chunk <= $length / 2; $chunk++) {
                if ($length % $chunk !== 0) {
                    continue;
                }

                $parts = str_split($strVal, $chunk);
                $allEqual = true;
                $firstPart = $parts[0];
                foreach ($parts as $part) {
                    if ($part !== $firstPart) {
                        $allEqual = false;
                        break;
                    }
                }

                if ($allEqual) {
                    $total += $i;
                    break;
                }
            }
        }

        return $total;
    }
}