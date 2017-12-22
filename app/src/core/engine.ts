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
    
    Engine.createCanvas(config.id || 'scene');
    let scene: Scene = (Engine.behaviorManager.initScene());
    
    Engine.metronome.start(1);
    Engine.metronome.registerToTicks(Engine.onTick);
  
    this.initialized = true;
    callback(scene);
  }
  
  public static Behaviors (): BehaviorManager {
    return Engine.behaviorManager;
  }
  
  
  private static createCanvas (id: string) {
    document.getElementById(id).innerHTML = '<canvas id="engine-view" style="width: 100%; height: 100%"></canvas>';
  }
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
}
