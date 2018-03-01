import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  
  constructor (props: any) {
    super(props);
    this.props = props;
  }
  
  onAwake () {
  
  }
  
  @RegisterEvent()
  update () {
    console.log('test');
  }
}
