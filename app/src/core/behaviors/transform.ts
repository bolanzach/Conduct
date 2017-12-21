import {RegisterBehavior} from "../injection/metaDecorators";
import {Behavior} from "../behavior/behavior";

@RegisterBehavior()
export class Transform extends Behavior {
  
  x: number;
  y: number;
  rotation: number;
  scale: number;
  
  constructor (config: any) {
    super();
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.rotation = config.rotation || 0;
    this.scale = config.scale || 1;
  }
  
  public update() {
    //
  }
  
  
}