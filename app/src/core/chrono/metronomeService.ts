import {RegisterService} from "../injection/metaDecorators";
import {Metronome} from "./metronome";
import {Engine} from "../engine";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {ClientMetronome} from "./clientMetronome";
import {ServerMetronome} from "./serverMetronome";

/**
 * Proxy Service for the Metronome. Supports timing for either a client or server Metronome
 */
@RegisterService()
export class MetronomeService implements Metronome {
  
  private metronome: Metronome;
  
  constructor () {
    let service: any = Engine.config().isClient() ? ClientMetronome : ServerMetronome;
    this.metronome = ServiceProvider.get(service);
  }
  
  start(fps: number) {
    this.metronome.start(fps);
  }
  
  registerToTicks(callback: Function): string {
    return this.metronome.registerToTicks(callback);
  }
  
  unregisterToTicks(callback: string) {
    this.metronome.unregisterToTicks(callback);
  }
  
}