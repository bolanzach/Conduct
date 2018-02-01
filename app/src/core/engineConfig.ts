export class EngineConfig {
  
  private renderContext: string;
  private canvasId: string;
  private networkModel: string;
  private fps: number;
  
  /**
   * Probably don't wanna call this directly - use the Builder
   * @param {string} renderContext
   * @param {string} canvasId
   * @param {string} networkModel
   */
  public constructor (renderContext: string,
                      canvasId: string,
                      networkModel: string,
                      fps: number) {
    
    this.renderContext = renderContext;
    this.canvasId = canvasId;
    this.networkModel = networkModel;
    this.fps = fps;
  }
  
  public getContext (): string {
    return this.renderContext;
  }
  
  public getCanvasId (): string {
    return this.canvasId;
  }
  
  public getNetworkModel (): string {
    return this.networkModel;
  }
  
  public getFps (): number {
    return this.fps;
  }
  
  public isClient () {
    return this.networkModel === 'client';
  }
  
  public isServer () {
    return this.networkModel === 'server';
  }
  
  
  /**
   * Static Builder class
   * The constructor contains required params and the other functions allow the user to create a custom config.
   */
  public static Builder = class {
    private renderContext: string = '2d';
    private canvasId: string = 'scene';
    private networkModel: string = 'client';
    private fps: number = 60;
    
    constructor (renderContext: string) {
      this.renderContext = renderContext === '3d' ? renderContext : '2d';
    }
    
    public build (): EngineConfig {
      return new EngineConfig(
        this.renderContext,
        this.canvasId,
        this.networkModel,
        this.fps);
    }
    
    public setCanvasId (id: string) {
      this.canvasId = id;
      return this;
    }
    
    public setNetworkModel (clientOrServer: string) {
      this.networkModel = clientOrServer === 'server' ? clientOrServer : 'client';
      return this;
    }
    
    public setFramesPerSecond (fps: number) {
      this.fps = fps;
      return this;
    }
    
  };
  
}