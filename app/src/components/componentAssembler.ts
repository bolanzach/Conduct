import {Component} from "./component";

export class ComponentAssembler<T extends Component> {
  private component: any;
  private config: any;
  
  constructor(parent: String, componentClazz: new (...args: any[]) => T, config: any) {
    this.component = componentClazz;
    this.config = config;
    
    // Add this assembler to the Manager
    
    // fake code
    console.log('Created Assembler for ', parent, ' of type ', componentClazz, ' with config ', config);
    console.log('concrete component: ', new componentClazz(config));
  }
  
  public as(addComponentAs: T) {
  
  }
}