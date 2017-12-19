import {Behavior} from "./behavior";
import {Transform} from "./transform";
import {Inject, RegisterBehavior} from "../metaDecorators";

@RegisterBehavior()
export class TestBehavior extends Behavior {
  
  private transform: Transform;
  
  constructor (@Inject(Transform) transform: Transform) {
    super();
    this.transform = transform;
  }
  
  update () {
  
  }
}