import { useState } from 'react';

function LoginForm() {
	const [error, errorStatus] = useState('');
	async function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		const formStation = formData.get('station');
		const formAccessKey = formData.get('accessKey');
		const response = await fetch('/api/login', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ station: formStation, accessKey: formAccessKey }),
		});
		errorStatus(() => {
			if (response.status === 401) {
				return 'Wrong access key';
			} else if (response.status === 400) {
				return 'Please enter an access key';
			} else {
				return '';
			}
		});
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				<input
					type="radio"
					name="station"
					value="/front-desk"
					defaultChecked={true}
				/>
				Front Desk
			</label>
			<label>
				<input type="radio" name="station" value="/race-control" /> Race Control
			</label>
			<label>
				<input type="radio" name="station" value="/lap-line-tracker" /> Lap-Line
				Tracker
			</label>
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
