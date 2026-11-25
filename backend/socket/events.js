function initConnections(io) {
	io.on('connection', (socket) => {
		socket.join('all');

		socket.on('joinRoom', (room) => {
			socket.join(room);
			socket.data = { station: room };
			socket.emit('message', `Client joined room ${room}`);
		});

		socket.on('message', (msg) => {
			console.log(`[SERVER]: ${socket.data.station}: ${msg}`);
		});

		console.log(`[SERVER]: Client connected: ${socket.id}`);
	});
}

export { initConnections };
