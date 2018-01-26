import {BehaviorRecord} from "./provider/behaviorRecord";

/**
 * An internal class that is managed by the BehaviorManager. Every Behavior that has been added to the game, whether
 * it is currently active or not, is backed by a BehaviorAssembler.
 */
export class BehaviorAssembler {
  private _record: BehaviorRecord;
  private _inactiveChildren: any = {};
  private _activeChildren: any = {};
  private _childrenAssemblerConfigs = {};
  private _parent: string;
  private _name: string;
  
  constructor (record: BehaviorRecord, parentId: string) {
    this._record = record;
    this._parent = parentId;
    this._name = record.name;
  }
  
  get record(): BehaviorRecord {
    return this._record;
  }
  
  get inactiveChildren(): any {
    return this._inactiveChildren;
  }
  
  get activeChildren(): any {
    return this._activeChildren;
  }
  
  get childrenAssemblerConfigs(): {} {
    return this._childrenAssemblerConfigs;
  }
  
  get parent(): string {
    return this._parent;
  }
  
  get name(): string {
    return this._name;
  }
}