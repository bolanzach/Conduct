# Conduct Engine

#### What is Conduct?

Conduct is a component based javascript framework for developing browser based games.
It provides a structure for creating both single player and rich multiplayer
experiences using common web-based technologies. 

#### Getting Started

To install the current version:
```
npm install conduct-engine
```
Create a new `client.ts ` for the entry point of your game and start the engine
```
import {Conduct} from "./core/conductEngine";
import {ConductConfig} from "./core/conductConfig";
import {Scene} from "./core/behaviors/scene";

let config: ConductConfig = new ConductConfig.Builder('2d').build();
Conduct.Init(config, function (scene: Scene) {
  // Engine started! Your game code goes here
});
```

#### "White Paper"

Many modern day game engines have some concept of a component system. 
The Unity Engine for example makes use of constructs such as GameObjects and MonoBehavior scripts,
where the developer attaches one or more scripts to a GameObject to give that object behaviors in
the game world. This is reminiscent of the pure "component entity system" architectural pattern used
to build games. In this construct, entities have absolutely no logic and act only as "buckets of 
components". In some cases, entities are not even represented as objects but rather as simply unique
identifiers. Components then also contain no logic and are simply "buckets of data". Components may
attach and detach themselves from an entity, signifying that entity has a specific "behavior". For 
example, entity 123 may have two components: a transform component and sprite component. Together,
entity 123 can be described as having a position in the world (transform) and is visualized as an
image (sprite). However, as mentioned, no logic lives inside these components. 