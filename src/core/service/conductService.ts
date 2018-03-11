import {ServiceProvider} from "../injection/provider/serviceProvider";
import {UtilsService} from "../util/utilsService";
import {Service} from "./service";

export abstract class ConductService implements Service {
  
  private id: string;
  
  constructor () {
    let result = /^function\s+([\w\$]+)\s*\(/.exec(this.constructor.toString());
    let behaviorType = result && result[1] || 'B';
    
    if (this instanceof UtilsService) {
      this.id = this.generateId(behaviorType);
    } else {
      this.id = ServiceProvider.get(UtilsService).generateId(behaviorType);
    }
  }
  
  getId (): string {
    return this.id;
  }
}