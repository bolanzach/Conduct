import {Conduct} from "../conductEngine";
import {UtilsService} from "../util/utilsService";
import {RegisterBehavior} from '../injection/metaDecorators';
import {ServiceProvider} from "../injection/provider/serviceProvider";

@RegisterBehavior()
export abstract class Behavior {
  
  private id: string;
  private active: boolean = false;
  
  protected static utilsService: UtilsService;
  
  constructor () {
    let result = /^function\s+([\w\$]+)\s*\(/.exec(this.constructor.toString());
    let behaviorType = result && result[1] || 'B';
    
    Behavior.utilsService = ServiceProvider.get(UtilsService);
    this.id = Behavior.utilsService.generateId(behaviorType);
    this.active = true;
  }
  
  public onAwake () {}
  
  public activate () {
    this.active = true;
  }
  
  public deactivate () {
    this.active = false;
    Conduct.Behaviors().deactivate(this.getId());
    this.getChildren().forEach((childBehavior) => childBehavior.deactivate());
  }
  
  public destroy () {
    Conduct.Behaviors().destroy(this.getId());
    this.getChildren().forEach((childBehavior) => childBehavior.destroy());
  }
  
  public addBehavior <T extends Behavior>(behavior: new (...args: any[]) => T): (props?: any) => void {
    return Conduct.Behaviors().attachBehaviorToBehavior(behavior, this.getId());
  }
  
  public getBehavior <T extends Behavior>(behavior: new (...args: any[]) => T): T {
    return Conduct.Behaviors().getBehavior(behavior, this.getId());
  }
  
  public getChildren (): Array<Behavior> {
    return Conduct.Behaviors().getChildren(this.getId());
  }
  
  public isActive (): boolean {
    return this.active;
  }
  
  public getId (): string {
    return this.id;
  }
  
  public getParent (): Behavior {
    return Conduct.Behaviors().getParent(this.getId());
  }
  
}
