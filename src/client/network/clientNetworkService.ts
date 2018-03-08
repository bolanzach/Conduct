import {NetworkBehavior} from "../../core/network/networkBehavior";
import {RegisterEvent, RegisterService} from "../../core/injection/metaDecorators";
import {Network} from "../../core/network/network";
import {UpdateEvent} from "../../core/event/updateEvent";
import {NetworkUpdateEvent} from "../../core/network/networkUpdateEvent";

@RegisterService()
export class ClientNetworkService implements Network {
  
  private socket;
  private updateDelta: number;
  
  constructor () {
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      this.socket.send('CONNECTED');
    };
  }
  
  public register (networkBehavior: NetworkBehavior) {
  
  }
  
  public deregister (networkBehavior: NetworkBehavior) {
  
  }
  
  public emit (message: string, data: any) {
  
  }
  
  public emitProperty (networkId: string, prop: string, value: string) {
  
  }
  
  @RegisterEvent()
  update (event: UpdateEvent) {
    if ((event.delta - this.updateDelta) > 1000) {
      new NetworkUpdateEvent().send();
      this.updateDelta = event.delta;
    }
  }
  
  private handleIncoming () {
    this.socket.on('propertyUpdates', function (idk) {
    
    });
  }
  
  private connect () {
  
  }
  
}