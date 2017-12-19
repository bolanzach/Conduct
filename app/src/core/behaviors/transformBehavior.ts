import {RegisterBehavior} from "../metaDecorators";
import {Behavior} from "./behavior";

@RegisterBehavior()
export class TransformBehavior extends Behavior {
  
  constructor () {
    super();
    console.log(this);
  }
  
  public Update() {
    console.log(this);
  }
  
  
}