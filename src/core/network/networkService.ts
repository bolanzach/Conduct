import {RegisterService} from "../injection/metaDecorators";
import {NetworkBehavior} from "./networkBehavior";
import {Conduct} from "../conductEngine";

@RegisterService()
export class NetworkService {

  private socket;

  constructor () {
    console.log(Conduct);
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