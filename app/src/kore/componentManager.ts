
export class ComponentManager {
  
  registeredComponents = {};
  activeComponents = {};
  
  
  public register (component) {
    let name = this.getComponentName(component);
    let clazzConstructorArgs = /\(\s*([^)]+?)\s*\)/;
    let match = component.use.toString().match(clazzConstructorArgs);
    let componentDependencies = [];
    
    if (!name || this.registeredComponents[name]) {
      return;
    }
  
    console.log('registering: ', name);
  
    (match && match[1].split(/,/) || []).forEach(function (arg) {
      componentDependencies.push(arg.replace(/ /g, ''));
    });
    
    console.log(componentDependencies);
    
    
  
  }
  
  
  
  private getComponentName (component: any) {
    let result = /^function\s+([\w\$]+)\s*\(/.exec(component.use.toString());
    return result ? result[1] : null;
  }
  
}