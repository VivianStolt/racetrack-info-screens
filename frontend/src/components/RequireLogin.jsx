import LoginForm from './LoginForm.jsx';

function RequireLogin({
	loggedInStation,
	thisStation,
	onLoggedInStation,
	children,
}) {
	const loggedIn = loggedInStation === thisStation;
	return loggedIn ? (
		children
	) : (
		<LoginForm
			onLoggedInStation={onLoggedInStation}
			thisStation={thisStation}
		/>
	);
}

export default RequireLogin;
