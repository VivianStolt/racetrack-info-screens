import { createServer } from 'node:http';
import path from 'node:path';
import express from 'express';
import { Server } from 'socket.io';
import * as config from './config/constants.js';
import * as eventHandlers from './socket/events.js';

export function initServer() {
	const app = express();
	app.use(express.static(config.DIST_PATH));
	app.use(express.json());

	const httpServer = createServer(app);
	const io = new Server(httpServer, {
		path: '/socket.io',
		cors: {
			origin: `localhost:${config.FRONTEND_PORT}`,
		},
	});

	app.get('/', (_req, res) => {
		res.send(`Race duration: ${config.RACE_DURATION_MINUTES} min.`);
	});

	app.post('/api/login', handleLogin);

	app.get('/{*splat}', (_, res) => {
		res.sendFile(path.join(config.DIST_PATH, 'index.html'));
	});

	httpServer.listen(config.PORT, (error) => {
		if (error) {
			console.error(error);
			process.exit(1);
		}
		console.log(`Listening on port http://localhost:${config.PORT}/`);
	});

	eventHandlers.initConnections(io);
}

function handleLogin(req, res) {
	const data = req.body;
	const reqKey = config.ACCESS_KEYS[data?.station];
	if (!reqKey || !data.accessKey) {
		res.status(400).send('Bad request');
		return;
	} else if (data.accessKey === process.env[reqKey]) {
		res.status(200).send('Key is correct!');
	} else {
		setTimeout(() => {
			res.status(401).send('Key is wrong.');
		}, config.WRONG_KEY_DELAY_MS);
	}
}
