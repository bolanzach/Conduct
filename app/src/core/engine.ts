import {BehaviorManager} from "./behaviors/behaviorManager";
import {UtilsService} from "./services/utilsService";
import {ServiceProvider} from "./services/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Transform} from "./behaviors/transform";
import {Behavior} from "./behaviors/behavior";
import {BehaviorAssembler} from "./behaviors/behaviorAssembler";
import {TestBehavior} from "./behaviors/testBehavior";

export class Engine {
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    
    this.behaviorManager = new BehaviorManager();
    let scene: Scene = (this.behaviorManager.initScene());
    
    scene.addBehavior(TestBehavior);
    console.log(scene.getChildren());
  
    scene.addBehavior(Transform);
    console.log(scene.getChildren());
    scene.addBehavior(Transform);
    console.log(scene.getChildren());
    
  
    
    this.initialized = true;
    callback(scene);
    this.gameLoop(1);
  }
  
  
  
  public static findBehavior (behaviorId: string): Behavior {
    return Engine.behaviorManager.findBehavior(behaviorId);
  }
  
  public static getParentBehavior (id: string): Behavior {
    return Engine.behaviorManager.getParentBehavior(id);
  }
  
  public static attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    return Engine.behaviorManager.attachBehaviorToBehavior(attach, to);
  }
  
  public static getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T, from: string): T {
    return Engine.behaviorManager.getBehavior(behavior, from);
  }
  
  public static getChildrenBehaviors (id: string): Array<Behavior> {
    return Engine.behaviorManager.getChildrenBehaviors(id);
  }
  
  private static gameLoop (fps) {
    Engine.behaviorManager.update();
    
  }
  
  
}
