var settings = {
	scene: 'scene'
};


Engine.$init({}, function (world) {

	/*var WIDTH = 400;
	var HEIGHT = 300;

	var VIEW_ANGLE = 45;
	var ASPECT = WIDTH / HEIGHT;
	var NEAR = 0.1;
	var FAR = 10000;

	var container = document.querySelector('#scene');

	var renderer = new THREE.WebGLRenderer();
	var camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
	var scene = new THREE.Scene();

	scene.add(camera);
	renderer.setSize(WIDTH, HEIGHT);
	container.appendChild(renderer.domElement);

	// Set up the sphere vars
	var RADIUS = 50;
	var SEGMENTS = 16;
	var RINGS = 16;

// Create a new mesh with
// sphere geometry
	var sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
	var sphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS), sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
	sphere.position.z = -300;

// Finally, add the sphere to the scene.
	scene.add(sphere);

	// create a point light
	const pointLight = new THREE.PointLight(0xFFFFFF);

// set its position
	pointLight.position.x = 10;
	pointLight.position.y = 50;
	pointLight.position.z = 130;

// add to the scene
	scene.add(pointLight);

	renderer.render(scene, camera);*/


	var actor = Engine.GameObject();
	actor.add();

	var b = Engine.Behavior


});