import { useState } from 'react';
import getLoginError from '../config/loginErrors.js';
import { STATIONS } from '../config/stations.js';
import StationRadio from './StationRadio.jsx';

function LoginForm() {
	const [error, setError] = useState('');
	const [successStation, setSuccessStation] = useState(undefined);
	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const formStation = formData.get('station');
		const formAccessKey = formData.get('accessKey');

		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				station: formStation,
				accessKey: formAccessKey,
			}),
		});
		if (response.status === 200) {
			setSuccessStation(formStation);
		}

		setError(getLoginError(response.status));
	}
	if (successStation) {
		return <p>Logged in to {successStation}</p>;
	}

	return (
		<form onSubmit={handleSubmit}>
			<StationRadio stations={STATIONS} />
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
