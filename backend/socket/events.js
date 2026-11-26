import { PRIVATE_STATIONS } from '../config/constants.js';
import * as frontdesk from '../controllers/frontdesk.js';

function initConnections(io) {
	io.on('connection', (socket) => {
		socket.join('public');

		socket.on('setupConnection', (station) => {
			setupConnection(socket, station);
		});
		socket.on('message', (msg) => {
			receiveMessage(socket, msg);
		});

		// Example event flow, doesn't do anything yet
		socket.on('front-desk:addSession', () => {
			frontdesk.addSession();
		});

		console.log(`[SERVER]: Client connected: ${socket.id}`);
	});
}

function setupConnection(socket, station) {
	if (PRIVATE_STATIONS.includes(station)) {
		socket.join('private');
	}

	socket.data = { station: station };
	console.log(`[SERVER]: ${socket.id} connected to ${station}`);
}

function receiveMessage(socket, msg) {
	console.log(`[SERVER]: ${socket.data.station}: ${msg}`);
}

export { initConnections };
