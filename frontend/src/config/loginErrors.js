const ERRORS = {
	200: '',
	401: 'Wrong access key',
	400: 'Please enter an access key',
};

function ErrorMessages(response) {
	return ERRORS[response] ?? 'Server not reachable, try again';
}

export default ErrorMessages;
