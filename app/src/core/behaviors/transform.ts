import {RegisterBehavior} from "../injection/metaDecorators";
import {Behavior} from "../behavior/behavior";

@RegisterBehavior()
export class Transform extends Behavior {
  
  x: number;
  y: number;
  rotation: number;
  scale: number;
  
  constructor (props: any) {
    super();
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.rotation = props.rotation || 0;
    this.scale = props.scale || 1;
  }
  
  public update() {
    //
  }
  
  
}