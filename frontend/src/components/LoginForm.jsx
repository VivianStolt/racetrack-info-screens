import { useState } from 'react';
import { useNavigate } from 'react-router';
import getLoginError from '../config/loginErrors.js';
import { STATIONS } from '../config/stations.js';
import { socket } from '../socket';
import StationRadio from './StationRadio.jsx';

function LoginForm({ onLoggedInStation, thisStation }) {
	const [error, setError] = useState('');
	const navigate = useNavigate();
	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const formStation = formData.get('station');
		const formAccessKey = formData.get('accessKey');
		const station = thisStation ?? formStation;

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				station,
				accessKey: formAccessKey,
			}),
		});

		if (response.status === 200) {
			onLoggedInStation(station);
			navigate(station);

			socket.open();
		}

		setError(getLoginError(response.status));
	}

	return (
		<form onSubmit={handleSubmit}>
			{!thisStation && <StationRadio stations={STATIONS} />}
			<label>
				Access Key
				<input type="password" name="accessKey"></input>
			</label>
			<button type="submit" aria-label="Log in"></button>
			{error && <p role="alert">{error}</p>}
		</form>
	);
}

export default LoginForm;
