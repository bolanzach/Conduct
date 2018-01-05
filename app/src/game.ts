import {Engine} from "./core/engine";
import {Scene} from "./core/behaviors/scene";
import {TestBehavior} from "./core/behaviors/testBehavior";
import {Transform} from "./core/behaviors/transform";
import {EngineConfig} from "./core/engineConfig";

Engine.Init(new EngineConfig(), function (scene: Scene) {
  
  
  // let socket = new WebSocket('ws://localhost:5000');
  // socket.onmessage = function (message) {
  //   console.log('Connection 1', message.data);
  // };
});