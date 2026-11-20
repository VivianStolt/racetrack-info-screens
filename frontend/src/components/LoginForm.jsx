function LoginForm() {
	function handleSubmit(e) {
		e.preventDefault();

		const form = e.target;
		const formData = new FormData(form);
		console.log(formData.get('station'));
	}

	return (
		<form method="post" onSubmit={handleSubmit}>
			<label>
				<input
					type="radio"
					name="station"
					value="/front-desk"
					defaultChecked={true}
				/>{' '}
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
		</form>
	);
}

export default LoginForm;
