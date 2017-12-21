import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";


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
  
  public static Behaviors (): BehaviorManager {
    return Engine.behaviorManager;
  }
  
  
  
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
}
