import {RegisterBehavior} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  private name: string;
  
  constructor (config: TestBehaviorConfig) {
    super();
    this.name = config.z;
  }
  
  update () {
    console.log(this.name);
  }
}

export class TestBehaviorConfig {
  z: string;
  constructor (z: string) {
    this.z = z;
  }
}