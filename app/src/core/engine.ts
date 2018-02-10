import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";
import {EngineConfig} from "./engineConfig";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {CanvasRender2DService} from "./view/canvasRender2DService";
import {MetronomeService} from "./chrono/metronomeService";

export class Engine {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  private static engineConfig: EngineConfig;
  
  public static Init (config: EngineConfig, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    console.log('Engine Init');
    
    Engine.engineConfig = config;
    Engine.behaviorManager = new BehaviorManager();
  
    new ServiceProvider().release();
    Engine.setupView(config);
    
    Engine.metronome = ServiceProvider.get(MetronomeService);
    Engine.metronome.start(config.getFps());
    Engine.metronome.registerToTicks(Engine.onTick);
  
    Engine.initialized = true;
    let scene: Scene = (Engine.behaviorManager.initScene());
    callback(scene);
  }
  
  public static config (): EngineConfig {
    return Engine.engineConfig;
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
