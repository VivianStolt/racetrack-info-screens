import { createServer } from 'node:http';
import path from 'node:path';
import express from 'express';
import { Server } from 'socket.io';
import { ACCESS_KEYS, DIST_PATH, RACE_DURATION_MINUTES } from '../server.js';
import { FRONTEND_PORT, PORT, WRONG_KEY_DELAY_MS } from './config/constants.js';
import * as eventHandlers from './socket/events.js';

export function initServer() {
	const app = express();
	app.use(express.static(DIST_PATH));
	app.use(express.json());

	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		path: '/socket.io',
		cors: {
			origin: `localhost:${FRONTEND_PORT}`,
		},
	});

	app.get('/', (_req, res) => {
		res.send(`Race duration: ${RACE_DURATION_MINUTES} min.`);
	});

	app.post('/api/login', handleLogin);

	app.get('/{*splat}', (_, res) => {
		res.sendFile(path.join(DIST_PATH, 'index.html'));
	});

	httpServer.listen(PORT, (error) => {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		console.log(`Listening on port http://localhost:${PORT}/`);
	});

	eventHandlers.initConnections(io);
}

function handleLogin(req, res) {
	const data = req.body;
	const reqKey = ACCESS_KEYS[data?.station];
	if (!reqKey || !data.accessKey) {
		res.status(400).send('Bad request');
		return;
	} else if (data.accessKey === process.env[reqKey]) {
		res.status(200).send('Key is correct!');
	} else {
		setTimeout(() => {
			res.status(401).send('Key is wrong.');
		}, WRONG_KEY_DELAY_MS);
	}
}
