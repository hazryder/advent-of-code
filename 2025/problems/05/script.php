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
        // Starting total is 0
        // For each battery:
            // For each battery afterwards, if first battery value + this one > total, update total
            // Don't add the values though, place them next to eachother ie 2+4 = 24
        $total = 0;
        
        for ($first = 0; $first < count($this->batteries); $first++) {
            $firstBattery = $this->batteries[$first];

            for ($second = $first + 1; $second < count($this->batteries); $second++) {
                $secondBattery = $this->batteries[$second];

                $combinedJoltage = (int)((string)$firstBattery->getJoltage() . (string)$secondBattery->getJoltage());
                if ($combinedJoltage > $total) {
                    $total = $combinedJoltage;
                }
            }
        }

        return $total;
    }
}
