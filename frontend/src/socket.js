import { io } from 'socket.io-client';

// Initialize socket object, connect when authenticated
export const socket = io({
	path: '/socket.io',
	autoConnect: false,
});

export function establishConnection(station) {
	const join = () => {
		socket.emit('setupConnection', station);
	};

	if (socket.connected) {
		join();
	} else {
		socket.once('connect', join);
		socket.connect();
	}
}
