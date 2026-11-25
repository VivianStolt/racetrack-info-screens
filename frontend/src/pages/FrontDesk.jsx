// TEST
import { socket } from '../socket';

document.body.addEventListener('keydown', (_e) => {
	socket.emit('message', `pressed key`);
});

function LoginForm() {
	return <h1>LoginForm</h1>;
}

export default LoginForm;
