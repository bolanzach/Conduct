import {ServiceProvider} from "../injection/provider/serviceProvider";
import {EventService} from "./eventService";

export class ConductEvent {
  
  private static eventService: EventService;
  private _eventName: string;
  
  constructor (eventName: string) {
    ConductEvent.eventService = ServiceProvider.get(EventService);
    this._eventName = eventName;
  }
  
  get eventName() {
    return this._eventName;
  }
  
  send (): void {
    if (this.eventName.length > 0 ) {
      ConductEvent.eventService.sendEvent(this);
    }
  }
}