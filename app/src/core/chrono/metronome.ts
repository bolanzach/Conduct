export interface Metronome {
  start (fps: number);
  registerToTicks (callback: Function): string
  unregisterToTicks (callback: string);
}