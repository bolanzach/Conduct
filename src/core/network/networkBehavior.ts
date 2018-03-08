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
  
  @RegisterEvent()
  update () {
    (this.properties || []).forEach(prop => {
      let value = this.getParent()[prop].toString();
      NetworkBehavior.networkService.emitProperty(this.getId(), prop, value);
    });
  }

}