import {RegisterService} from "../injection/metaDecorators";
import {ConductService} from "../service/conductService";
import {ConductBehavior} from "../behavior/conductBehavior";
import {Service} from "../service/service";

@RegisterService()
export class UtilsService extends ConductService {
  
  constructor () {
    super();
  }
  
  generateBehaviorId (behavior: ConductBehavior, parentId: string): string {
    return `${parentId}-${behavior.constructor.name}`;
  }
  
  generateServiceId (service: Service): string {
    return service.constructor.name;
  }
  
  /**
   * Iterates each key of the object, invoking the callback with the object's value and property
   * each time
   * @param obj f{Object} object to iterate
   * @param cb {Function} invoked for each property with the key's value and the key itself
   */
  public forEach (obj: Object, cb: (value, key?) => void) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cb(obj[key], key);
      }
    }
  }
  
  
}