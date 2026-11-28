import { ACCESS_KEYS, USAGE_GUIDE } from './backend/config/constants.js';
import { initServer } from './backend/init.js';

function hasConfig() {
	const missing = Object.values(ACCESS_KEYS).filter((key) => !process.env[key]);
	if (missing.length > 0) {
		console.error(
			`The following keys do not exist: ${missing.join(', ')}\n${USAGE_GUIDE}`,
		);
		return false;
	}

	return true;
}

if (hasConfig()) {
	initServer();
}
