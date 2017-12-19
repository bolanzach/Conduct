import {Behavior} from "./behavior";
import {BehaviorAssembler} from "./behaviorAssembler";
import {BehaviorProvider} from "./behaviorProvider";
import {getConstructorName} from "../metaDecorators";
import {Scene} from "./scene";

export class BehaviorManager {

  private behaviorsToUpdate: any = {};
  private behaviorRecords: any = {};
  
  constructor () {}
  
  public initScene (): Scene {
    let stageBehaviorAssembler: BehaviorAssembler = BehaviorProvider.get('Scene');
    let record: BehaviorManager.BehaviorAssemblerRecord = new BehaviorManager.BehaviorAssemblerRecord(stageBehaviorAssembler, null);
    let sceneBehavior = this.constructBehaviorFromRecord(record, null);
    return sceneBehavior as Scene;
  }
  
  public update () {
    Object.keys(this.behaviorsToUpdate || {}).forEach(behaviorKey => this.behaviorsToUpdate[behaviorKey].update());
  }

  public attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    let newBehaviorName = getConstructorName(attach);
    let newBehaviorAssembler = BehaviorProvider.get(newBehaviorName);
    let newBehaviorRecord = new BehaviorManager.BehaviorAssemblerRecord(newBehaviorAssembler, to);
    let activeBehaviorRecord = this.behaviorRecords[to];
    
    if (!activeBehaviorRecord) {
      return; // no behavior to attach to
    }
    
    if (activeBehaviorRecord.inactiveChildren[newBehaviorName] || activeBehaviorRecord.activeChildren[newBehaviorName]) {
      return; // ? this behavior type is already attached
    }
    
    activeBehaviorRecord.inactiveChildren[newBehaviorName] = (newBehaviorRecord);
    this.tryToActivateRecord(activeBehaviorRecord);
    return newBehaviorAssembler;
  }
  
  public getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T, from: string): T {
    let parentBehavior: BehaviorManager.BehaviorAssemblerRecord = this.behaviorRecords[from];
    
    if (!parentBehavior) {
      return null;
    }
    
    let record = parentBehavior.activeChildren[getConstructorName(behavior)] || {};
    return record.behavior;
  }
  
  public findBehavior (id: string): Behavior | undefined {
    return this.behaviorsToUpdate[id];
  }
  
  public getChildrenBehaviors (id: string): Array<Behavior> {
    let parentBehavior: BehaviorManager.BehaviorAssemblerRecord = this.behaviorRecords[id];
    
    if (!parentBehavior) {
      return [];
    }
    
    let activeChildren = parentBehavior.activeChildren || {};
    return Object.keys(activeChildren).map(childKey => {
      return activeChildren[childKey].behavior;
    });
  }
  
  public getParentBehavior (id: string) {
    let childRecord = this.behaviorRecords[id];
    return this.findBehavior((childRecord || {}).parent);
  }
  
  public deactivateBehavior (id: string) {
    let behaviorRecordToDeactivate = this.behaviorRecords[id];
    
    if (!behaviorRecordToDeactivate) {
      return;
    }
  
    let parent = this.behaviorRecords[behaviorRecordToDeactivate.parent];
    // let disableParent = O
    //
    // delete this.behaviorRecords[id];
    // delete this.behaviorsToUpdate[id];
    // delete parent.activeChildren[behaviorRecordToDeactivate.]
    
    
  }
  
  private tryToActivateRecord (record: BehaviorManager.BehaviorAssemblerRecord) {
    let behaviorCreated: boolean = false;
    let inactiveChildren = record.inactiveChildren || {};
    
    Object.keys(inactiveChildren).forEach((behaviorType: string) => {
      let inactiveBehavior = inactiveChildren[behaviorType];
      let dependencies = inactiveBehavior.assembler.getConfig().args;
      let allDependenciesSatisfied = (dependencies || []).every(arg => !!record.activeChildren[arg]);
      
      if (!allDependenciesSatisfied) {
        return;
      }
      
      behaviorCreated = true;
      delete inactiveChildren[behaviorType];
      record.activeChildren[behaviorType] = {
        record: inactiveBehavior,
        behavior: this.constructBehaviorFromRecord(inactiveBehavior, record)
      };
    });
    
    if (behaviorCreated) {
      this.tryToActivateRecord(record);
    }
  }
  
  /**
   * Constructs a new Behavior from a Record and sets it up to respond to Updates
   * @param behaviorRecord
   * @returns {Behavior}
   */
  private constructBehaviorFromRecord (behaviorRecord: BehaviorManager.BehaviorAssemblerRecord, parentRecord: BehaviorManager.BehaviorAssemblerRecord): Behavior {
    let behavior: Behavior;
    let id: string;
    let dependencies = [];
    let config = behaviorRecord.assembler.getConfig();
    
    if (parentRecord) {
      let activeBehaviors = parentRecord.activeChildren || {};
      dependencies = (config.args || []).map(arg => activeBehaviors[arg].behavior);
    }
    
    behavior = new config.clazz(...dependencies);
    //* or alternatively */behavior = new (Function.prototype.bind.apply(config.clazz, dependencies));
    
    id = behavior.getId();
    this.behaviorsToUpdate[id] = behavior;
    this.behaviorRecords[id] = behaviorRecord;
    return behavior;
  }
  
}


/**
 * An internal class that "records" BehaviorAssemblers.
 * Assemblers are objects clients use to configure a new Behavior before it is constructed. When a client attaches
 * an Assembler to an existing Behavior the Assembler is recorded (registered) in the BehaviorManager. When all
 * the Recorded BehaviorAssembler's dependencies have been met and it is ready to be constructed, the Manager uses
 * the BehaviorAssemblerRecord to create a new Behavior class.
 */
export namespace BehaviorManager {
  export class BehaviorAssemblerRecord {
    assembler: BehaviorAssembler;
    inactiveChildren: any = {};
    activeChildren: any = {};
    parent: string;
  
    /**
     * @param assembler - Assembler to record
     */
    constructor (assembler: BehaviorAssembler, parentId: string) {
      this.assembler = assembler;
      this.parent = parentId;
    }
  }
}
