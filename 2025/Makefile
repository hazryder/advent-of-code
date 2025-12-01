.PHONY: run build clean

# Build the Docker image
build:
	docker build -t aoc-php .

# Run a specific day's script
# Usage: make run day=01
run:
	docker run --rm -v .:/app -w /app php:8.3-cli php problems/$(day)/script.php

# Run using pre-built image
run-built:
	docker run --rm -v .:/app -w /app aoc-php php problems/$(day)/script.php

# Clean up Docker image
clean:
	docker rmi aoc-php
