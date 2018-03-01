export class EventRecord {
  
  private _id: string;
  private _targetComponent: any;
  private _key: string;
  private _priority: number;
  
  constructor(id: string, targetComponent: any, key: string, priority: number) {
    this._id = id;
    this._targetComponent = targetComponent;
    this._key = key;
    this._priority = priority
  }
  
  get id(): string {
    return this._id;
  }
  
  get targetComponent(): any {
    return this._targetComponent;
  }
  
  get key(): string {
    return this._key;
  }
  
  get priority(): number {
    return this._priority;
  }
}