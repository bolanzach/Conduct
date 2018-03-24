import {NetworkBehavior} from "../../core/network/networkBehavior";
import {RegisterEvent, RegisterService} from "../../core/injection/metaDecorators";
import {Network} from "../../core/network/network";
import {UpdateEvent} from "../../core/event/updateEvent";
import {NetworkUpdateEvent} from "../../core/network/networkUpdateEvent";
import {ConductService} from "../../core/service/conductService";
import {UtilsService} from "../../core/util/utilsService";
import {ServiceProvider} from "../../core/injection/provider/serviceProvider";

@RegisterService()
export class ClientNetworkService extends ConductService implements Network {
  
  private socket;
  private behaviors = {};
  
  private utils: UtilsService;
  
  constructor () {
    super();
    
    this.utils = ServiceProvider.get(UtilsService);
    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.onopen = () => {
      this.socket.send('CONNECTED');
    };
  }
  
  public register (networkBehavior: NetworkBehavior) {
    this.behaviors[networkBehavior.getId()] = networkBehavior;
  }
  
  public deregister (networkBehavior: NetworkBehavior) {
  
  }
  
  public emit (event: string, data: any) {
    let message = { event: event, data: data };
    this.socket.send(JSON.stringify(message));
  }
  
  
  @RegisterEvent()
  update (event: UpdateEvent) {
    let propertiesToEmit = {};
    this.utils.forEach(this.behaviors, (networkBehavior: NetworkBehavior, networkId) => {
      propertiesToEmit[networkId] = networkBehavior.getNetworkedProperties();
    });
    
    new NetworkUpdateEvent().send();
    this.emit('behaviorPropertyUpdates', propertiesToEmit);
  }

  private connect () {
  
  }
  
}