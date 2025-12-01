<?php

class Dial {
    private int $position;
    private int $hits = 0;
    
    public function __construct(
        private int $initialPosition = 0
    ) {
        $this->position = $initialPosition;
    }

    public function getHits(): int {
        return $this->hits;
    }

    public function turn(string $direction, int $amount): void {
        switch ($direction) {
            case "L":
                // Calc hits - how many times we passed 0 going left
                // Need to account for starting position
                $lastPosition = $this->position;

                if ($amount >= $lastPosition && $lastPosition > 0) {
                    // We'll cross 0 (not starting from 0)
                    $remaining = $amount - $lastPosition;  // Steps after first crossing 0
                    $this->hits += 1 + (int)($remaining / 100);  // First crossing + full rotations after
                } else if ($lastPosition == 0) {
                    // Starting at 0, only count full rotations
                    $this->hits += (int)($amount / 100);
                }
                // If amount < lastDial (and not at 0), we don't cross 0 at all
                
                // Update dial position with wrapping
                $this->position = ($this->position - $amount) % 100;
                if ($this->position < 0) {
                    $this->position += 100;
                }
                break;

            case "R":
                // Calc hits - how many times we passed 0 going right
                $lastPosition = $this->position;

                $currentPosition = $lastPosition + $amount;
                $this->hits += (int)($currentPosition / 100);

                // Update dial position with wrapping
                $this->position = $currentPosition % 100;
                break;
        }
    }
}