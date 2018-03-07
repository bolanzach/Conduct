import {RegisterService} from "../injection/metaDecorators";
import {NetworkBehavior} from "./networkBehavior";
import {Conduct} from "../conductEngine";
import {Network} from "./network";
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterService()
export class NetworkService implements Network {

  private service: Network;

  constructor () {
    let loader: any = Conduct.config().isClient() ?
      require('../../client/network/clientNetworkService').ClientNetworkService :
      require('../../server/network/serverNetworkService').ServerNetworkService;
    this.service = ServiceProvider.get(loader) as Network;
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