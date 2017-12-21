import {BehaviorManager} from "./behavior/behaviorManager";
import {UtilsService} from "./util/utilsService";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Behavior} from "./behavior/behavior";
import {Metronome} from "./chrono/metronome";
import {GameObject} from "./behavior/gameObject";
import {TestBehavior} from "./behaviors/testBehavior";

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
    
    
  
    scene.addBehavior(TestBehavior)({ x: 100 });
    

    
    
    this.initialized = true;
    callback(scene);
    
    Engine.metronome.start(1);
    Engine.metronome.registerToTicks(Engine.onTick);
  }
  
  public static Behaviors (): BehaviorManager {
    return Engine.behaviorManager;
  }
  
  
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
  
  
}
