import {ConductEvent} from "./conductEvent";

export class UpdateEvent extends ConductEvent {
  
  private _delta: number;
  
  constructor (delta: number) {
    super('update');
    this._delta = delta
  }
  
  get delta (): number {
    return this._delta;
  }
}