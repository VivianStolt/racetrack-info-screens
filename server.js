import express from 'express';
import { USAGE_GUIDE } from './backend/config/constants.js';

const RACE_DURATION_MS =
	process.env.NODE_ENV === 'development'
		? 1 * 60 * 1000 /* 1min */
		: 10 * 60 * 1000; /* 10min */
const raceDurationMinutes = RACE_DURATION_MS / 60000;
const keys = ['RECEPTIONIST_KEY', 'OBSERVER_KEY', 'SAFETY_KEY'];
const missing = keys.filter((key) => !process.env[key]);
if (missing.length > 0) {
	console.error(`The following keys do not exist: ${missing.join(', ')}`);
	console.error(USAGE_GUIDE);
	process.exit(1);
}

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send(`Race duration: ${raceDurationMinutes} min.`);
});

app.listen(port, () => {
	console.log(`Listening on port http://localhost:${port}/`);
	console.log(`Race duration: ${raceDurationMinutes} min.`);
});
