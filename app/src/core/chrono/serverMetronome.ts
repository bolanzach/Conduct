import {Metronome} from "./metronome";

export class ServerMetronome implements Metronome {
  
  private isRunning: boolean = false;
  private listeners: Array<Function> = [];
  private lastFrameTimeMs: number;
  private delta: number;
  private timeStep: number;
  private maxFPS: number;
  
  constructor () {
    this.lastFrameTimeMs = 0;
    this.delta = 0;
    this.maxFPS = 1;
  }
  
  start(fps: number) {
    if (this.isRunning) {
      return;
    }
  
    this.timeStep = 1000 / fps;
    this.isRunning = true;
    setImmediate(this.mainLoop);
  }
  
  public registerToTicks (callback: Function): string {
    this.listeners.push(callback);
    return callback.toString();
  }
  
  public unregisterToTicks (callback) {
    this.listeners = this.listeners.filter((cb) => cb.toString() !== callback.toString());
  }
  
  private mainLoop = () => {
    let timestamp = new Date().getTime();
    this.delta += timestamp - this.lastFrameTimeMs;
    this.lastFrameTimeMs = timestamp;

    console.log(this.delta, ' --- ', this.timeStep);
    while (this.delta >= this.timeStep) {
      this.tick(this.timeStep);
      this.delta -= this.timeStep;
    }

    // this.tick(this.delta);
    // draw() ?
    setImmediate(this.mainLoop);
  };
  
  private tick (delta: number) {
    console.log('ticcck');
    (this.listeners || []).forEach((cb) => cb(delta));
  }
  
}