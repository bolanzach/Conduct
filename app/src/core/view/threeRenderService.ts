export class ThreeRenderService {
  
  let WIDTH = 400;
  let HEIGHT = 300;
  
  let VIEW_ANGLE = 45;
  let ASPECT = WIDTH / HEIGHT;
  let NEAR = 0.1;
  let FAR = 10000;
  
  let container = document.querySelector('#scene');
  
  let renderer = new THREE.WebGLRenderer();
  let camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
  let scene = new THREE.Scene();
  
  scene.add(camera);
  renderer.setSize(WIDTH, HEIGHT);
  container.appendChild(renderer.domElement);
  
  // Set up the sphere lets
  let RADIUS = 50;
  let SEGMENTS = 16;
  let RINGS = 16;

// Create a new mesh with
// sphere geometry
  let sphereMaterial = new THREE.MeshLambertMaterial({color: 0xCC0000});
  let sphere = new THREE.Mesh(new THREE.SphereGeometry(RADIUS, SEGMENTS, RINGS), sphereMaterial);

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
  
  renderer.render(scene, camera);
}