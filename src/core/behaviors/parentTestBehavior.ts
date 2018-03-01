import {TestBehavior} from "./testBehavior";
import {RegisterBehavior, RegisterEvent} from "../injection/metaDecorators";

@RegisterBehavior()
export class ParentTestBehavior extends TestBehavior {
  
  constructor (props) {
    super(props);
  }
  
  @RegisterEvent()
  update () {
    console.log('parent');
  }
}