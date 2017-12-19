import {BehaviorAssembler} from './behaviorAssembler';
import {RegisterBehavior} from '../metaDecorators';
import {UtilsService} from "../services/utilsService";
import {ServiceProvider} from "../services/serviceProvider";
import {Engine} from "../engine";

@RegisterBehavior()
export abstract class Behavior {
  
  private id: string;
  private active: boolean = false;
  
  private utilsService: UtilsService = ServiceProvider.get(UtilsService);
  
  constructor () {
    let result = /^function\s+([\w\$]+)\s*\(/.exec(this.constructor.toString());
    let behaviorType = result && result[1] || 'B';
    this.id = this.utilsService.generateId(behaviorType);
    this.active = true;
  }
  
  public abstract Update ();
  
  public Deactivate () {
    this.active = false;
  }
  
  public Destroy () {
  
  }
  
  public AddBehavior <T extends Behavior>(behavior: new (...args: any[]) => T): BehaviorAssembler {
    return Engine.attachBehaviorToBehavior(behavior, this.getId());
  }
  
  public GetBehavior <T extends Behavior>(behavior: new (...args: any[]) => T): new (...args: any[]) => T {
    return null;
  }
  
  public isActive (): boolean {
    return this.active;
  }
  
  public getId (): string {
    return this.id;
  }
  
}
