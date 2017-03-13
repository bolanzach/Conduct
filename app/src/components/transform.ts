import {Engine} from '../kore/engine';
import {Component} from '../components/component';

export class Transform extends Component {
  constructor (config) {
    super();
    console.log('constructing transform');
  }

  
}

Engine.registerComponent({
  use: Transform
});