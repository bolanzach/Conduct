import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";
import {EngineConfig} from "./engineConfig";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {CanvasRender2DService} from "./view/canvasRender2DService";
import {ClientMetronome} from "./chrono/clientMetronome";
import {ServerMetronome} from "./chrono/serverMetronome";
import {MetronomeProvider} from "./chrono/metronomeProvider";

export class Engine {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  private static engineConfig: EngineConfig;
  
  public static Init (config: EngineConfig, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    console.log('sadfasdf');
  
    Engine.engineConfig = config;
    Engine.metronome = config.isClient() ? new ClientMetronome() : new ServerMetronome();
    Engine.behaviorManager = new BehaviorManager();
    
    Engine.setupView(config);
    let scene: Scene = (Engine.behaviorManager.initScene());
    
    let a: Metronome = ServiceProvider.get(MetronomeProvider);
    a.registerToTicks(null);
    
    Engine.metronome.start(config.getFps());
    Engine.metronome.registerToTicks(Engine.onTick);
  
    this.initialized = true;
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
