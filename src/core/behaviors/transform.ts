import {RegisterBehavior} from "../injection/metaDecorators";
import {ConductBehavior} from "../behavior/conductBehavior";

@RegisterBehavior()
export class Transform extends ConductBehavior {
  
  x: number;
  y: number;
  rotation: number;
  scale: number;
  
  constructor (props: any) {
    super(props);
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.rotation = props.rotation || 0;
    this.scale = props.scale || 1;
  }
  
}