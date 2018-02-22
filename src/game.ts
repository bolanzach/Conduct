import {Conduct} from "./core/conductEngine";
import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {ConductConfig} from "./core/conductConfig";
import {NetworkBehavior} from "./core/network/networkBehavior";

let config: ConductConfig = new ConductConfig.Builder('2d').setFramesPerSecond(1).build();

Conduct.Init(config, function (scene: Scene) {
  
  scene.addBehavior(TestBehavior)({ test: 'zach' });
  let test: TestBehavior = scene.getBehavior(TestBehavior);
  
  test.addBehavior(NetworkBehavior)({});
  
  

});