import {Behavior} from "../behavior/behavior";
import {RegisterBehavior} from "../injection/metaDecorators";

@RegisterBehavior()
export class Scene extends Behavior {
  
  constructor () {
    super();
  }
  
  public update() {
    //
  }
  
}