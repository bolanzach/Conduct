import {Service} from "../service/service";
import {RegisterService} from "../injection/metaDecorators";
import {Metronome} from "./metronome";
import {Engine} from "../engine";
import {ClientMetronome} from "./clientMetronome";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {ServerMetronome} from "./serverMetronome";

@RegisterService()
export class MetronomeProvider implements Service, Metronome {
  
  private metronome: Metronome;
  
  constructor () {
    console.log(Engine);
    let service: any = Engine.config().isClient() ? ClientMetronome : ServerMetronome;
    this.metronome = ServiceProvider.get(service);
  }
  
  start(fps: number) {
  
  }
  
  registerToTicks(callback: Function): string {
    return undefined;
  }
  
  unregisterToTicks(callback: string) {
  }
  
}