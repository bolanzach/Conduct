import {EventRecord} from "../../event/eventRecord";
import {ConductEvent} from "../../event/conductEvent";

/**
 * Provides functionality for registering and sending ConductEvents
 * While ideally this would be an injectable service, the event system is coupled to the engine itself and
 * makes it very difficult to adhere to the normal structure. However, this should be okay because it should
 * be rare that this service is interacted with directly.
 */
export class EventProvider {
  
  // Map of events registered using @RegisterEvent. The key is the Behavior or Service name
  private static registeredEvents = {};
  
  // Map of classes that have events and callbacks attached to them. The key is an event name
  private static recordedEvents = {};
  
  /**
   * Registers an event when a class is loader - typically via @RegisterEvent
   * @param {string} target
   * @param {string} methodKey
   * @param {number} priority
   */
  static registerEvent (target: string, methodKey: string, priority: number = 500) {
    let events: Array<any> = EventProvider.registeredEvents[target] || [];
    let newEvent = {
      name: methodKey,
      target: target,
      priority: priority
    };
    
    events.push(newEvent);
    EventProvider.registeredEvents[target] = events;
  }
  
  /**
   * Returns an array of metadata that describes which events the provided target is registered to and what
   * callback methods should be invoked for each event
   * @param {string} target
   * @returns {Array<any>}
   */
  static getRegisteredEventsMetadata (target: string): Array<any> {
    return EventProvider.registeredEvents[target] || [];
  }
  
  /**
   * Registers the methods for an initialized Behavior or Component
   */
  static registerComponent (event: any, targetComponent: any) {
    let eventName: string = event.name;
    let records: Array<EventRecord> = EventProvider.recordedEvents[eventName] || [];
    let record = this.createEventRecord(targetComponent, eventName, event.priority);
    
    if (!record) {
      return;
    }
    
    records.push(record);
    records.sort(this.sortPriorities);
    EventProvider.recordedEvents[eventName] = records;
  }
  
  /**
   * Emits a ConductEvent. All Behaviors and Services that are registered will have their callback function
   * invoked and be provided the triggering ConductEvent.
   * @param {ConductEvent} event
   */
  static sendEvent (event: ConductEvent) {
    let events: Array<EventRecord> = EventProvider.recordedEvents[event.eventName] || [];
    events.forEach((record: EventRecord) => {
      if (event.isCancelled()) {
        return;
      }
      
      let component = record.targetComponent;
      let handler: string = record.key;
      if (component[handler]) {
        component[handler](event);
      }
    });
  }
  
  private static sortPriorities (a: EventRecord, b: EventRecord) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
    return 0;
  }
  
  private static createEventRecord (targetComponent: any, key: string, priority: number) {
    let id = targetComponent.getId && targetComponent.getId();
    return (id && targetComponent[key]) ? new EventRecord(id, targetComponent, key, priority) : null;
  }
  
}