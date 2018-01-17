import * as express from 'express';
import * as http from 'http';
import * as WebSocket from 'ws';
import {Engine} from "../engine";
import {EngineConfig} from "../engineConfig";

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

let config: EngineConfig = new EngineConfig.Builder('2d')
  .setNetworkModel('server')
  .build();

wss.on('connection', (ws: WebSocket) => {
  
  ws.on('message', (message: string) => {
    
    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });
  
  ws.send('Hi there, I am a WebSocket server');
});

Engine.Init(config, function () {
  server.listen(process.env.PORT || 10000, () => {
    console.log(`Server started on port ${server.address().port} :)`);
  });
});