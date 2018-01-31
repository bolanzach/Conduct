import {Metronome} from "./metronome";

export class ServerMetronome implements Metronome {
  
  start(fps: number) {
  
  }
  
  registerToTicks(callback: Function): string {
    return undefined;
  }
  
  unregisterToTicks(callback: string) {
  }
  
}