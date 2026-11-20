import express from 'express';
import { USAGE_GUIDE } from './constants.js';

const keys = ['RECEPTIONIST_KEY', 'OBSERVER_KEY', 'SAFETY_KEY'];
const missing = keys.filter((key) => !process.env[key]);
if (missing.length > 0) {
	console.log(`The following keys do not exist: ` + missing.join(', '));
	console.log(USAGE_GUIDE);
	process.exit(1);
}

const app = express();
const port = 3000;

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
