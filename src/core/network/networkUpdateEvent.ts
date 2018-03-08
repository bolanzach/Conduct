import {ConductEvent} from "../event/conductEvent";

export class NetworkUpdateEvent extends ConductEvent {
  constructor () {
    super('networkUpdateEvent');
  }
}