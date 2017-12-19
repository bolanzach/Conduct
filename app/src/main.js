require(
  [
    'core/engine',
    'core/services/serviceProvider',
    'core/behaviors/behaviorProvider',
    'core/behaviors/scene',
    'core/behaviors/transform',
    'core/services/utilsService'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
