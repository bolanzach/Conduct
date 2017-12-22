import {RegisterBehavior} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  private name: string;
  
  constructor (config: any) {
    super(config);
    this.config = config;
  }
  
  update () {
  
  }
  
  onAwake () {
  
  }
}
