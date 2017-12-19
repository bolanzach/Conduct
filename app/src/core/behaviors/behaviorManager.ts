import {Behavior} from "./behavior";
import {BehaviorAssembler} from "./behaviorAssembler";
import {BehaviorProvider} from "./behaviorProvider";
import {getConstructorName} from "../metaDecorators";
import {Scene} from "./scene";

export class BehaviorManager {

  private behaviorsToUpdate: any = {};
  private behaviorRecords: any = {};
  
  constructor () {
  
  }
  
  public initScene (): Scene {
    let stageBehaviorAssembler: BehaviorAssembler = new BehaviorProvider().get('Scene');
    let record: BehaviorManager.BehaviorAssemblerRecord = new BehaviorManager.BehaviorAssemblerRecord(stageBehaviorAssembler);
    let sceneBehavior = this.constructBehaviorFromRecord(record, null);
    return sceneBehavior as Scene;
  }
  
  public update () {
    Object.keys(this.behaviorsToUpdate || {}).forEach(behaviorKey => this.behaviorsToUpdate[behaviorKey].update());
  }

  public attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string): BehaviorAssembler {
    let newBehaviorName = getConstructorName(attach);
    let newBehaviorAssembler = new BehaviorProvider().get(newBehaviorName);
    let newBehaviorRecord = new BehaviorManager.BehaviorAssemblerRecord(newBehaviorAssembler);
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
  
  private tryToActivateRecord (record: BehaviorManager.BehaviorAssemblerRecord) {
    let inactiveChildren = record.inactiveChildren || {};
    Object.keys(inactiveChildren).forEach((behaviorType: string) => {
      let inactiveBehavior = inactiveChildren[behaviorType];
      let dependencies = inactiveBehavior.assembler.getConfig().args;
      let allDependenciesSatisfied = (dependencies || []).every(arg => !!record.activeChildren[arg]);
      
      if (!allDependenciesSatisfied) {
        return;
      }
      
      delete inactiveChildren[behaviorType];
      record.activeChildren[behaviorType] = {
        record: inactiveBehavior,
        behavior: this.constructBehaviorFromRecord(inactiveBehavior, record)
      };
    });
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
      dependencies = (config.args || []).map(arg => activeBehaviors[arg] || activeBehaviors[arg].behavior);
    }
    
    behavior = new (Function.bind.apply(config.clazz, dependencies));
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
  
    /**
     * @param assembler - Assembler to record
     */
    constructor (assembler: BehaviorAssembler) {
      this.assembler = assembler;
    }
  }
}
