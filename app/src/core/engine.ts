import {BehaviorManager} from "./behaviors/behaviorManager";
import {UtilsService} from "./services/utilsService";
import {ServiceProvider} from "./services/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Behavior} from "./behaviors/behavior";
import {BehaviorAssembler} from "./behaviors/behaviorAssembler";
import {Metronome} from "./metronome";

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
    
    Engine.metronome.start();
    Engine.metronome.registerToTicks(Engine.onTick);
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
  
  
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
  
  
}
