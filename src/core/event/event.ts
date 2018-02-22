import {Behavior} from "../behavior/behavior";

export class Event {
  
  private NATIVE_EVENTS = {
    UPDATE: 'update'
  };
  
  private registeredEvents: any = {};
  
  constructor () {
  
  }
  
  onUpdate (behavior: Behavior, callback: () => {}): string {
    let id = behavior.getId();
    let handlers: Array<any> = this.registeredEvents[this.NATIVE_EVENTS.UPDATE] || {};
    
    handlers[id] = { handler: callback };
    this.registeredEvents[this.NATIVE_EVENTS.UPDATE] = handlers;
    return id;
  }
}