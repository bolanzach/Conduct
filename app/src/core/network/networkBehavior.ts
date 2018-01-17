import {RegisterBehavior} from "../injection/metaDecorators";
import {Behavior} from "../behavior/behavior";

@RegisterBehavior()
class NetworkBehavior extends Behavior {
  
  constructor (config: any) {
    super();
  }
  
  update() {
  }
  
}