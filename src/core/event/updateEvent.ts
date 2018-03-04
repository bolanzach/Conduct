import {ConductEvent} from "./conductEvent";

export class UpdateEvent extends ConductEvent {
  constructor () {
    super('update');
  }
}