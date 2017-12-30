import {RegisterService} from "../injection/metaDecorators";
import {RenderService} from "./renderService";

@RegisterService()
export class CanvasRender2DService implements RenderService {
  
  private ctx: CanvasRenderingContext2D;
  
  
  public setCanvas (id: string) {
    let canvas : any = document.getElementById(id);
    this.ctx = canvas.getContext('2d');
    this.ctx.fillStyle = '#FF0000';
    this.ctx.fillRect(0,0,150,75);
  }
  
  
  
  
  
  
}