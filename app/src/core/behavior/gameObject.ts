import {Behavior} from "./behavior";
import {Transform} from "../behaviors/transform";
import {RegisterBehavior, Required} from "../injection/metaDecorators";

@RegisterBehavior()
export abstract class GameObject extends Behavior {
  
  protected config: any;
  
  @Required
  private transform: Transform;
  
  constructor (config: any) {
    super();
    this.config = config;
  }
  
  onAwake () {
    this.addBehavior(Transform)(this.config);
  }

}