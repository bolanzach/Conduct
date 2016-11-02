var settings = {
	canvas: 'stage'
};

Engine.Init(settings, function (game) {

	var actor = Engine.GameObject();

	var testBehavior = actor.add(Engine.Behaviors.$test());
	var testBehavior2 = actor.add(Engine.Behaviors.$testTwo('test two say hi'));

	testBehavior.$inject(testBehavior2);
	testBehavior2.$inject();



	game.world.addChild(actor);

});