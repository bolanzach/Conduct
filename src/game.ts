import {Engine} from "./core/engine";
import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {EngineConfig} from "./core/engineConfig";
import {NetworkBehavior} from "./core/network/networkBehavior";

let config: EngineConfig = new EngineConfig.Builder('2d').setFramesPerSecond(1).build();

Engine.Init(config, function (scene: Scene) {
  
  scene.addBehavior(TestBehavior)({ test: 'zach' });
  let test: TestBehavior = scene.getBehavior(TestBehavior);
  
  test.addBehavior(NetworkBehavior)({});
  
  

});