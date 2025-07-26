import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'directorate';

const seedSlogans = [
	{ slogan: "Fear is hesitation, hesitation is defeat.", director: "Director Christie" },
	{ slogan: "Stand with the director, stand above the rest.", director: "Director Sammie" },
	{ slogan: "Identity is treason.", director: "Director 7" }
];

async function seedDevDb() {
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db(dbName);

		// Remove old data (for clean reseed)
		await db.collection('slogans').deleteMany({});

		// Insert sample data
		await db.collection('slogans').insertMany(seedSlogans);

		console.log("Database seeded with slogans!");
	} catch (err) {
		console.error("Error seeding dev database:", err);
		process.exit(1);
	} finally {
		await client.close();
	}
}

if (require.main === module) {
	seedDevDb();
}
