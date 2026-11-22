import express from 'express';
import {
	PORT,
	USAGE_GUIDE,
	WRONG_KEY_DELAY_MS,
} from './backend/config/constants.js';

const RACE_DURATION_MS =
	process.env.NODE_ENV === 'development'
		? 1 * 60 * 1000 /* 1min */
		: 10 * 60 * 1000; /* 10min */
const RACE_DURATION_MINUTES = RACE_DURATION_MS / 60000;
const ACCESS_KEYS = {
	'/front-desk': 'RECEPTIONIST_KEY',
	'/lap-line-tracker': 'OBSERVER_KEY',
	'/race-control': 'SAFETY_KEY',
};
const missing = Object.values(ACCESS_KEYS).filter((key) => !process.env[key]);
if (missing.length > 0) {
	console.error(`The following keys do not exist: ${missing.join(', ')}`);
	console.error(USAGE_GUIDE);
	process.exit(1);
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
	res.send(`Race duration: ${RACE_DURATION_MINUTES} min.`);
});

app.post('/api/login', (req, res) => {
	const data = req.body;
	const reqKey = ACCESS_KEYS[data?.station];
	if (!reqKey || !data.accessKey) {
		res.status(400).send('Bad request');
		return;
	} else if (data.accessKey === process.env[reqKey]) {
		res.status(200).send('Key is correct!');
	} else if (data.accessKey !== process.env[reqKey]) {
		setTimeout(() => {
			res.status(401).send('Key is wrong.');
		}, WRONG_KEY_DELAY_MS);
	} else {
		res.status(500).send('Server not reachable, try again');
	}
});

app.listen(port, () => {
	console.log(`Listening on port http://localhost:${PORT}/`);
	console.log(`Race duration: ${RACE_DURATION_MINUTES} min.`);
});
