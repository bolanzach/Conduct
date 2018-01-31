import * as WebSocket from 'ws';
import {Engine} from "../engine";
import {EngineConfig} from "../engineConfig";

const ws = new WebSocket('ws://localhost');

// ws.on('open', function open() {
//   ws.send('something');
// });
//
// ws.on('message', function incoming(data) {
//   console.log(data);
// });

let config: EngineConfig = new EngineConfig.Builder('2d')
  .setNetworkModel('server')
  .build();



Engine.Init(config, function () {
  // server.listen(process.env.PORT || 10000, () => {
  //   console.log(`Server started on port ${server.address().port} :)`);
  // });
  console.log('hi');
});