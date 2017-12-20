import {Behavior} from "./behavior";
import {RegisterBehavior} from "../metaDecorators";

@RegisterBehavior()
export class Scene extends Behavior {
  
  constructor () {
    super();
  }
  
  public update() {
    console.log(this.getId());
  }
  
}