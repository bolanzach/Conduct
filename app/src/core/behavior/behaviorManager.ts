import {Behavior} from "./behavior";
import {BehaviorAssembler} from "../injection/behaviorAssembler";
import {BehaviorProvider} from "../injection/provider/behaviorProvider";
import {getConstructorName} from "../injection/metaDecorators";
import {Scene} from "../behaviors/scene";
import {BehaviorRecord} from "../injection/provider/behaviorRecord";

export class BehaviorManager {

  private behaviorsToUpdate: any = {};
  private assemblers: any = {};
  private idk: any = {};
  
  constructor () {}
  
  public initScene (): Scene {
    new Scene(); // have to do something to Scene to have requirejs recognize the module. need a better way to do this
    let record: BehaviorRecord = BehaviorProvider.get('scene');
    let newAssembler = new BehaviorAssembler(record, null);
    let sceneBehavior = this.constructBehavior(newAssembler, null);
    return sceneBehavior as Scene;
  }
  
  public update () {
    Object.keys(this.behaviorsToUpdate || {}).forEach(behaviorKey => this.behaviorsToUpdate[behaviorKey].update());
  }

  public attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): (configuration?: any) => void {
    let newBehaviorName = getConstructorName(attach);
    let behaviorRecord = BehaviorProvider.get(newBehaviorName);
    let newAssembler = new BehaviorAssembler(behaviorRecord, to);
    let activeAssembler: BehaviorAssembler = this.assemblers[to];
    
    if (!activeAssembler) {
      // let a = this.idk[to];
      // this.idk[to] = a ? a[newBehaviorName].z.push(newAssembler) : { z: [newAssembler] };
      // return (configuration?: any) => {
      //   let a = this.idk[to];
      //   if (a) {
      //     a.config = configuration || {};
      //   } else {
      //     // do regular stuff
      //   }
      // };
    }
    
    if (activeAssembler.inactiveChildren[newBehaviorName] || activeAssembler.activeChildren[newBehaviorName]) {
      return; // ? this behavior type is already attached
    }
    
    activeAssembler.inactiveChildren[newBehaviorName] = newAssembler;
    
    return (configuration?: any) => {
      activeAssembler.childrenAssemblerConfigs[newBehaviorName] = configuration || {};
      this.activateAssemblerChildren(activeAssembler);
    };
  }
  
  public getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T, from: string): T {
    let parentBehavior: BehaviorAssembler = this.assemblers[from];
    
    if (!parentBehavior) {
      return null;
    }
    
    let assembler = parentBehavior.activeChildren[getConstructorName(behavior)] || {};
    return assembler.behavior;
  }
  
  public find (id: string): Behavior | undefined {
    return this.behaviorsToUpdate[id];
  }
  
  public getChildren (id: string): Array<Behavior> {
    let parentBehavior: BehaviorAssembler = this.assemblers[id];
    
    if (!parentBehavior) {
      return [];
    }
    
    let activeChildren = parentBehavior.activeChildren || {};
    return Object.keys(activeChildren).map(childKey => {
      return activeChildren[childKey].behavior;
    });
  }
  
  public getParent (id: string) {
    let childRecord = this.assemblers[id];
    return this.find((childRecord || {}).parent);
  }
  
  /**
   * Deactivate the Behavior with the given id.
   * This function is not recursive in that it will deactivate all the child Behaviors - that should
   * be contained within the Behavior class.
   * This function will however recursively deactivate the parent Behavior if it requires that this
   * child be activate.
   *
   * @param {string} id
   */
  public deactivate (id: string) {
    //
  }
  
  /**
   * Destroy the Behavior with the given id.
   * This function is not recursive in that it will destroy all the child Behaviors - that should
   * be contained within the Behavior class.
   * This function will however recursively destroy the parent Behavior if it requires that this
   * child exist.
   *
   * @param {string} id
   */
  public destroy (id: string) {
    let assemblerToDestroy: BehaviorAssembler = this.assemblers[id];
  
    if (!assemblerToDestroy) {
      return;
    }
  
    let parentId: string = assemblerToDestroy.parent;
    let parent: BehaviorAssembler = this.assemblers[parentId];
    let behaviorName: string = assemblerToDestroy.name;
  
    if (this.parentRequiresChild(parentId, behaviorName)) {
      this.destroy(parentId);
    }
  
    delete this.assemblers[id];
    delete this.behaviorsToUpdate[id];
    delete parent.activeChildren[behaviorName];
    delete parent.inactiveChildren[behaviorName];
  }
  
  /**
   * Behaviors can require that certain child Behaviors exist. When a Behavior is destroyed or deactivated and
   * its parent requires it, the parent Behavior must be deactivated.
   * This function recursively traverses up the parent Behavior's prototype chain checking if it or any of
   * its super classes require the behavior that was removed.
   *
   * @param {string} parentId
   * @param {string} behaviorName
   * @returns {boolean}
   */
  private parentRequiresChild (parentId: string, behaviorName: string): boolean {
    let parent = this.behaviorsToUpdate[parentId];
    let recursiveLookup = (proto, behaviorName) => {
      let parentProto = Object.getPrototypeOf(proto);
      if (!parentProto) {
        return;
      }
      
      let record = BehaviorProvider.get(getConstructorName(proto.constructor));
      let isRequired = Object.keys((record.requiredChildren || {})).some(behavior => behavior === behaviorName);
      return isRequired || recursiveLookup(parentProto, behaviorName);
    };

    if (!parent) {
      return;
    }
    
    return recursiveLookup(parent, behaviorName);
  }
  
  private activateAssemblerChildren (assembler: BehaviorAssembler) {
    let inactiveChildren = assembler.inactiveChildren || {};
    
    let behaviorCreated: boolean = Object.keys(inactiveChildren).some((behaviorType: string) => {
      let assemblerToActivate = inactiveChildren[behaviorType];
      let canActivate = this.canActivate(assemblerToActivate, assembler);
      
      if (!canActivate) {
        return;
      }
      
      // Create the behavior
      delete inactiveChildren[behaviorType];
      assembler.activeChildren[behaviorType] = {
        assembler: assemblerToActivate,
        behavior: this.constructBehavior(assemblerToActivate, assembler)
      };
      
      // Recursively try to create the new Behavior's children
      this.activateAssemblerChildren(assemblerToActivate);
      return canActivate;
    });
    
    // If a behavior was created and added it may allow others to be created
    if (behaviorCreated) {
      this.activateAssemblerChildren(assembler);
    }
  }
  
  /**
   * Checks if the parentAssembler satisfies all the dependencies for the assemblerToCheck.
   * A dependency is satisfied if the parent has all active Behaviors required by the Assembler.
   * This function ignores the special Config dependency
   *
   * @param {BehaviorAssembler} assemblerToCheck
   * @param {BehaviorAssembler} parentAssembler
   * @return {boolean}
   */
  private canActivate (assemblerToCheck: BehaviorAssembler, parentAssembler: BehaviorAssembler): boolean {
    let dependencies = assemblerToCheck.record.args;
    return dependencies.every((arg) => {
      return arg === 'CONFIG' || !!parentAssembler.activeChildren[arg];
    });
  }
  
  /**
   * Creates a new Behavior from an Assembler.
   * Registers the Assembler to the assemblers map and allows the new Behavior to be updated
   *
   * Warning: this does not check if the assembler can be activated and if all its dependencies have
   * been satisfied. Run canActivate before calling this.
   *
   * @param {BehaviorAssembler} assembler
   * @param {BehaviorAssembler} parentAssembler
   * @return {Behavior}
   */
  private constructBehavior (assembler: BehaviorAssembler, parentAssembler: BehaviorAssembler): Behavior {
    let behavior: Behavior;
    let id: string;
    let dependencies = [];
    let config = assembler.record;
    
    if (parentAssembler) {
      let activeBehaviors = parentAssembler.activeChildren;
      dependencies = (config.args || []).map(arg => {
        return activeBehaviors[arg] ?
          activeBehaviors[arg].behavior :
          parentAssembler.childrenAssemblerConfigs[assembler.name];
      });
    }
    
    behavior = new config.clazz(...dependencies);
    id = behavior.getId();
    
    this.behaviorsToUpdate[id] = behavior;
    this.assemblers[id] = assembler;
    
    behavior.onAwake();
    return behavior;
  }
  
}

