import {RegisterBehavior} from "../injection/metaDecorators";
import {Behavior} from "../behavior/behavior";
import {NetworkService} from "./networkService";
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterBehavior()
export class NetworkBehavior extends Behavior {
  
  constructor (props: any) {
    super();
    this.registerToNetwork();
  }
  
  update() {
  
  }
  
  private registerToNetwork () {
    ServiceProvider.get(NetworkService).register(this);
  }
  
}