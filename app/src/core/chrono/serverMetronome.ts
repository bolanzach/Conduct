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
    this.maxFPS = 60;
  }
  
  start(fps: number) {
    if (this.isRunning) {
      return;
    }
  
    fps = (fps > this.maxFPS) ? this.maxFPS : fps;
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
    let now = Date.now();
    this.delta += now - this.lastFrameTimeMs;
    
    if (this.lastFrameTimeMs + this.timeStep < now) {
      this.lastFrameTimeMs = now;
      this.tick(this.delta);
    }
    
    setImmediate(this.mainLoop);
  };
  
  private tick (delta: number) {
    console.log('ticcck');
    (this.listeners || []).forEach((cb) => cb(delta));
  }
  
}