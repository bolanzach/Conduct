export class EngineConfig {
  
  private renderContext: string;
  private canvasId: string;
  private networkModel: string;
  
  /**
   * Probably don't wanna call this directly - use the Builder
   * @param {string} renderContext
   * @param {string} canvasId
   * @param {string} networkModel
   */
  public constructor (renderContext: string,
                      canvasId: string,
                      networkModel: string) {
    
    this.renderContext = renderContext;
    this.canvasId = canvasId;
    this.networkModel = networkModel;
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
    
    constructor (renderContext: string) {
      this.renderContext = renderContext === '3d' ? renderContext : '2d';
    }
    
    public build (): EngineConfig {
      return new EngineConfig(
        this.renderContext,
        this.canvasId,
        this.networkModel);
    }
    
    public setCanvasId (id: string) {
      this.canvasId = id;
      return this;
    }
    
    public setNetworkModel (clientOrServer: string) {
      this.networkModel = clientOrServer === 'server' ? clientOrServer : 'client';
      return this;
    }
    
  };
  
}