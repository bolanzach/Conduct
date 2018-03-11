import {RegisterService} from "../injection/metaDecorators";
import {Metronome} from "./metronome";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {ConductService} from "../service/conductService";

/**
 * Proxy Service for the Metronome. Supports timing for either a client or server Metronome
 */
@RegisterService()
export class MetronomeService extends ConductService implements Metronome {
  
  private metronome: Metronome;
  
  constructor () {
    super();
    
    let classLoader: any;
    if (process.env.CLIENT) {
      classLoader = require('../../client/chrono/clientMetronome').ClientMetronome;
    } else {
      classLoader = require('../../server/chrono/serverMetronome').ServerMetronome;
    }
    this.metronome = ServiceProvider.get(classLoader);
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