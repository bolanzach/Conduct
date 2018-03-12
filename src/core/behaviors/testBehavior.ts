import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";
import {GameObject} from "../behavior/gameObject";

@RegisterBehavior()
export class TestBehavior extends GameObject {
  
  private _message: string;
  
  constructor (props: any) {
    super(props);
    this.props = props;
    this._message = props.message;
  }
  
  onAwake () {
  
  }
  
  @RegisterEvent()
  update () {
  
  }
  
  get message(): string {
    return this._message;
  }
  
  set message(value: string) {
    this._message = value;
  }
  
}
