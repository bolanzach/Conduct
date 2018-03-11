import {EventProvider} from "../injection/provider/eventProvider";

export class ConductEvent {
  
  private _eventName: string;
  private _isCancelled: boolean;
  
  constructor (eventName: string) {
    this._eventName = eventName;
  }
  
  get eventName() {
    return this._eventName;
  }
  
  /**
   * Cancels this event. No other callbacks will be invoked after this is called
   */
  cancel (): void {
    this._isCancelled = true;
  }
  
  isCancelled (): boolean {
    return this._isCancelled;
  }
  
  /**
   * Emit this event
   */
  send (): void {
    if (this.eventName.length > 0 ) {
      EventProvider.sendEvent(this);
    }
  }
}