import {ServiceProvider} from "./services/serviceProvider";
import {BehaviorProvider} from "./behaviors/behaviorProvider";

let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
let ARGUMENT_NAMES = /([^\s,]+)/g;

export function RegisterService (alias?: string) {
  return function (constructor: Function) {
    let serviceName: string = getConstructorName(constructor);
    let args = getConstructorArgs(constructor);
    new ServiceProvider().inject(serviceName, args, constructor);
  }
}

export function RegisterBehavior (config?: any) {
  return function (constructor: Function) {
    let behaviorName: string = getConstructorName(constructor);
    let args = getConstructorArgs(constructor);
    new BehaviorProvider().inject(behaviorName, args, constructor);
  }
}

export function getConstructorArgs (service: Function): Array<string> {
  let serviceStr = service.toString().replace(STRIP_COMMENTS, '');
  let result = serviceStr.slice(serviceStr.indexOf('(')+1, serviceStr.indexOf(')')).match(ARGUMENT_NAMES);
  return result ? result : [];
}

export function getConstructorName (constructor: Function): string {
  let result = /^function\s+([\w\$]+)\s*\(/.exec(constructor.toString());
  return result ? result[1] : null;
}