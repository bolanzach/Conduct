import {ComponentManager} from "./componentManager";
import {ComponentAssembler} from "../components/componentAssembler";
import {Component} from "../components/component";

export class Engine {
  
  public static Component: ComponentManager;
  public static Service;
  
  public static component (componentName): string {
    return ''
  }
  
  private static componentManager: ComponentManager = new ComponentManager;
  private static servicerManager;
  
  public static init(options, cb: Function) {
    
    // Create an empty base component - the "world"
    let worldAssembler = new ComponentAssembler(null, Component, {});
    Engine.Component.add(worldAssembler);
    cb();
  }
  
  /**
   *
   * @param component
   */
  public static registerComponent(component) {
    Engine.componentManager.register(component);
  }
  
  public static registerService(service) {
    
  }
  
  
}