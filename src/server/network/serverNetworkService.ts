import {NetworkBehavior} from "../../core/network/networkBehavior";
import * as WebSocket from "ws";
import {Network} from "../../core/network/network";
import {RegisterService} from "../../core/injection/metaDecorators";

@RegisterService()
export class ServerNetworkService implements Network {

  private server: WebSocket.Server;
  
  constructor () {
    this.server = new WebSocket.Server({ port: 8080 });
    this.server.on('connection', function connection (ws) {
      ws.on('message', function incoming(message) {
        console.log('received: %s', message);
      });
    
      console.log('connected');
    });
  }

  public register (networkBehavior: NetworkBehavior) {

  }

  public deregister (networkBehavior: NetworkBehavior) {

  }

  public emit (message: string, data: any) {

  }
  
  public emitProperty (networkId: string, prop: string, value: string) {
  
  }
  //
  // private onConnect (ws) {
  //   ws.on('message', function incoming (message) {
  //     console.log('received: %s', message);
  //   });
  //
  //   ws.send('connected!');
  // }
}