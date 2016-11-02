var Engine = (function () {
	var b = [];
	var s = [];
	var gameObjectsMap = {};
	var activeBehaviorsMap = {};        // Holds all active behaviors in update order
	var tempBehaviorMap = {};           // Holds behavior references while a game object is being built
	var behaviorsToGameObjectsMap = {}; // Holds each game object and every one of their behaviors

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
				})();
			});

			function update () {
				for (var type in activeBehaviorsMap) {
					if (activeBehaviorsMap.hasOwnProperty(type)) {
						activeBehaviorsMap[type].forEach(function (behavior) {
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
				window.setTimeout(gameLoop, (1/settings.fps)*1000);
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

	/**
	 *
	 * @param options
	 */
	var gameObject = function (options) {
		var gameObject = {
			id: Engine.Services.$idGenerator('e'),
			children: [],

			/**
			 *
			 * @param behavior
			 */
			add: function (behavior) {
				//// do checks!

				var id = this.id;
				var behaviorId = behavior.id;
				behaviorsToGameObjectsMap[id] = behaviorsToGameObjectsMap[id] || {};
				behaviorsToGameObjectsMap[id][behavior.$name] = behaviorsToGameObjectsMap[id][behavior.$name] || [];

				behavior.gameObject = id;
				tempBehaviorMap[behaviorId] = behavior;
				behaviorsToGameObjectsMap[id][behavior.$name].push(behaviorId);

				return {
					$behavior: behaviorId,
					$inject: function () {
						var behavior = tempBehaviorMap[this.$behavior];
						var construct = behavior.$construct;
						if (construct && typeof construct === 'function' && arguments && arguments.length) {
							var behaviorArgs = [];
							for (var i = 0; i < arguments.length; i++) {
								var arg = arguments[i];
								if (arg.$behavior) {
									behaviorArgs.push(tempBehaviorMap[arg.$behavior]);
								}
							}
							construct.apply(this, behaviorArgs);
						}
					},
					$autowire: function () {
						// not supported yet
					}
				}
			},

			/**
			 *
			 * @param childGameObject
			 */
			addChild: function (childGameObject) {
				var behaviorKeys = behaviorsToGameObjectsMap[childGameObject.id];
				this.children.push(childGameObject.id);
				gameObjectsMap[childGameObject.id] = childGameObject;
				childGameObject.parent = this.id;
				childGameObject.active = true;

				for (var behaviors in behaviorKeys) {
					if (behaviorKeys.hasOwnProperty(behaviors)) {
						behaviorKeys[behaviors].forEach(function (behaviorId) {
							var name;
							var initFunc;
							var behavior = tempBehaviorMap[behaviorId];

							if (behavior) {
								name = behavior.$name;
								activeBehaviorsMap[name] = activeBehaviorsMap[name] || [];
								activeBehaviorsMap[name].push(behavior);
								behavior.active = true;
								initFunc = behavior.$init;

								if (initFunc && typeof initFunc === 'function') {
									initFunc();
								}
								delete tempBehaviorMap[behaviorId];
							}
						});
					}
				}
			},

			/**
			 *
			 */
			destroy: function () {
				var behaviorKeys = behaviorsToGameObjectsMap[this.id];
				for (var behaviors in behaviorKeys) {
					if (behaviorKeys.hasOwnProperty(behaviors)) {
						behaviorKeys[behaviors].forEach(function (behaviorId) {

						});
					}
				}
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



