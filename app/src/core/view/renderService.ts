import {Service} from "../service/service";

export interface RenderService extends Service {
  setCanvas (htmlCanvasId: string);
}