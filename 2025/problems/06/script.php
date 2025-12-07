<?php

$start = microtime(true);

main();

$end = microtime(true);
$executionTime = ($end - $start) * 1000;
echo "\nExecution time: " . number_format($executionTime, 3) . " ms\n";

function main() {
    $lines = file('problems/05/input.txt');

    $batteryBanks = [];

    foreach ($lines as $line) {
        $batteryBank = new BatteryBank();

        $charArray = str_split(trim($line));
        foreach ($charArray as $char) {
            $batteryBank->addBattery(new Battery((int)$char));
        }
        
        $batteryBanks[] = $batteryBank;
    }

    $totalOutputJoltage = 0;

    foreach ($batteryBanks as $batteryBank) {
        $totalOutputJoltage += $batteryBank->getMaximumPossibleJoltage();
    }

    print ($totalOutputJoltage);
}

class Battery {
    public function __construct(
        private int $joltage,
    ){}

    public function getJoltage(): int
    {
        return $this->joltage;
    }
}

class BatteryBank {
    public function __construct(
        private array $batteries = [],
    ){}

    public function getBatteries(): array
    {
        return $this->batteries;
    }

    public function addBattery(Battery $battery): void
    {
        $this->batteries[] = $battery;
    }

    public function getMaximumPossibleJoltage(): int
    {
        // Greedy approach: select batteries left-to-right, always picking the highest digit
        // when we have enough batteries remaining to complete our selection
        $joltages = array_map(fn($b) => $b->getJoltage(), $this->batteries);
        $n = count($joltages);
        $selected = [];
        
        for ($i = 0; $i < $n && count($selected) < 12; $i++) {
            $remaining = 12 - count($selected);
            $available = $n - $i;
            
            // If we MUST take this battery (not enough left otherwise), take it
            if ($available == $remaining) {
                $selected[] = $joltages[$i];
                continue;
            }
            
            // Otherwise, look ahead and decide: take current or skip?
            // Find the max digit we could get if we skip this one
            $maxAhead = 0;
            for ($j = $i + 1; $j <= $n - $remaining; $j++) {
                if ($joltages[$j] > $maxAhead) {
                    $maxAhead = $joltages[$j];
                }
            }
            
            // Take current if it's >= max ahead
            if ($joltages[$i] >= $maxAhead) {
                $selected[] = $joltages[$i];
            }
        }
        
        return (int)implode('', $selected);
    }
}
