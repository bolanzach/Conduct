import {Service} from "../service/service";

export interface Metronome extends Service {
  start (fps: number);
  registerToTicks (callback: Function): string
  unregisterToTicks (callback: string);
}