import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';

const app = express();

const allowedOrigins = [
	'http://localhost:5173',   // Vite default dev port, for development
	'https://the-directorate.com',
	'https://www.the-directorate.com'
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


app.get('/ping', (req, res) => {
	res.json({ message: 'pong' });
});



const PORT = 3000;

app.listen(PORT, () => {
	console.log(`Express API running on HTTP/${PORT} (development mode)`);
});


