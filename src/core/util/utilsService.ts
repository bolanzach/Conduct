import {RegisterService} from "../injection/metaDecorators";
import {ConductService} from "../service/conductService";

@RegisterService()
export class UtilsService extends ConductService {
  private idCount: number = 0;
  
  constructor () {
    super();
  }
  
  public generateId (prefix?: string): string {
    if (this.idCount === Number.MAX_VALUE) {
      this.idCount = 0;
    }
    return (prefix || 'e') + '.' + (this.idCount++) + '.' + new Date().getTime();
  }
  
  /**
   * Iterates each key of the object, invoking the callback with the object's value and property
   * each time
   * @param obj f{Object} object to iterate
   * @param cb {Function} invoked for each property with the key's value and the key itself
   */
  public forEach (obj: Object, cb: Function) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        cb(obj[key], key);
      }
    }
  }
  
  
}