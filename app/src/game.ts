import {Engine} from "./kore/engine";

Engine.init({}, function () {
  
  let transform = Engine.Component.Transform({});
  console.log(transform);
  console.log('started game');
});
