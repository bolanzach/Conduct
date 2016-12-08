function GameObjectManager () {
	var self = this;

	self.gameObjects = {};

	self.new = function () {
		var id = '';
		var gameObject =  {
			id: id,
			add: function (behavior) {

			},
			remove: function (behavior) {

			}
		};

		self.gameObjects[id] = gameObject;
		return gameObject
	};


}