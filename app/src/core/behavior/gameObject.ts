import {Behavior} from "./behavior";
import {Transform} from "../behaviors/transform";
import {RegisterBehavior, RequiredChild} from "../injection/metaDecorators";

@RegisterBehavior()
export abstract class GameObject extends Behavior {
  
  protected props: any;
  
  @RequiredChild
  protected transform: Transform;
  
  constructor (props: any) {
    super();
    this.props = props;
  }
  
  onAwake () {
    this.addBehavior(Transform)(this.props);
    this.transform = this.getBehavior(Transform);
  }

}