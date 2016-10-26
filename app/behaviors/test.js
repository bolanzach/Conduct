Engine.Behaviors.$Register('$test', function (msg) {

	this.$construct = function (b1, b2, b3) {
		console.log('yaya i cons');
	};

	this.$init = function () {
		console.log('yaya i init');
	};

	this.$update = function () {
		console.log(msg || 'no message');
	};


});