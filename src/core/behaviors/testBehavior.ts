import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  private _zach: string;
  
  constructor (props: any) {
    super(props);
    this.props = props;
    this._zach = props.zach;
  }
  
  onAwake () {
  
  }
  
  @RegisterEvent()
  update () {
  
  }
  
  get zach(): string {
    return this._zach;
  }
  
  set zach(value: string) {
    this._zach = value;
  }
  
}
