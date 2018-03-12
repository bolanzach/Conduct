import {Conduct} from "./core/conductEngine";
import {ConductConfig} from "./core/conductConfig";
import {startGame} from "./game";

// Start up the Client
let serverConfig: ConductConfig = new ConductConfig.Builder('2d')
  .setFramesPerSecond(1)
  .setNetworkEnv('server')
  .build();

Conduct.Init(serverConfig, startGame);

