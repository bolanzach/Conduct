import {NetworkBehavior} from "../../core/network/networkBehavior";
import {RegisterEvent, RegisterService} from "../../core/injection/metaDecorators";
import {Network} from "../../core/network/network";
import {UpdateEvent} from "../../core/event/updateEvent";
import {NetworkUpdateEvent} from "../../core/network/networkUpdateEvent";
import {ConductService} from "../../core/service/conductService";

@RegisterService()
export class ClientNetworkService extends ConductService implements Network {
  
  private socket;
  private updateDelta: number;
  private behaviorProperties = {};
  
  constructor () {
    super();
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      this.socket.send('CONNECTED');
    };
  }
  
  public register (networkBehavior: NetworkBehavior) {
  
  }
  
  public deregister (networkBehavior: NetworkBehavior) {
  
  }
  
  public emit (event: string, data: any) {
    let message = { event: event, data: data };
    this.socket.send(JSON.stringify(message));
  }
  
  public emitBehaviorProperties (networkId: string, properties: any) {
    this.behaviorProperties[networkId] = properties;
  }
  
  @RegisterEvent()
  update () {
    // if ((event.delta - this.updateDelta) > 1000) {
    //   this.behaviorProperties = {};
    //   new NetworkUpdateEvent().send();
    //   this.updateDelta = event.delta;
    //   this.emit('behaviorPropertyUpdates', this.behaviorProperties);
    // }
    console.log('a');
  }
  
  private handleIncoming () {
    this.socket.on('propertyUpdates', function (idk) {
    
    });
  }
  
  private connect () {
  
  }
  
}