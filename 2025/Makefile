.PHONY: run build clean

# Build the Docker image
build:
	docker build -t aoc-php .

# Run a specific problem's script
# Usage: make run problem=01
run:
	docker run --rm -v .:/app -w /app php:8.3-cli php problems/$(problem)/script.php

# Run using pre-built image
run-built:
	docker run --rm -v .:/app -w /app aoc-php php problems/$(problem)/script.php

# Clean up Docker image
clean:
	docker rmi aoc-php
