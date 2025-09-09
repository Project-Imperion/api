import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI || 'mongodb://localhost:3020';

const client = new MongoClient(uri);

export const getDBCollection = async (collection: string) => {
	return client.db('imperion').collection(collection);
}