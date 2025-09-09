import { Request, Response } from 'express';

import { getDBCollection } from '../database';

export const GET_groupDescription = async (_req: Request, res: Response) => {
	try {
		const groupID = _req.query.groupID as string;
		if (!groupID) {
			res.status(400).json({ error: 'Missing groupID parameter' });
			return;
		}

		const groupsCollection = await getDBCollection('groups');

		const group = await groupsCollection.findOne(
			{ groupID: groupID },
			{
				projection: {
					guildId: 1,
					longDesc: 1,
				}
			}
		);

		res.json(group);

	} catch (err) {
		res.status(500).json({ error: 'Server Error' });
	}
}