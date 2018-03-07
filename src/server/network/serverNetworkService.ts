import {NetworkBehavior} from "../../core/network/networkBehavior";
import * as WebSocket from "ws";
import {Network} from "../../core/network/network";

export class ServerNetworkService implements Network {

  private server: WebSocket.Server = new WebSocket.Server({ port: 8080 });


  constructor () {
    this.server.on('connection', this.onConnect);
  }

  public register (networkBehavior: NetworkBehavior) {

  }

  public deregister (networkBehavior: NetworkBehavior) {

  }

  public emit (message: string, data: any) {

  }

  private onConnect (ws) {
    ws.on('message', function incoming (message) {
      console.log('received: %s', message);
    });

    ws.send('connected!');
  }
}

// export class ServerNetworkService {}