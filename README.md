# Conduct Engine

### What is Conduct?

Conduct is a component based javascript framework for developing web browser based games.
It provides a structure for creating both single player and rich multiplayer
experiences using common web-based technologies. 

### Getting Started

To install the current version:
```
npm install conduct-engine
```
Create an entry point for your game and start the engine
```
import {Conduct} from "./core/conductEngine";
import {ConductConfig} from "./core/conductConfig";
import {Scene} from "./core/behaviors/scene";

let config: ConductConfig = new ConductConfig.Builder('2d').build();
Conduct.Init(config, function (scene: Scene) {
  // Engine started! Your game code goes here
});
```

### Conduct Engine Design Theory

Many modern game engines have some concept of a component system. 
The Unity Engine for example makes use of constructs such as GameObjects and MonoBehavior scripts
where the developer attaches one or more scripts to a GameObject to give that object behaviors in
the game world. This is reminiscent of the pure "Component Entity System" architectural pattern used
to build games. In this construct, Entities have absolutely no logic and act only as "buckets of 
Components". In some forms, Entities are not even represented as objects but rather as simply globally 
unique ids. Components then also contain no logic and are simply "buckets of data". Components may
attach and detach themselves from an entity, signifying that entity has a specific "behavior". For 
example, entity-123 may have two components: a Transform Component and Sprite component. Together,
entity-123 can be described as having a position in the world (Transform) and is visualized as an
image (Sprite). However, as mentioned, no logic lives inside these Components. It is up to the Systems
to provide all the logic. Systems act on a collection of Components, mutating their properties to drive
the state of the game. A MoveSystem that is supposed to move an object in game space may collect all
Components of type Transform on each frame update and adjust the Transform Component's x y z properties
by some delta like so:
```
// pusedo code of a Movement System
MovementSystem {
    update () {
        let transformComponents = getAllComponentsOfType(Transform);
        transformComponents.forEach(transform => {
            transform.x = transform.dx;
            transform.y = transform.dy;
            transform.z = transform.dz;
        }
    }
}
```
It's important to note that Systems may require more than one Component to operate. A complex RenderSystem
may need any number of Components in order to properly render an image on the screen. In this case, only
Entities that have _all_ the required attached Components would have their associated Components updated
by the System.

This architecture solves some keys pitfalls of typical OOP found in game design, namely the diamond of death. 
The problem occurs when you have a deep inheritance hierarchy and need to extend from another, unrelated
object. Suppose you are crafting a new object for your game, maybe just a simple House object. Intuition
says you should inherit from a base class such as Structure. All works well until your House becomes nefarious 
and needs to attack the player. You already have an Enemy inheritance tree but you can't extend from both
Structure and Enemy. The situation becomes even more complex when your House begins as an Enemy but through
some game event becomes a friendly ally to assist the player. Now what can the house use to get Friendly 
behavior without copying and pasting from other objects?

The Entity Component System solves this problem by allowing designers to attach Components to Game Objects without
bothering with a deep inheritance tree. In fact, developers can dynamically add or remove Components - and
thus behavioral logic, from Game Objects at run time! From the example above, one can rethink on how to make
the House. Remember, the House is a Game Object so it is just a container for Components. To describe a
House, the Game Object may have Components that describe the House's position, how it's rendered, and maybe 
the material it is made of. To make the House begin to attack the player, just add the Enemy Component. 
Want to make it friendly - remove Enemy and add the Friend Component. The Systems in the game will pick up these changes and 
run their game logic on the Components, dynamically describing the behavior of the House.

The Conduct Engine takes these principles and expands upon them, borrowing from compositional designs made 
popular by web frameworks that many frontend JavaScript developers are familiar with. The result is a powerful 
yet familiar and easy to use framework. 

At its core (and partially where the engine takes its name) is the concept of a Behavior. Everything in your
game world can be described as _being_ a Behavior and as _having_ Behavior(s). Each Behavior describes some
form of functionality or logic in your game and is meant to be reusable.

