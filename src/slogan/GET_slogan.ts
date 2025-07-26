import { Request, Response } from 'express';

import { getDBCollection } from '../database';

export const GET_slogan = async (_req: Request, res: Response) => {
	try {
		const slogansCollection = await getDBCollection('slogans');

		const [randomSlogan] = await slogansCollection.aggregate([{ $sample: { size: 1 } }]).toArray();

		if (randomSlogan) {
			res.json({ slogan: randomSlogan.slogan, director: randomSlogan.director });
		} else {
			res.status(404).json({ error: 'No slogans found' });
		}

	} catch (err) {
		res.status(500).json({ error: 'Server Error' });
	}
}