import path from 'node:path';

export const USAGE_GUIDE = `
	export RECEPTIONIST_KEY=<your-key>\n
	export OBSERVER_KEY=<your-key>\n
	export SAFETY_KEY=<your-key>\n
	npm start`;

export const WRONG_KEY_DELAY_MS = 500;

export const PORT = 3000;
export const FRONTEND_PORT = 5173;

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
