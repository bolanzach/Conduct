import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";
import {EngineConfig} from "./engineConfig";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {CanvasRender2DService} from "./view/canvasRender2DService";
import {ClientMetronome} from "./chrono/clientMetronome";
import {ServerMetronome} from "./chrono/serverMetronome";

export class Engine {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  
  public static Init (config: EngineConfig, callback: Function) {
    if (this.initialized) {
      return;
    }
  
    Engine.metronome = config.isClient() ? new ClientMetronome() : new ServerMetronome();
    Engine.behaviorManager = new BehaviorManager();
    
    Engine.setupView(config);
    let scene: Scene = (Engine.behaviorManager.initScene());
    
    Engine.metronome.start(1);
    Engine.metronome.registerToTicks(Engine.onTick);
  
    this.initialized = true;
    console.log('e');
    callback(scene);
  }
  
  public static Behaviors (): BehaviorManager {
    return Engine.behaviorManager;
  }
  
  
  private static setupView (config: EngineConfig) {
    if (config.isServer()) {
      return;
    }
    
    let canvas = document.getElementById(config.getCanvasId());
    
    if (canvas) {
      ServiceProvider.get(CanvasRender2DService).setCanvas(config.getCanvasId());
    }
  }
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
}
