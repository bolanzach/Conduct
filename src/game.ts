import {Conduct} from "./core/conductEngine";
import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {ConductConfig} from "./core/conductConfig";
import {NetworkBehavior} from "./core/network/networkBehavior";
import {ParentTestBehavior} from "./core/behaviors/parentTestBehavior";


// This is probably how a multiplayer game using Conduct would start. This is just for testing though, and the actual
// Conduct Engine will not have a "start game" or Init() itself.

function startGame (scene: Scene) {
  scene.addBehavior(TestBehavior)({ zach: 'hello world' });
  let test: TestBehavior = scene.getBehavior(TestBehavior);
  
  test.addBehavior(NetworkBehavior)({ properties: ['zach'] });
}



// Start up the Server first
let serverConfig: ConductConfig = new ConductConfig.Builder('2d')
  .setFramesPerSecond(1)
  .setNetworkEnv('server')
  .build();
Conduct.Init(serverConfig, function (scene: Scene) {
  
  startGame(scene);
  
  // Start up the Client
  let clientConfig: ConductConfig = new ConductConfig.Builder('2d')
    .setFramesPerSecond(1)
    .setNetworkEnv('client')
    .build();
  Conduct.Init(clientConfig, startGame);
});


