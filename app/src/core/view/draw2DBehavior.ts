import {Transform} from "../behaviors/transform";
import {Behavior} from "../behavior/behavior";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {CanvasRender2DService} from "./canvasRender2DService";

export class Draw2DBehavior extends Behavior {
  
  private parentTransform: Transform;
  private renderService: CanvasRender2DService = ServiceProvider.get(CanvasRender2DService);
  
  constructor (transform: Transform) {
    super();
    this.parentTransform = transform;
  }
  
  update() {
  
  }
  
}