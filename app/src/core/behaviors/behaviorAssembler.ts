
export class BehaviorAssembler {
  private config: any;
  
  constructor (registeredBehavior: any) {
    this.config = registeredBehavior;
  }
  
  public as (injectAs: string): BehaviorAssembler {
    return this;
  }
  
  public assemble (configuration: any): BehaviorAssembler {
    this.config.config = configuration;
    return this;
  }
  
  public getConfig (): any {
    return this.config;
  }
}