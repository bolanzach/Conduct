import * as WebSocket from 'ws';
import {Engine} from "../engine";
import {EngineConfig} from "../engineConfig";


let config: EngineConfig = new EngineConfig.Builder('2d')
  .setNetworkModel('server')
  .setFramesPerSecond(1)
  .build();

Engine.Init(config, function () {
  const server: WebSocket.Server = new WebSocket.Server({ port: 8080 });
  
  server.on('connection', function connection (ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    
    ws.send('connected!');
  });
  
});