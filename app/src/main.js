require(
  [
    'core/engine',
    'core/services/serviceProvider',
    'core/behaviors/behaviorProvider',
    'core/behaviors/sceneBehavior',
    'core/behaviors/transformBehavior',
    'core/services/utilsService'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
