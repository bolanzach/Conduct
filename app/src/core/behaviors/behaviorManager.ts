import {Behavior} from "./behavior";
import {BehaviorAssembler} from "./behaviorAssembler";
import {BehaviorProvider} from "./behaviorProvider";
import {getConstructorName} from "../metaDecorators";
import {SceneBehavior} from "./sceneBehavior";

export class BehaviorManager {

  private behaviorsToUpdate: any = {};
  private behaviorRecords: any = {};
  
  constructor () {
  
  }
  
  public initScene (): SceneBehavior {
    let stageBehaviorAssembler: BehaviorAssembler = new BehaviorProvider().get('SceneBehavior');
    let record: BehaviorManager.BehaviorAssemblerRecord = new BehaviorManager.BehaviorAssemblerRecord(stageBehaviorAssembler);
    let sceneBehavior = this.constructBehaviorFromRecord(record, null);
    return sceneBehavior as SceneBehavior;
  }

  public attachBehaviorToBehavior <T extends Behavior>(attach: new (...args: any[]) => T, to: string) {
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
  }
  
  public update () {
  
  }
  
  private tryToActivateRecord (record: BehaviorManager.BehaviorAssemblerRecord) {
    let inactiveChildren = record.inactiveChildren || {};
    Object.keys(inactiveChildren).forEach((behaviorType: string) => {
      let inactiveBehavior = inactiveChildren[behaviorType];
      let dependencies = inactiveBehavior.assembler.config.args;
      let allDependenciesSatisfied = (dependencies || []).every(arg => !!record.activeChildren[arg]);
      
      if (allDependenciesSatisfied || !dependencies.length) {
        delete inactiveChildren[behaviorType];
        record.activeChildren[behaviorType] = {
          record: inactiveBehavior,
          behavior: this.constructBehaviorFromRecord(inactiveBehavior, record)
        };
      }
    });
  }
  
  /**
   * Constructs a new Behavior from a Record and sets it up to respond to Updates
   * @param behaviorRecord
   * @returns {Behavior}
   */
  private constructBehaviorFromRecord (behaviorRecord: BehaviorManager.BehaviorAssemblerRecord, parentRecord: BehaviorManager.BehaviorAssemblerRecord): Behavior {
    let config = behaviorRecord.assembler.config;
    let behavior: Behavior = new (Function.bind.apply(config.clazz, config.dependencies));
    let id = behavior.getId();
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
