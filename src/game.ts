import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {NetworkBehavior} from "./core/network/networkBehavior";

export function startGame (scene: Scene) {
  
  scene.addBehavior(TestBehavior)({ message: 'hello zach!' });
  let testBehavior: TestBehavior = scene.getBehavior(TestBehavior);
  testBehavior.addBehavior(NetworkBehavior)({ properties: ['message'] });
  
}