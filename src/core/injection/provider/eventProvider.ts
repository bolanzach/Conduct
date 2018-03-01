export class EventProvider {
  
  private static registeredEvents = {};
  
  static registerEvent (target: string, methodKey: string, priority: number = 500) {
    let events: Array<any> = EventProvider.registeredEvents[target] || [];
    let newEvent = {
      event: methodKey,
      target: target,
      priority: priority
    };
    
    events.push(newEvent);
    EventProvider.registeredEvents[target] = events;
  }
  
  static getRegisteredEvents (target: string): Array<any> {
    return EventProvider.registeredEvents[target] || [];
  }
}