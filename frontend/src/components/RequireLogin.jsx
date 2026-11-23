import LoginForm from './LoginForm.jsx';

function RequireLogin({ children }) {
	const loggedIn = false;
	return loggedIn ? children : <LoginForm />;
}

export default RequireLogin;
