import {ComponentManager} from "./componentManager";

export class Engine {
  
  public static Component: any = {};
  public static Service: any = {};
  
  private static componentManager: ComponentManager = new ComponentManager;
  private static servicerManager;
  
  public static init(options, cb: Function) {
    cb();
  }
  
  /**
   *
   * @param component
   */
  public static registerComponent(component) {
    let registeredComponent = Engine.componentManager.register(component);
    Engine.Component[registeredComponent.name] = function (config) {
      return Engine.componentManager.create(registeredComponent.name, config);
    };
  }
  
  public static registerService(service) {
    
  }
  
  
}