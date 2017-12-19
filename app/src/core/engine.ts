///<reference path="behaviors/behaviorAssembler.ts"/>
import {BehaviorManager} from "./behaviors/behaviorManager";
import {UtilsService} from "./services/utilsService";
import {ServiceProvider} from "./services/serviceProvider";
import {Scene} from "./behaviors/scene";
import {Transform} from "./behaviors/transform";
import {Behavior} from "./behaviors/behavior";
import {BehaviorAssembler} from "./behaviors/behaviorAssembler";

export class Engine {
  private static initialized: boolean = false;
  private static behaviorManager: BehaviorManager;
  
  public static Init (config: any, callback: Function) {
    if (this.initialized) {
      return;
    }
    
    
    this.behaviorManager = new BehaviorManager();
    let scene: Scene = (this.behaviorManager.initScene());
    
    console.log(scene);
    
    scene.AddBehavior(Transform);
    
    
    
    //let utilsService: UtilsService = ServiceProvider.get(UtilsService);
    //console.log(utilsService);
    
  
    
    this.initialized = true;
    //callback(stage);
  }
  
  public static attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    return this.behaviorManager.attachBehaviorToBehavior(attach, to);
  }
  
  
  
  
}
