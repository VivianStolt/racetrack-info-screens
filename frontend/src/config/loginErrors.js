const LOGIN_ERRORS = {
	200: '',
	401: 'Wrong access key',
	400: 'Please enter an access key',
};

function getLoginError(status) {
	return LOGIN_ERRORS[status] ?? 'Server not reachable, try again';
}

export default getLoginError;
