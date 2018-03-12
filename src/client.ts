import {Conduct} from "./core/conductEngine";
import {ConductConfig} from "./core/conductConfig";
import {startGame} from "./game";

// Start up the Client
let clientConfig: ConductConfig = new ConductConfig.Builder('2d')
  .setFramesPerSecond(1)
  .setNetworkEnv('client')
  .build();

Conduct.Init(clientConfig, startGame);

