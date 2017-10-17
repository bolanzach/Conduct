import {Behavior} from "./behavior";

export class BehaviorManager {

  
  private behaviorsToUpdate: any = {};
  
  constructor (stage: Behavior) {
    this.behaviorsToUpdate['engine.Stage'] = stage;
  }

  
  public register (behavior: Behavior) {
  
  }
  
  public update () {
  
  }
  
  
}
