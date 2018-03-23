/**
 * Represents a class registered as a ConductBehavior.
 * This is a record the ConductBehavior's name, constructor, dependencies, etc
 */
export class BehaviorRecord {
  
  private _name: string;
  private _clazz: any;
  private _args: Array<string>;
  private _requiredChildren: Array<string>;
  
  constructor (name: string,
               clazz: any,
               args: Array<string>,
               requiredChildren: Array<string>) {
    
    this._name = name;
    this._clazz = clazz;
    this._args = args;
    this._requiredChildren = requiredChildren
  }
  
  get name(): string {
    return this._name;
  }
  
  get clazz(): any {
    return this._clazz;
  }
  
  get args(): Array<string> {
    return this._args;
  }
  
  get requiredChildren(): Array<string> {
    return this._requiredChildren;
  }
}
