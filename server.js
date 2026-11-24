import path from 'node:path';
import { initServer } from './backend/app.js';
import { USAGE_GUIDE } from './backend/config/constants.js';

export const DIST_PATH = path.join(import.meta.dirname, 'frontend', 'dist');
export const RACE_DURATION_MS =
	process.env.NODE_ENV === 'development'
		? 1 * 60 * 1000 /* 1min */
		: 10 * 60 * 1000; /* 10min */
export const RACE_DURATION_MINUTES = RACE_DURATION_MS / 60000;
export const ACCESS_KEYS = {
	'/front-desk': 'RECEPTIONIST_KEY',
	'/lap-line-tracker': 'OBSERVER_KEY',
	'/race-control': 'SAFETY_KEY',
};

function init() {
	const missing = Object.values(ACCESS_KEYS).filter((key) => !process.env[key]);
	if (missing.length > 0) {
		console.error(`The following keys do not exist: ${missing.join(', ')}`);
		console.error(USAGE_GUIDE);
		process.exit(1);
	}

	initServer();
}

init();
