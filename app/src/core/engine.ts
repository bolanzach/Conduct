///<reference path="behaviors/behaviorAssembler.ts"/>
import {BehaviorManager} from "./behaviors/behaviorManager";
import {UtilsService} from "./services/utilsService";
import {ServiceProvider} from "./services/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Transform} from "./behaviors/transform";
import {Behavior} from "./behaviors/behavior";
import {BehaviorAssembler} from "./behaviors/behaviorAssembler";

export class Engine {
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    
    this.behaviorManager = new BehaviorManager();
    let scene: Scene = (this.behaviorManager.initScene());
    
    scene.addBehavior(Transform);
    console.log(scene.getChildren());
    console.log(scene.getBehavior(Transform));

    
  
    
    this.initialized = true;
    this.gameLoop(1);
    callback(scene);
  }
  
  
  
  public static attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    return this.behaviorManager.attachBehaviorToBehavior(attach, to);
  }
  
  public static getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T, from: string): T {
    return this.behaviorManager.getBehavior(behavior, from);
  }
  
  public static getChildrenBehaviors (id: string): Array<Behavior> {
    return this.behaviorManager.getChildrenBehaviors(id);
  }
  
  private static gameLoop (fps) {
    Engine.behaviorManager.update();
    
  }
  
  
}
