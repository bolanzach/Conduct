var Engine = (function () {
	var b = [];
	var s = [];
	var gameObjectsMap = {};
	var behaviorsMap = {};


	/**
	 * Startup the Game
	 * @param settings
	 * @param startup
	 */
	function init (settings, startup) {
		var canvas;
		var world;

		// Default settings
		settings.fps = settings.fps || 1;//60


		if (!settings.canvas || !startup) {
			return; // error
		}

		window.onload = function () {
			s.forEach(function (serviceWrapper) {
				var name = serviceWrapper.name;
				var service = serviceWrapper.service;

				if (!name || name || typeof service !== 'function') {
					// error
				}
				if (Engine.Services[name]) {
					// error - already exists
				}
				Engine.Services[name] = new service();
			});

			b.forEach(function (behaviorWrapper) {
				var name = behaviorWrapper.name;
				var behavior = behaviorWrapper.behavior;

				if (!name || name || typeof behavior !== 'function') {
					// error
				}
				if (Engine.Behaviors[name]) {
					// error - already exists
				}
				Engine.Behaviors[name] = (function () {
					function Behavior (args) {
						return behavior.apply(this, args);
					}

					Behavior.prototype = behavior.prototype;

					return function () {
						var behaviorInstance = new Behavior(arguments);
						behaviorInstance.id = Engine.Services.$idGenerator('b');
						behaviorInstance.$name = name;
						return behaviorInstance;
					}
				})()
			});

			function update () {
				for (var type in behaviorsMap) {
					if (behaviorsMap.hasOwnProperty(type)) {
						behaviorsMap[type].forEach(function (behavior) {
							var updateFunc = behavior.$update;
							if (behavior.active && updateFunc && typeof updateFunc === 'function') {
								updateFunc();
							}
						});
					}
				}
			}

			canvas = document.getElementById(settings.canvas);
			world = Engine.GameObject();

			// Start the game loop
			(function gameLoop () {
				update();
				//window.setTimeout(gameLoop, (1/settings.fps)*1000);
				window.setTimeout(gameLoop, (1)*1000);
			})();

			startup({
				world: world
			});

		};
	}


	var behaviors = {
		$Extend: function (parent, behavior) {

		},
		$Register: function (name, behavior) {
			b.push({name: name, behavior: behavior});
		}
	};

	var services = {
		$Register: function (name, service) {
			s.push({name: name, service: service});
		}
	};

	var gameObject = function (options) {
		var gameObject = {
			id: Engine.Services.$idGenerator('e'),
			behaviors: [],
			children: [],

			add: function (behavior) {
				//// do checks!
				this.behaviors.push(behavior);
				behavior.gameObject = this;

				return {
					$behavior: behavior,
					$inject: function () {
						var construct = this.$behavior.$construct;
						if (construct && typeof construct === 'function') {
							construct.apply(this, arguments);
						}
					},
					$autowire: function () {
						// not supported yet
					}
				}
			},

			addChild: function (childGameObject) {
				this.children.push(childGameObject);
				childGameObject.parent = this;
				childGameObject.active = true;
				gameObjectsMap[childGameObject.id] = childGameObject;

				childGameObject.behaviors.forEach(function (behavior) {
					var name = behavior.$name;
					var activeBehaviors = behaviorsMap[name] || [];
					var isAlreadyActive = activeBehaviors.some(function (activeBehavior) {
						return activeBehavior.id === behavior.id;
					});

					if (!isAlreadyActive) {
						var initFunc = behavior.$init;
						activeBehaviors.push(behavior);
						behavior.active = true;
						if (initFunc && typeof initFunc === 'function') {
							initFunc();
						}
					}

					behaviorsMap[name] = activeBehaviors;
				});
			},

			destroy: function () {

			}
		};

		gameObject.add(Engine.Behaviors.$transform(1,2,3,4));
		gameObjectsMap[gameObject.id] = gameObject;
		return gameObject;
	};

	var Engine =  {
		Init: init,
		Behaviors: behaviors,
		Services: services,
		GameObjects: gameObjectsMap,
		GameObject: gameObject
	};

	return Engine;
})();



