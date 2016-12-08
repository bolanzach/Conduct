function BehaviorManager () {
	var self = this;
	var CONSTRUCTOR_FN_ARGS = /function\s\$construct\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;

	selfregisteredBehaviorss = {};

	selfnewt = function (behaviorName) {

	};

	self.register = function (name, behavior) {
		var constructorFN = behavior.toString();
		var match = constructorFN.match(CONSTRUCTOR_FN_ARGS);

		//registeredBehaviors[name]behavior;	};

		(match && match[1].split(FN_ARG_SPLIT) || []).forEach(function (arg) {
			registeredBehaviors[name].dependencies[arg.replace(/ /g, '')] = true;
		});
	};



}