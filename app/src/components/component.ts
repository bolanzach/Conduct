import {Engine} from "../kore/engine";
import {ComponentManager} from "../kore/componentManager";
import {ComponentAssembler} from "./componentAssembler";

export class Component {
  private id: string;
  
  constructor () {
    this.id = 'C' + new Date().getTime();
  }
  
  // May not need this - every component may not want to be updatable
  update () {
    
  }
  
  public addComponent<T extends Component>(component: new (...args: any[]) => T) : Function {
    let parentId = this.id;
    return function (config: any) : ComponentAssembler<T> {
      return new ComponentAssembler(parentId, component, config);
    };
  }
  
  removeComponent (component: Component) {
    
  }
  
  getComponent() {
  
  }
  
  getParent () {
    
  }

  getChildren () {

  }
  
}