import {ServiceProvider} from "./services/serviceProvider";
import {BehaviorProvider} from "./behaviors/behaviorProvider";

export function RegisterService (alias?: string) {
  return function (constructor: Function) {
    let serviceName: string = getConstructorName(constructor);
    new ServiceProvider().inject(serviceName, [], constructor);
  };
}

export function RegisterBehavior (config?: any) {
  return function (constructor: Function) {
    let behaviorName: string = getConstructorName(constructor);
    BehaviorProvider.inject(behaviorName, [], constructor);
  };
}

export function Inject <T>(injectable: new (...args: any[]) => T) {
  return function (target: Function, propertyKey: string | symbol, paramIndex: number) {
    BehaviorProvider.addInjectionRequirement(getConstructorName(target), getConstructorName(injectable), paramIndex);
  };
}

export function RequireBehavior () {
  return function (constructor: any, requiredBehavior: string) {
    BehaviorProvider.addRequireChildBehavior(getConstructorName(constructor.constructor), requiredBehavior);
  };
}

export function getConstructorName (constructor: Function): string {
  let result = /^function\s+([\w\$]+)\s*\(/.exec(constructor.toString());
  return result ? result[1] : null;
}