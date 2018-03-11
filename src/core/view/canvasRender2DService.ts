import {RegisterService} from "../injection/metaDecorators";
import {RenderService} from "./renderService";
import {ConductService} from "../service/conductService";

@RegisterService()
export class CanvasRender2DService extends ConductService implements RenderService {
  
  private ctx: CanvasRenderingContext2D;
  
  
  public setCanvas (id: string) {
    let canvas : any = document.getElementById(id);
    this.ctx = canvas.getContext('2d');
  }
  
  public getCanvasContext (): CanvasRenderingContext2D {
    return this.ctx;
  }
  
  
  
  
  
  
}