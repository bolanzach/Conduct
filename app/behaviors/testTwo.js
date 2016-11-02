Engine.Behaviors.$Register('$testTwo', function (msg) {

	this.sayHi = msg;

	this.$construct = function (b1, b2, b3) {
		console.log('yaya i constructed with injection');
	};

	this.$init = function () {
		console.log('yaya i init');
	};

	this.$update = function () {

	};


});