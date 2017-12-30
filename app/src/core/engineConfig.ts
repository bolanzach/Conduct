export class EngineConfig {
  
  private renderContext: string = '2d';
  private canvasId: string = 'scene';
  
  public constructor () {
  
  }
  
  public setRenderContext (context: string) {
    if (context === '2d' || context === '3d') {
      this.renderContext = context;
    }
  }
  
  public getContext (): string {
    return this.renderContext;
  }
  
  public getCanvasId (): string {
    return this.canvasId;
  }
}