import {RegisterService} from "../injection/metaDecorators";
import {NetworkBehavior} from "./networkBehavior";
import {Conduct} from "../conductEngine";
import {Network} from "./network";
import {ClientNetworkService} from "../../client/network/clientNetworkService";
import {ServerNetworkService} from "../../server/network/serverNetworkService";
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterService()
export class NetworkService implements Network {

  private service: Network;

  constructor () {
    let clazz: any = Conduct.config().isClient() ? ClientNetworkService : ServerNetworkService;
    this.service = ServiceProvider.get(clazz);
  }

  public register (networkBehavior: NetworkBehavior) {
    this.service.register(networkBehavior);
  }

  public deregister (networkBehavior: NetworkBehavior) {
    this.service.deregister(networkBehavior);
  }
  
  public emit (message: string, data: any) {
    this.service.emit(message, data);
  }

}