import {EventRecord} from "./eventRecord";
import {ConductEvent} from "./conductEvent";
import {RegisterService} from "../injection/metaDecorators";

@RegisterService()
export class EventService {
  
  private static registeredEvents = {};
  
  private static sortPriorities (a: EventRecord, b: EventRecord) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  private static createEventRecord (targetComponent: any, key: string, priority: number) {
    let id = targetComponent.getId && targetComponent.getId();
    return (id && targetComponent[key]) ? new EventRecord(id, targetComponent, key, priority) : null;
  }
  
  static registerEvent (event: string, targetComponent: any, priority: number) {
    let events: Array<EventRecord> = EventService.registeredEvents[event] || [];
    let record = this.createEventRecord(targetComponent, event, priority);
    
    if (!record) {
      return;
    }
    
    events.push(record);
    events.sort(this.sortPriorities);
    EventService.registeredEvents[event] = events;
  }
  
  deregisterAll (id: string) {
  
  }
  
  deregisterEvent () {
  
  }
  
  sendEvent (event: ConductEvent) {
    let events: Array<EventRecord> = EventService.registeredEvents[event.eventName] || [];
    events.forEach((record: EventRecord) => {
      let component = record.targetComponent;
      let handler: string = record.key;
      if (component[handler]) {
        component[handler](event);
      }
    });
  }
  
}