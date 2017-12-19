import {BehaviorAssembler} from "./behaviorAssembler";

export class BehaviorProvider {
  
  private static registered: any = {};
  
  public inject (behavioreName: string, args: Array<string>, clazz: any) {
    if (BehaviorProvider.registered[behavioreName]) {
      return;
    }
    
    BehaviorProvider.registered[behavioreName] = {
      name: behavioreName,
      clazz: clazz,
      args: args
    };
  }
  
  public get (behaviorName: string): BehaviorAssembler {
    let registeredBehavior: any = BehaviorProvider.registered[behaviorName];
    
    if (!registeredBehavior) {
      console.error('No Behavior has been registered of type ', behaviorName);
      return;
    }
    
    return new BehaviorAssembler(registeredBehavior);
  }

  
}
