import {ServiceProvider} from "../injection/provider/serviceProvider";
import {UtilsService} from "../util/utilsService";
import {Service} from "./service";

export abstract class ConductService implements Service {
  
  private id: string;
  
  protected static utils: UtilsService;
  
  constructor () {
    if (this instanceof UtilsService) {
      ConductService.utils = this;
      this.id = this.generateServiceId(this);
    } else {
      ConductService.utils = ServiceProvider.get(UtilsService);
      this.id = ConductService.utils.generateServiceId(this);
    }
  }
  
  getId (): string {
    return this.id;
  }
}