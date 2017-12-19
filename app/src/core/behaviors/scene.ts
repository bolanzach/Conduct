import {Behavior} from "./behavior";
import {RegisterBehavior} from "../metaDecorators";

@RegisterBehavior()
export class Scene extends Behavior {
  
  constructor () {
    super();
  }
  
  public Update() {
    throw new Error('Method not implemented.');
  }
  
  public doStuff() {
  
  }

  
}