import { Request, Response } from 'express-serve-static-core';

import { GET_groupDescription } from './groupDetails.ts/GET_groupDescription';
import { GET_groups } from './groups/GET_groups';
import { ParsedQs } from 'qs';
import cors from 'cors';
import express from 'express';

const app = express();

const allowedOrigins = [
	'http://localhost:5173',   // Vite default dev port, for development
	'https://project-imperion.com',
	'https://www.project-imperion.com'
];

var corsOptions = {
	origin: function (origin: any, callback: Function) {
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}

app.use(express.json());


app.get("/groups", cors(corsOptions), async (req, res) => {
	await GET_groups(req, res);
});

app.get("/groupDescription", cors(corsOptions), async (req, res) => {
	await GET_groupDescription(req, res);
});



const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Express API running on HTTP/${PORT} (development mode)`);
});

