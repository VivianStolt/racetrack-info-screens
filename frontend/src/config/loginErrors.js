const errors = {
	200: '',
	401: 'Wrong access key',
	400: 'Please enter an access key',
};

function ErrorMessages(response) {
	return errors[response] ?? 'Server not reachable, try again';
}

export default ErrorMessages;
