import { GET_slogan } from './slogan/GET_slogan';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';

const app = express();

const allowedOrigins = [
	'http://localhost:5173/',              // Vite default dev port, for development
	'https://the-directorate.com',
	'https://www.the-directorate.com'
];

app.use(cors({
	origin: (origin, callback) => {
		if (!origin) return callback(null, true);
		if (allowedOrigins.includes(origin)) {
			return callback(null, true);
		}
		return callback(new Error('Not allowed by CORS'));
	}
}));
app.use(express.json());



app.get('/slogan', async (_req, res) => {
	await GET_slogan(_req, res);
});



const isProduction = process.env.NODE_ENV === 'prod';
const PORT = 3000;


if (isProduction) { // use https in prod, http in development
	const keyPath = '/etc/ssl/privkey.pem';
	const certPath = '/etc/ssl/fullchain.pem';

	if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
		const options = {
			key: fs.readFileSync(keyPath),
			cert: fs.readFileSync(certPath),
		};
		https.createServer(options, app).listen(PORT, () => {
			console.log(`Express API running on HTTPS/${PORT} (production mode)`);
		});
	} else {
		console.error('SSL cert or key not found. Exiting.');
		process.exit(1);
	}

} else {
	app.listen(PORT, () => {
		console.log(`Express API running on HTTP/${PORT} (development mode)`);
	});
}


