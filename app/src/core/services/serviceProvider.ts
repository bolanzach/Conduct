import {getConstructorName} from "../metaDecorators";
import {Service} from "./service";

export class ServiceProvider {
  
  private static registered: any = {};  // Registered but not all dependencies resolved
  private static injected: any = {};    // Registered and all dependencies resolved
  
  /**
   *
   * @param serviceName
   * @param args
   * @param constructor
   */
  public inject (serviceName: string, args: Array<string>, constructor: any) {
    if (ServiceProvider.registered[serviceName]) {
      return;
    }
    
    if (this.canInject(args)) {
      this.doInject(constructor, args, serviceName);
      
      Object.keys(ServiceProvider.registered).forEach(registeredService => {
        let injectionParams = ServiceProvider.registered[registeredService];
        if (this.canInject(injectionParams.args)) {
          this.doInject(injectionParams.constructor, injectionParams.args, injectionParams.name);
        }
      });
    } else {
      ServiceProvider.registered[serviceName] = { constructor: constructor, name: serviceName, args: args };
    }
    
  }
  
  /**
   *
   * @param service
   * @returns {any}
   */
  public static get <T extends Service>(service: new (...args: any[]) => T): T {
    let dependency = ServiceProvider.injected[getConstructorName(service)];
    if (dependency) {
      return dependency
    }
    console.error('No service injected of type ', service);
  }
  
  private canInject (args): boolean {
    return !args.length ? true : args.every(arg => ServiceProvider.injected[arg]);
  }
  
  private doInject (clazz, args, name) {
    let dependencies = args.map(arg => ServiceProvider.injected[arg]);
    //let a = new (Function.prototype.bind.apply(constructor, dependencies));
    //let a = constructor.apply(constructor, dependencies);
    //let a = new (constructor.apply(constructor, dependencies));
    //ServiceProvider.injected[name] = new (clazz.apply(clazz, dependencies));
    ServiceProvider.injected[name] = new (Function.bind.apply(clazz, dependencies));
    delete ServiceProvider.registered[name];
  }

}
