import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";
import {ConductBehavior} from "../behavior/conductBehavior";
import {NetworkService} from "./networkService";
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterBehavior()
export class NetworkBehavior extends ConductBehavior {

  private networkProperties: Array<string>;

  constructor (props: any) {
    super(props);
    this.networkProperties = props.properties || [];
    this.registerToNetwork();
  }

  private registerToNetwork () {
    ServiceProvider.get(NetworkService).register(this);
  }
  
  getNetworkedProperties () {
    let parent = this.getParent();
    return (this.networkProperties || []).reduce((properties, nProp) => {
      if (parent[nProp]) {
        properties[nProp] = parent[nProp].toString();
      }
      return properties;
    }, {});
  }
  
  setNetworkedProperties (networkProperties) {
  
  }

}