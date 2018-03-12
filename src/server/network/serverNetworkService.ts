import {NetworkBehavior} from "../../core/network/networkBehavior";
import * as WebSocket from "ws";
import {Network} from "../../core/network/network";
import {RegisterService} from "../../core/injection/metaDecorators";
import {ConductService} from "../../core/service/conductService";

@RegisterService()
export class ServerNetworkService extends ConductService implements Network {

  private server: WebSocket.Server;
  
  constructor () {
    super();
    this.server = new WebSocket.Server({ port: 8080 });
    this.server.on('connection', this.onConnect);
  }

  public register (networkBehavior: NetworkBehavior) {

  }

  public deregister (networkBehavior: NetworkBehavior) {

  }

  public emit (message: string, data: any) {

  }

  private onConnect (ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    
    ws.on('propertyUpdates', function (idk) {
      console.log(idk);
    });
  }
}