import {RegisterBehavior} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  private name: string;
  
  constructor (props: any) {
    super(props);
    this.props = props;
  }
  
  update () {
  
  }
  
  onAwake () {
  
  }
}
