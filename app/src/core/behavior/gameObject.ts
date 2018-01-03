import {Behavior} from "./behavior";
import {Transform} from "../behaviors/transform";
import {RegisterBehavior, RequiredChild} from "../injection/metaDecorators";

@RegisterBehavior()
export abstract class GameObject extends Behavior {
  
  protected config: any;
  
  @RequiredChild
  protected transform: Transform;
  
  constructor (config: any) {
    super();
    this.config = config;
  }
  
  onAwake () {
    this.addBehavior(Transform)(this.config);
    this.transform = this.getBehavior(Transform);
  }

}