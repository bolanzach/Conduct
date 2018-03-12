import {RegisterService} from "../injection/metaDecorators";
import {NetworkBehavior} from "./networkBehavior";
import {Network} from "./network";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {ConductService} from "../service/conductService";

@RegisterService()
export class NetworkService extends ConductService implements Network {
  
  private service: Network;

  constructor () {
    super();
    
    let classLoader: any;
    if (process.env.CLIENT) {
      classLoader = require('../../client/network/clientNetworkService').ClientNetworkService;
    } else {
      classLoader = require('../../server/network/serverNetworkService').ServerNetworkService;
    }
    this.service = ServiceProvider.get(classLoader);
  }

  public register (networkBehavior: NetworkBehavior) {
    this.service.register(networkBehavior);
  }

  public deregister (networkBehavior: NetworkBehavior) {
    this.service.deregister(networkBehavior);
  }
  
  public emit (event: string, data: any) {
    this.service.emit(event, data);
  }

}