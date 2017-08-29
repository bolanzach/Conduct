
import {Engine} from "../kore/engine";

export class UtilsService {
  
  /**
   * Iterates each key of the object, invoking the callback with the object's value and property
   * each time
   * @param obj f{Object} object to iterate
   * @param cb {Function} invoked for each property with the key's value and the key itself
   */
  public static forEach (obj: Object, cb: Function) {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        cb(obj[prop], prop);
      }
    }
  }
  
  
}

Engine.registerService({
  use: UtilsService
});