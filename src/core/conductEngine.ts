import {BehaviorManager} from "./behavior/behaviorManager";
import {Scene} from "./behaviors/scene";
import {Metronome} from "./chrono/metronome";
import {ConductConfig} from "./conductConfig";
import {ServiceProvider} from "./injection/provider/serviceProvider";
import {CanvasRender2DService} from "./view/canvasRender2DService";
import {MetronomeService} from "./chrono/metronomeService";
import {UpdateEvent} from "./event/updateEvent";

export class Conduct {
  
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static metronome: Metronome;
  private static engineConfig: ConductConfig;
  
  public static Init (config: ConductConfig, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    Conduct.engineConfig = config;
  
    // Release injected services so they can be constructed
    Conduct.initialized = true;
    new ServiceProvider().release();
    Conduct.behaviorManager = new BehaviorManager();
    
    Conduct.setupView(config);
    
    // Start up the Metronome
    Conduct.metronome = ServiceProvider.get(MetronomeService);
    Conduct.metronome.start(config.getFps());
    Conduct.metronome.registerToTicks(Conduct.onTick);
    
    let scene: Scene = (Conduct.behaviorManager.initScene());
    callback(scene);
  }
  
  public static isInitialized (): boolean {
    return Conduct.initialized;
  }
  
  public static config (): ConductConfig {
    return Conduct.engineConfig;
  }
  
  public static Behaviors (): BehaviorManager {
    return Conduct.behaviorManager;
  }
  
  /**
   * Setup the Renderer if this is a Client
   * @param {ConductConfig} config
   */
  private static setupView (config: ConductConfig) {
    if (config.isServer()) {
      return;
    }
    
    let canvas = document.getElementById(config.getCanvasId());
    
    if (canvas) {
      ServiceProvider.get(CanvasRender2DService).setCanvas(config.getCanvasId());
    }
  }
  
  private static onTick (delta) {
    new UpdateEvent(delta).send();
  }
  
}
