import {Conduct} from "./core/conductEngine";
import {Scene} from "./core/behaviors/scene";
import {ConductConfig} from "./core/conductConfig";
import {NetworkBehavior} from "./core/network/networkBehavior";
import {ParentTestBehavior} from "./core/behaviors/parentTestBehavior";

let config: ConductConfig = new ConductConfig.Builder('2d').setFramesPerSecond(1).build();

Conduct.Init(config, function (scene: Scene) {
  
  scene.addBehavior(ParentTestBehavior)({ test: 'zach' });
  let test: ParentTestBehavior = scene.getBehavior(ParentTestBehavior);

  test.addBehavior(NetworkBehavior)({});
  
  

});