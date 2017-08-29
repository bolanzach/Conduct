
import {UtilsService} from "../services/utilsService";
import {Component} from "../components/component";
import {ComponentAssembler} from "../components/componentAssembler";
export class ComponentManager {

  // The stages of Components. Before the game starts, every Component is
  // registered to the engine. When a new component is created and added to
  // another component, it is first inactive until all its dependencies have
  // been satisfied. Once all component dependencies are resolved, the
  // component is active an updatable by the engine.
  componentRegistrationMap;
  unactivatedComponentMap;
  componentsToUpdate;

  constructor () {
    this.componentRegistrationMap = {};
    this.unactivatedComponentMap = {};
    this.componentsToUpdate = {};
  }
  

  public register(component) {
    let registeredComponent;
    let componentDependencies = {};
    let name = this.getComponentName(component);
    let clazzConstructorArgs = /\(\s*([^)]+?)\s*\)/;
    let match = component.use.toString().match(clazzConstructorArgs);
    
    if (!name || this.componentRegistrationMap[name]) {
      return;
    }
  
    console.log('registering: ', name);
  
    (match && match[1].split(/,/) || []).forEach(function (arg) {
      componentDependencies[arg.replace(/ /g, '')] = true;
    });
    
    registeredComponent = new ComponentManager.ComponentAssembler(name, component.use, componentDependencies);
    this.componentRegistrationMap[name] = registeredComponent;
    return registeredComponent;
    
  }
  
  public add(assembler: ComponentAssembler<any>) : Component {
    return null;
  }

  
  
  private getComponentName(component: any) {
    let result = /^function\s+([\w\$]+)\s*\(/.exec(component.use.toString());
    return result ? result[1] : null;
  }
  
  
  private static ComponentAssembler = class {
    public name;
    public clazz;
    public dependencies;
    
    constructor (name: String, clazz: Function, dependencies: Object) {
      this.name = name;
      this.clazz = clazz;
      this.dependencies = dependencies;
    }
  }

  
}