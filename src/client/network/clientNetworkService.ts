import {NetworkBehavior} from "../../core/network/networkBehavior";
import {RegisterService} from "../../core/injection/metaDecorators";

@RegisterService()
export class ClientNetworkService {
  
  private socket;
  
  constructor () {
    this.socket = new WebSocket('ws://localhost:8080');
  }
  
  public register (networkBehavior: NetworkBehavior) {
    this.socket.onopen = () => {
      this.socket.send('just send itttt');
    };
  }
  
  public deregister (networkBehavior: NetworkBehavior) {
  
  }
  
  private connect () {
  
  }
}