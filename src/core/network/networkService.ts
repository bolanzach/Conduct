import {RegisterService} from "../injection/metaDecorators";
import {NetworkBehavior} from "./networkBehavior";
import {Engine} from "../engine";
import * as WebSocket from "ws";

@RegisterService()
export class NetworkService {

  private socket: WebSocket;
  
  
  constructor () {
    console.log(Engine);
    this.socket = new WebSocket('ws://localhost');
  }
  
  public register (networkBehavior: NetworkBehavior) {
    console.log(this.socket);
    this.socket.send('just send itttt');
  }
  
  public deregister (networkBehavior: NetworkBehavior) {
  
  }
  
  private connect () {
  
  }
}