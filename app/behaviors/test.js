Engine.Behaviors.$Register('$test', function () {
	var testTwoBehavior;

	this.$construct = function (_testTwo) {
		testTwoBehavior = _testTwo;
	};

	this.$init = function () {
		console.log(testTwoBehavior);
};

	this.$update = function () {
		console.log(testTwoBehavior.sayHi);
	};


});