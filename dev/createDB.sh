#!/bin/bash

# Settings
MONGO_CONTAINER="directorate-mongo-dev"
SEED_SCRIPT="./dev/populateDB.ts"    # Set to your actual seed script path

# 1. Start local MongoDB in Docker (if not already running)
if [[ $(docker ps -aq -f name=$MONGO_CONTAINER) ]]; then
  	echo "MongoDB container '$MONGO_CONTAINER' already exists."
  	docker start $MONGO_CONTAINER

else
  	echo "Launching MongoDB container '$MONGO_CONTAINER'..."
  	docker run -d --name $MONGO_CONTAINER -p 27017:27017 mongo:latest
  	# You may want to add -v for persistence if needed
	
  	sleep 2  # Wait a moment for MongoDB to be ready

	# 2. Populate the database via the seed script
	echo "Seeding dev database..."
	npx ts-node $SEED_SCRIPT

fi

echo "Dev MongoDB is up and directorate DB is seeded!"
