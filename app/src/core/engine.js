var Engine = (function () {

	var behaviorManager;
	var gameObjectManager;
	var serviceManager;
	var behaviorsToUpdate = {};

	function init (settings, startup) {
	  var now;
	  var then;
	  var elapsed;
	  var interval;

	  behaviorManager = new BehaviorManager();
    gameObjectManager = new GameObjectManager();
    serviceManager = new ServiceManager();

    // Wait for document to load
    window.onload = function () {
      settings.fps = settings.fps || 1;//60;
      interval = 1000 / settings.fps;
      then = Date.now();

      // Run the provided startup function
      startup();

      /**
       * Self invoking function that runs every fps interval to drive the game
       */
      (function runGameLoop () {
        requestAnimationFrame(runGameLoop);
        now = Date.now();
        elapsed = now - then;
        if (elapsed > interval) {
          then = now - (elapsed % interval);
          console.log(behaviorsToUpdate);
        }
      })();

    }
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
		Behavior: behaviorManager.behaviors,
		Service: serviceManager.services,
		GameObject: gameObjectManager.new
	};

})();