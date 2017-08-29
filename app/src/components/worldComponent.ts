import {Engine} from '../kore/engine';
import {Component} from '../components/component';
import {Transform} from "./transform";

export class World extends Component {
  constructor (config) {
    super();
    console.log('constructing world');
    
    this.addComponent(Transform)({});
  }
  
  
  
  
}

Engine.registerComponent({
  use: World
});