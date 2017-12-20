import {RegisterService} from "../injection/metaDecorators";
import {Service} from "../service/service";

@RegisterService()
export class UtilsService implements Service {
  private idCount: number = 0;
  
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
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cb(obj[prop], prop);
      }
    }
  }
  
  
}