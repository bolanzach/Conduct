import {getConstructorName} from "../metaDecorators";
import {Service} from "../../service/service";
import {Conduct} from "../../conductEngine";
import {EventProvider} from "./eventProvider";
import {EventService} from "../../event/eventService";

export class ServiceProvider {
  
  private static registered: any = {};  // Registered but not all dependencies resolved
  private static injected: any = {};    // Registered and all dependencies resolved
  private static holding: any = [];
  
  /**
   *
   * @param serviceName
   * @param args
   * @param constructor
   */
  public inject (serviceName: string, args: Array<string>, constructor: any) {
    if (ServiceProvider.registered[serviceName] || ServiceProvider.injected[serviceName]) {
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
   * @returns {}
   */
  public static get <T extends Service>(service: new (...args: any[]) => T | Function): T {
    let dependency = ServiceProvider.injected[getConstructorName(service)];
    if (dependency) {
      return dependency
    }
    console.error('No service injected of type ', service);
  }
  
  /**
   * This isn't great but should work for now. Services get registered and constructed before the Conduct
   * starts up, causing all sorts of bugs. This holds the services until the Conduct releases them
   */
  public release () {
    if (!Conduct) {
      return;
    }
    
    ServiceProvider.holding.forEach(item => {
      this.doInject(item.clazz, item.args, item.name);
    });
    ServiceProvider.holding = [];
  }
  
  private canInject (args): boolean {
    return !args.length ? true : args.every(arg => ServiceProvider.injected[arg]);
  }
  
  private doInject (clazz, args, name) {
    if (!Conduct || !Conduct.isInitialized()) {
      ServiceProvider.holding.push({ clazz: clazz, args: args, name: name });
      return;
    }
    
    let dependencies = args.map(arg => ServiceProvider.injected[arg]);
    let service = new clazz(...dependencies);
    ServiceProvider.injected[name] = service;
    delete ServiceProvider.registered[name];
  
    EventProvider.getRegisteredEvents(name).forEach(providedEvent => {
      EventService.registerEvent(providedEvent.event, service, providedEvent.priority);
    });
  }

}
