import {Engine} from "./core/engine";
import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {Transform} from "./core/behaviors/transform";

Engine.Init({}, function (scene: Scene) {
  
  scene.addBehavior(TestBehavior)({x: 10, y: 25, rotation: 100});
  
  let t: TestBehavior = scene.getBehavior(TestBehavior);
  console.log(t);
  
  console.log(t.getBehavior(Transform));
});
