import {RegisterService} from "../injection/metaDecorators";
import {RenderService} from "./renderService";

@RegisterService()
export class CanvasRender2DService implements RenderService {
  
  private ctx: CanvasRenderingContext2D;
  
  
  public setCanvas (id: string) {
    let canvas : any = document.getElementById(id);
    this.ctx = canvas.getContext('2d');
  }
  
  public getCanvasContext (): CanvasRenderingContext2D {
    return this.ctx;
  }
  
  
  
  
  
  
}