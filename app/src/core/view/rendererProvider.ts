import {ServiceProvider} from "../injection/provider/serviceProvider";
import {RenderService} from "./renderService";
import {CanvasRender2DService} from "./canvasRender2DService";

export class RendererProvider {
  
  private renderService: RenderService;
  private renderers = {
    '2d': CanvasRender2DService
  };
  
  public get (): RenderService {
    if (this.renderService) {
      return this.renderService;
    }
  }
  
  public setRenderer (context: string) {
    let rendererToUse = this.renderers[context];
    this.renderService = ServiceProvider.get(rendererToUse);
  }
}