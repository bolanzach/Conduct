import {Behavior} from "./behavior";
import {Transform} from "../behaviors/transform";
import {RegisterBehavior, Required} from "../injection/metaDecorators";

@RegisterBehavior()
export abstract class GameObject extends Behavior {
  
  @Required()
  private transform: Transform;
  
  constructor () {
    super();
    this.addBehavior(Transform);
  }

}