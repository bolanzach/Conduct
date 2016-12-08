Engine.$register.service('$idGenerator', function () {
	var foreverIncrementing = 0;

	return function (type) {
		return (type || 'xxx') + '-' + new Date().getTime() + '-' + foreverIncrementing++;
	}
});