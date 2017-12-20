import {BehaviorManager} from "./behavior/behaviorManager";
import {UtilsService} from "./util/utilsService";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Behavior} from "./behavior/behavior";
import {BehaviorAssembler} from "./injection/behaviorAssembler";
import {Metronome} from "./chrono/metronome";
import {GameObject} from "./behavior/gameObject";

export class Engine {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
  
    Engine.metronome = new Metronome();
    Engine.behaviorManager = new BehaviorManager();
    let scene: Scene = (Engine.behaviorManager.initScene());

    
    
    this.initialized = true;
    callback(scene);
    
    Engine.metronome.start(1);
    Engine.metronome.registerToTicks(Engine.onTick);
  }
  
  
  
  public static findBehavior (behaviorId: string): Behavior {
    return Engine.behaviorManager.findBehavior(behaviorId);
  }
  
  public static getParentBehavior (behaviorId: string): Behavior {
    return Engine.behaviorManager.getParentBehavior(behaviorId);
  }
  
  public static attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    return Engine.behaviorManager.attachBehaviorToBehavior(attach, to);
  }
  
  public static getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T, from: string): T {
    return Engine.behaviorManager.getBehavior(behavior, from);
  }
  
  public static getChildrenBehaviors (behaviorId: string): Array<Behavior> {
    return Engine.behaviorManager.getChildrenBehaviors(behaviorId);
  }
  
  public static deactivateBehavior (behaviorId: string) {
    return Engine.behaviorManager.deactivateBehavior(behaviorId);
  }
  
  
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
  
  
}
