import {ServiceProvider} from "../injection/provider/serviceProvider";
import {EventService} from "./eventService";

export class ConductEvent {
  
  private static eventService: EventService;
  private _eventName;
  
  constructor (eventName: string) {
    ConductEvent.eventService = ServiceProvider.get(EventService);
    this._eventName = eventName;
  }
  
  get eventName() {
    return this._eventName;
  }
  
  send (): void {
    ConductEvent.eventService.sendEvent(this);
  }
}