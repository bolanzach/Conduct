var settings = {
	canvas: 'stage'
};

Engine.Init(settings, function (game) {
	console.log('inited');

	var actor = Engine.GameObject();

	var testBehavior = actor.add(Engine.Behaviors.$test('test'));

	testBehavior.$inject();



	game.world.addChild(actor);

});