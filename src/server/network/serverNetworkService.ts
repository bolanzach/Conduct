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

  private onConnect (ws) {

    // ws sucks. it won't let me pass a function by reference here
    ws.on('message', function (msg) {
      let message;

      try {
        message = JSON.parse(msg || {});
      } catch {
        message = {}
      }

      if (message.event === 'behaviorPropertyUpdate') {
        console.log(message);
      }
    });
  }

}