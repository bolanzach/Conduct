import * as WebSocket from 'ws';
import {Conduct} from "../conductEngine";
import {ConductConfig} from "../conductConfig";


let config: ConductConfig = new ConductConfig.Builder('2d')
  .setNetworkModel('server')
  .setFramesPerSecond(1)
  .build();

Conduct.Init(config, function () {
  const server: WebSocket.Server = new WebSocket.Server({ port: 8080 });

  server.on('connection', function connection (ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });

    ws.send('connected!');
  });

});