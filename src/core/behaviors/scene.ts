import {ConductBehavior} from "../behavior/conductBehavior";
import {RegisterBehavior} from "../injection/metaDecorators";

@RegisterBehavior()
export class Scene extends ConductBehavior {
  
  constructor () {
    super({ parentId: 'Conduct' });
  }
  
  public update() {
    //
  }
  
}