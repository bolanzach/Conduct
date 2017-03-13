import {ComponentManager} from "./componentManager";

export class Engine {
  
  private static componentManager: ComponentManager = new ComponentManager;
  
  constructor(options) {
    
  }
  
  public init (cb: Function) {
    
    cb();
  }
  
  public static registerComponent(component) {
    this.componentManager.register(component);
  }
  
  
}