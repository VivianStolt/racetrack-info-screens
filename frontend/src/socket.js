import { io } from 'socket.io-client';

export const socket = io({
	path: '/socket.io',
	autoConnect: false,
});

export function establishConnection(station) {
	const join = () => {
		socket.emit('joinRoom', station);
		socket.emit('message', `client joined room ${station}`);
	};

	if (socket.connected) {
		join();
	} else {
		socket.once('connect', join);
		socket.connect();
	}
}
