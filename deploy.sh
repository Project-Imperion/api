#!/bin/bash

# Change these as appropriate
IMAGE_NAME="directorate-api"
CONTAINER_NAME="directorate-api-container"

# Stop and remove old container if it exists
if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
    echo "Stopping and removing previous container ($CONTAINER_NAME)..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# Build the Docker image
echo "Building Docker image ($IMAGE_NAME)..."
docker image prune -f
docker build -t $IMAGE_NAME .

# Run the container, mounting certs
echo "Running new Docker container on port 1010..."
docker run -d -p 1010:3000 \
    --name $CONTAINER_NAME \
    $IMAGE_NAME

echo "API deployment complete!"
