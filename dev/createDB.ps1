$MONGO_CONTAINER = "directorate-mongo-dev"
$SEED_SCRIPT = ".\dev\populateDB.ts"

# Check if container exists
$containerExists = docker ps -a --format "{{.Names}}" | Select-String $MONGO_CONTAINER

if ($containerExists) {
    Write-Host "MongoDB container '$MONGO_CONTAINER' already exists."
    docker start $MONGO_CONTAINER | Out-Null
} else {
    Write-Host "Launching MongoDB container '$MONGO_CONTAINER'..."
    docker run -d --name $MONGO_CONTAINER -p 27017:27017 mongo:latest | Out-Null

	Start-Sleep -Seconds 2

	Write-Host "Seeding dev database..."
	npx ts-node $SEED_SCRIPT
}


Write-Host "Dev MongoDB is up and directorate DB is seeded!"
