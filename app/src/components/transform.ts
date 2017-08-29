import {Engine} from '../kore/engine';
import {Component} from '../components/component';

export class Transform extends Component {
  
  private x: number;
  private y: number;
  private z: number;
  private r: number;
  private scale: number;
  
  constructor (config) {
    super();
    console.log('constructing transform');
  }
  
  public goTo(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  
  public rotate(rotation: number) {
    this.r = rotation;
  }
  
  public getScale(): number {
    return this.scale;
  }
  
  public setScale(scale: number) {
    this.scale = scale;
  }
  

  
}

Engine.registerComponent({
  use: Transform
});