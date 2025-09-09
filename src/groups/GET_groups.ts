import { Request, Response } from 'express';

import { getDBCollection } from '../database';

export const GET_groups = async (_req: Request, res: Response) => {
	try {
		const groupsCollection = await getDBCollection('groups');

		const groups = await groupsCollection.find(
			{},
			{
				projection: {
					guildId: 1,
					name: 1,
					shortDesc: 1,
					bannerUrl: 1,
					memberCount: 1
				}
			}
		).toArray();

		res.json(groups);

	} catch (err) {
		res.status(500).json({ error: 'Server Error' });
	}
}