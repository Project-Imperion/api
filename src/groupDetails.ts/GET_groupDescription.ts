import { Request, Response } from 'express';

import { ObjectId } from 'mongodb';
import { getDBCollection } from '../database';

export const GET_groupDescription = async (_req: Request, res: Response) => {
	try {
		const id = _req.query._id as string;
		if (!id) {
			res.status(400).json({ error: 'Missing _id parameter' });
			return;
		}

		const groupsCollection = await getDBCollection('groups');
		const group = await groupsCollection.findOne(
			{ _id: new ObjectId(id) },
			{
				projection: {
					longDesc: 1,
				}
			}
		);

		res.json(group);

	} catch (err) {
		res.status(500).json({ error: 'Server Error' });
	}
}