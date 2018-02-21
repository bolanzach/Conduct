import {Behavior} from "./behavior";
import {Transform} from "../behaviors/transform";
import {RegisterBehavior} from "../injection/metaDecorators";

@RegisterBehavior()
export abstract class GameObject extends Behavior {
  
  protected props: any;
  
  constructor (props: any) {
    super();
    this.props = props;
  }
  
  onAwake () {
    this.addBehavior(Transform)(this.props);
  }
  
  getTransform (): Transform {
    return this.getBehavior(Transform) as Transform;
  }

}