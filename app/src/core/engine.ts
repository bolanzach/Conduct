import {ServiceProvider} from "./services/serviceProvider";
import {BehaviorManager} from "./behaviors/behaviorManager";
import {ServiceManager} from "./services/serviceManager";
import {GameObject} from "./behaviors/gameObject";
import {UtilsService} from "./services/utilsService";

export class Engine {
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  private static serviceManager: ServiceManager;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    let stage: GameObject = new GameObject();
    this.serviceManager = new ServiceManager();
    this.behaviorManager = new BehaviorManager(stage);
    
    //let injector: ServiceProvider = new ServiceProvider();
    //let utilsService: UtilsService = injector.get(UtilsService);

  
    this.initialized = true;
    callback(stage);
  }
  
  
  
}