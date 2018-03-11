import {Metronome} from "../../core/chrono/metronome";
import {RegisterService} from "../../core/injection/metaDecorators";
import {ConductService} from "../../core/service/conductService";

@RegisterService()
export class ClientMetronome extends ConductService implements Metronome {
  
  private isRunning: boolean = false;
  private listeners: Array<Function> = [];
  private lastFrameTimeMs: number;
  private delta: number;
  private timeStep: number;
  private maxFPS: number;
  
  constructor () {
    super();
    this.lastFrameTimeMs = 0;
    this.delta = 0;
    this.maxFPS = 60;
  }
  
  public start (fps: number) {
    if (this.isRunning) {
      return;
    }
    
    this.timeStep = 1000 / fps;
    this.isRunning = true;
    requestAnimationFrame(this.mainLoop);
  }
  
  public registerToTicks (callback: Function): string {
    this.listeners.push(callback);
    return callback.toString();
  }
  
  public unregisterToTicks (callback) {
    this.listeners = this.listeners.filter((cb) => cb.toString() !== callback.toString());
  }
  
  private mainLoop = (timestamp) => {
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;
    
    while (this.delta >= this.timeStep) {
      this.tick(this.timeStep);
      this.delta -= this.timeStep;
    }
    
    // this.tick(this.delta);
    // draw() ?
    requestAnimationFrame(this.mainLoop);
  };
  
  private tick (delta: number) {
    (this.listeners || []).forEach((cb) => cb(delta));
  }
}