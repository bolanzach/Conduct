Engine.Services.$Register('$idGenerator', function () {
	var foreverIncrementing = 0;
	return function (type) {
		return (type || 'xxx') + '-' + new Date().getTime() + '-' + foreverIncrementing++;
	}
});