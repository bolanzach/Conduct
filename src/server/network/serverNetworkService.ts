import {NetworkBehavior} from "../../core/network/networkBehavior";
import * as WebSocket from "ws";
import {Network} from "../../core/network/network";
import {RegisterService} from "../../core/injection/metaDecorators";
import {ConductService} from "../../core/service/conductService";

@RegisterService()
export class ServerNetworkService extends ConductService implements Network {

  private behaviors = {};
  private server: WebSocket.Server;
  
  constructor () {
    super();
    this.server = new WebSocket.Server({ port: 8080 });
    this.server.on('connection', this.onConnect);
  }

  public register (networkBehavior: NetworkBehavior) {
    this.behaviors[networkBehavior.getId()] = networkBehavior;
  }

  public deregister (networkBehavior: NetworkBehavior) {

  }

  public emit (message: string, data: any) {

  }

  private receive (message: string) {
    console.log(message);
    return JSON.parse(message);
  }

  private onConnect (ws) {
    ws.on('propertyUpdates', msg => {
      console.log(msg);
      let networkedProps = this.receive(msg);
    });
  }
  
  private onPropertyUpdates (msg: string) {
    let networkProps = this.receive(msg);
    console.log(networkProps);
  }
}