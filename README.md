# game-engine

#### What is Engine?

Engine is a component based javascript framework for creating games.
It provides a structure for building both single player and rich multiplayer
experiences using common web-based technologies. 

#### Getting Started

...coming soon

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