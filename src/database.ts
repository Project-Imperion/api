import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

const client = new MongoClient(uri);

export const getDBCollection = async (collection: string) => {
	return client.db('directorate').collection(collection);
}