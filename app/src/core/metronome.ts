
export class Metronome {
  
  private isRunning: boolean = false;
  private listeners: Array<Function> = [];
  private lastFrameTimeMs: number;
  private maxFPS: number;
  
  constructor () {
    this.lastFrameTimeMs = 0;
    this.maxFPS = 1;
  }
  
  public start () {
    if (this.isRunning) {
      return;
    }
    
    requestAnimationFrame(this.mainLoop);
    this.isRunning = true;
  }
  
  public registerToTicks (callback: Function): string {
    this.listeners.push(callback);
    return callback.toString();
  }
  
  public unregisterToTicks (callback) {
    this.listeners = this.listeners.filter((cb) => cb.toString() !== callback.toString());
  }
  
  private mainLoop = (timestamp) => {
    if (timestamp < this.lastFrameTimeMs + (1000 / this.maxFPS)) {
      requestAnimationFrame(this.mainLoop);
      return;
    }
    
    this.lastFrameTimeMs = timestamp;
    this.listeners.forEach((cb) => cb());
    requestAnimationFrame(this.mainLoop);
  };
}