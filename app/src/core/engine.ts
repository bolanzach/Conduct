import {BehaviorManager} from "./behaviors/behaviorManager";
import {UtilsService} from "./services/utilsService";
import {ServiceProvider} from "./services/serviceProvider";
import {SceneBehavior} from "./behaviors/sceneBehavior";
import {TransformBehavior} from "./behaviors/transformBehavior";

export class Engine {
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    
    this.behaviorManager = new BehaviorManager();
    let scene: SceneBehavior = (this.behaviorManager.initScene());
    
    console.log(scene);
    
    //scene.AddBehavior(TransformBehavior);
    
    this.behaviorManager.attachBehaviorToBehavior(TransformBehavior, scene.getId());
    
    
    //let utilsService: UtilsService = ServiceProvider.get(UtilsService);
    //console.log(utilsService);
    
  
    
    this.initialized = true;
    //callback(stage);
  }
  
  
  
}
