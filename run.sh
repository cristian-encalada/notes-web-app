#!/bin/bash

# Build and run the Docker containers
docker-compose up --build -d

# Run database migrations or other setup commands
# db_notes.sql

echo "App is now running on http://localhost:3000"
