var Engine = (function () {

	var behaviorManager = new BehaviorManager();
	var gameObjectManager = new GameObjectManager();
	var serviceManager = new ServiceManager();

	function init (settings, startup) {
		window.onload = function () {
			settings.fps = settings.fps || 1;//60;


			startup();
		};
	}



	var register = {
		behavior: function (name, behavior) {
			behaviorManager.register(name, behavior);
		},
		service: function (name, service) {
			serviceManager.register(name, service);
		}
	};

	return {
		$init: init,
		$register: register,
		Behavior: behaviorManager.new,
		Service: serviceManager.services,
		GameObject: gameObjectManager.new
	};

})();