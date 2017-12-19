import {RegisterBehavior} from "../metaDecorators";
import {Behavior} from "./behavior";

@RegisterBehavior()
export class Transform extends Behavior {
  
  x: number;
  y: number;
  rotation: number;
  
  constructor () {
    super();
  }
  
  public update() {
    console.log(this.getId());
  }
  
  
}