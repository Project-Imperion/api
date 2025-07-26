import { GET_slogan } from './slogan/GET_slogan';
import cors from 'cors';
import express from 'express';
import fs from 'fs';
import https from 'https';

const app = express();

app.use(cors());
app.use(express.json());



app.get('/slogan', async (_req, res) => {
	await GET_slogan(_req, res);
});



const isProduction = process.env.NODE_ENV === 'prod';

if (isProduction) { // use https in prod, http in development
	const keyPath = '/etc/ssl/privkey.pem';
	const certPath = '/etc/ssl/fullchain.pem';

	if (fs.existsSync(keyPath) && fs.existsSync(certPath)) {
		const options = {
			key: fs.readFileSync(keyPath),
			cert: fs.readFileSync(certPath),
		};
		https.createServer(options, app).listen(443, () => {
			console.log('Express API running on HTTPS/443 (production mode)');
		});
	} else {
		console.error('SSL cert or key not found. Exiting.');
		process.exit(1);
	}

} else {
	const PORT = 3000;
	app.listen(PORT, () => {
		console.log(`Express API running on HTTP/${PORT} (development mode)`);
	});
}


