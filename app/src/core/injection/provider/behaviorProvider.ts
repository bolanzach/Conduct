import {BehaviorAssembler} from "../behaviorAssembler";
import {BehaviorRecord} from "./behaviorRecord";

export class BehaviorProvider {
  
  private static registered: any = {};
  private static injectionArgs: any = {};
  private static requiredChildren: any = {};
  
  public static inject (behaviorName: string, args: Array<string>, clazz: any) {
    if (BehaviorProvider.registered[behaviorName]) {
      return;
    }
    
    BehaviorProvider.registered[behaviorName] = new BehaviorRecord(
      behaviorName,
      clazz,
      args,
      BehaviorProvider.requiredChildren[behaviorName]);
  }
  
  public static get (behaviorName: string): BehaviorRecord {
    let registeredBehavior: BehaviorRecord = BehaviorProvider.registered[behaviorName.toUpperCase()];
    
    if (!registeredBehavior) {
      console.error('No Behavior has been registered of type ', behaviorName);
      return;
    }
    
    return registeredBehavior
  }
  
  public static addInjectionRequirement (behavior, injectable, index) {
    let requiredArgs = (BehaviorProvider.registered[behavior] || {}).args;
  
    if (!requiredArgs) {
      requiredArgs = BehaviorProvider.injectionArgs[behavior] || [];
    }
  
    requiredArgs[index] = injectable;
    BehaviorProvider.injectionArgs[behavior] = requiredArgs;
  }
  
  public static addRequiredChildBehavior (parent: string, child: string) {
    let requiredChildren = (BehaviorProvider.registered[parent] || {}).requiredChildren;
    
    if (!requiredChildren) {
      requiredChildren = BehaviorProvider.requiredChildren[parent] || [];
    }
    
    requiredChildren.push(child);
    BehaviorProvider.requiredChildren[parent] = requiredChildren;
  }
}
