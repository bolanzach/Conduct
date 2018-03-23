import {Transform} from "../behaviors/transform";
import {ConductBehavior} from "../behavior/conductBehavior";
import {ServiceProvider} from "../injection/provider/serviceProvider";
import {CanvasRender2DService} from "./canvasRender2DService";
import {RegisterBehavior} from "../injection/metaDecorators";

@RegisterBehavior()
export class Draw2DBehavior extends ConductBehavior {
  
  private parentTransform: Transform;
  private renderService: CanvasRender2DService = ServiceProvider.get(CanvasRender2DService);
  
  constructor (props, transform: Transform) {
    super(props);
    this.parentTransform = transform;
  }
  
  update() {
  
  }
  
}