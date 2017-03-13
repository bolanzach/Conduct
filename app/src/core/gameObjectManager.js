function GameObjectManager (behaviorsToUpdate) {
	var self = this;
	var idGenerator;
	var behaviorsMap = behaviorsToUpdate;

  self.gameObjects = {};
  idGenerator = Engine.Service.idGenerator;



  /**
   * Creates a new Game Object
   */
	self.new = function () {
		var id = idGenerator('e');

    /**
     * Object in a game that has one or more Behaviors.
     * @constructor
     */
		var GameObject = {
			id: id,
			add: function (behaviorWrapper) {
			  var added;
				var gameObject = self.gameObjects[id];
				var activeBehaviors = gameObject.activeBehaviors;

				if (!behaviorWrapper.$$dependencies.length) {
				  activeBehaviors.push(behaviorWrapper.$$behavior);
				  added = true;
        } else {
				  added = behaviorWrapper.$$dependencies.every(function (dependency) {
            return activeBehaviors.indexOf(dependency) > -1;
          });
        }

        if (!added) {
				  gameObject.deactiveBehavors.push(behaviorWrapper);
        } else {
          gameObject.deactiveBehavors.forEach(function (behavior) {
            if (behavior.$$dependencies.indexOf(behaviorWrapper) > -1) {
              this.add(behaviorWrapper);
            }
          });
        }
        console.log(added);
			},
			remove: function (behavior) {

			}
		};

		self.gameObjects[id] = {
			gameObject: GameObject,
			activeBehaviors: [],
			deactiveBehavors: []
    };

		return GameObject

	};


}