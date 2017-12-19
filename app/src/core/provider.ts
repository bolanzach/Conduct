import {getConstructorName} from "./metaDecorators";

export class Provider {
  
  private static registered: any = {};  // Registered but not all dependencies resolved
  private static injected: any = {};    // Registered and all dependencies resolved
  
  /**
   *
   * @param injectableName
   * @param args
   * @param constructor
   */
  public inject (injectableName: string, args: Array<string>, constructor: any) {
    if (Provider.registered[injectableName] || Provider.injected[injectableName]) {
      return;
    }
    
    if (this.canInject(args)) {
      this.doInject(constructor, args, injectableName);
      
      Object.keys(Provider.registered).forEach(registeredDependency => {
        let injectionParams = Provider.registered[registeredDependency];
        if (this.canInject(injectionParams.args)) {
          this.doInject(injectionParams.constructor, injectionParams.args, injectionParams.name);
        }
      });
    } else {
      Provider.registered[injectableName] = { constructor: constructor, name: injectableName, args: args };
    }
    
  }
  
  /**
   *
   * @param injectable
   * @returns {any}
   */
  public static get <T>(injectable: new (...args: any[]) => T): T {
    let dependency = Provider.injected[getConstructorName(injectable)];
    if (dependency) {
      return dependency
    }
    console.error('No injectable of type ', injectable);
  }
  
  private canInject (args): boolean {
    return !args.length ? true : args.every(arg => Provider.injected[arg]);
  }
  
  private doInject (clazz, args, name) {
    let dependencies = args.map(arg => Provider.injected[arg]);
    //let a = new (Function.prototype.bind.apply(constructor, dependencies));
    //let a = constructor.apply(constructor, dependencies);
    //let a = new (constructor.apply(constructor, dependencies));
    
    // not quite right. calling the constructor twice
    //Provider.injected[name] = new (clazz.apply(clazz, dependencies));
    Provider.injected[name] = new (Function.bind.apply(clazz, dependencies));
    delete Provider.registered[name];
  }
  
}
