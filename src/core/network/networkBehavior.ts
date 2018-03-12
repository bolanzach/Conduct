import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";
import {Behavior} from "../behavior/behavior";
import {NetworkService} from "./networkService";
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterBehavior()
export class NetworkBehavior extends Behavior {

  private properties: Array<string>;
  private static networkService: NetworkService;
  
  constructor (props: any) {
    super();
    NetworkBehavior.networkService = ServiceProvider.get(NetworkService);
    this.properties = props.properties || [];
    this.registerToNetwork();
  }

  private registerToNetwork () {
    NetworkBehavior.networkService.register(this);
  }
  
  getNetworkedProperties () {
    let parent = this.getParent();
    return (this.properties || []).reduce((properties, nProp) => {
      if (parent[nProp]) {
        properties[nProp] = parent[nProp].toString();
      }
      return properties;
    }, {});
  }
  
  setNetworkedProperties (networkProperties) {
  
  }

}