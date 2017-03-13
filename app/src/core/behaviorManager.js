function BehaviorManager () {
	var self = this;

	var CONSTRUCTOR_FN_ARGS = /function\s\$construct\s*[^\(]*\(\s*([^\)]*)\)/m;
	var FN_ARG_SPLIT = /,/;

	self.behaviors = {};

	self.register = function (name, behavior) {
		var constructorFN = behavior.toString();
		var match = constructorFN.match(CONSTRUCTOR_FN_ARGS);
		var dependencies = [];

		(match && match[1].split(FN_ARG_SPLIT) || []).forEach(function (arg) {
      dependencies.push(arg.replace(/ /g, ''));
		});

		self.behaviors[name] = function () {
		  return {
		    $$dependencies: dependencies,
        $$behavior: behavior.apply(this, arguments || []),
				as: function (asString) {

        }
      };

		}

	};


}