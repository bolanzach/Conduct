import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";
import {RendererProvider} from "./view/rendererProvider";
import {EngineConfig} from "./engineConfig";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {RenderService} from "./view/renderService";

export class Engine {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  
  public static Init (config: EngineConfig, callback: Function) {
    if (this.initialized) {
      return;
    }
  
    Engine.metronome = new Metronome();
    Engine.behaviorManager = new BehaviorManager();
    
    Engine.setupView(config);
    let scene: Scene = (Engine.behaviorManager.initScene());
    
    Engine.metronome.start(1);
    Engine.metronome.registerToTicks(Engine.onTick);
  
    this.initialized = true;
    callback(scene);
  }
  
  public static Behaviors (): BehaviorManager {
    return Engine.behaviorManager;
  }
  
  
  private static setupView (config: EngineConfig) {
    let canvas = document.getElementById(config.getCanvasId());
    
    if (canvas) {
      let renderProvider: RendererProvider = ServiceProvider.get(RendererProvider);
      renderProvider.setRenderer(config.getContext());
      renderProvider.get().setCanvas(config.getCanvasId());
    }
  }
  
  private static onTick (delta) {
    Engine.behaviorManager.update();
  }
  
}
