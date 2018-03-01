import {ServiceProvider} from "./provider/serviceProvider";
import {BehaviorProvider} from "./provider/behaviorProvider";
import {EventProvider} from "./provider/eventProvider";

let STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
let ARGUMENT_NAMES = /([^\s,]+)/g;

export function RegisterService (alias?: string) {
  return function (constructor: Function) {
    let serviceName: string = getConstructorName(constructor);
    new ServiceProvider().inject(serviceName, getConstructorArgs(constructor), constructor);
  };
}

export function RegisterBehavior (config?: any) {
  return function (constructor: Function) {
    let behaviorName: string = getConstructorName(constructor);
    BehaviorProvider.inject(behaviorName, getConstructorArgs(constructor), constructor);
  };
}

export function RegisterEvent (priority?: number) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    EventProvider.registerEvent(getConstructorName(target.constructor), propertyKey, priority);
  };
}

export function RequiredChild (constructor: any, requiredBehavior: string) {
  BehaviorProvider.addRequiredChildBehavior(getConstructorName(constructor.constructor), requiredBehavior);
}

export function getConstructorName (constructor: Function): string {
  let result = /^function\s+([\w\$]+)\s*\(/.exec(constructor.toString());
  return result && result.length ? result[1].toUpperCase() : null;
}

export function getConstructorArgs (service: Function): Array<string> {
  let serviceStr = service.toString().replace(STRIP_COMMENTS, '');
  let result = serviceStr.slice(serviceStr.indexOf('(')+1, serviceStr.indexOf(')')).match(ARGUMENT_NAMES);
  return result ? result.map(arg => arg.toUpperCase()) : [];
}