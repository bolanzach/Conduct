import {Conduct} from "../conductEngine";
import {UtilsService} from "../util/utilsService";
import {ServiceProvider} from "../injection/provider/serviceProvider";


export abstract class ConductBehavior {
  
  private id: string;
  private active: boolean = false;
  
  protected static utils: UtilsService;
  
  constructor (props: { parentId: string }) {
    if (!props || !props.parentId) {
      console.error(this, ' does was not given a parentId on props');
      return;
    }
    
    ConductBehavior.utils = ServiceProvider.get(UtilsService);
    this.id = ConductBehavior.utils.generateBehaviorId(this, props.parentId);
    this.active = true;
  }
  
  public onAwake () {}
  
  public activate () {
    this.active = !!this.id;
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
  
  public addBehavior <T extends ConductBehavior>(behavior: new (...args: any[]) => T): (props?: any) => void {
    return Conduct.Behaviors().attachBehaviorToBehavior(behavior, this.getId());
  }
  
  public getBehavior <T extends ConductBehavior>(behavior: new (...args: any[]) => T): T {
    return Conduct.Behaviors().getBehavior(behavior, this.getId());
  }
  
  public getChildren (): Array<ConductBehavior> {
    return Conduct.Behaviors().getChildren(this.getId());
  }
  
  public isActive (): boolean {
    return this.active;
  }
  
  public getId (): string {
    return this.id;
  }
  
  public getParent (): ConductBehavior {
    return Conduct.Behaviors().getParent(this.getId());
  }
  
}
