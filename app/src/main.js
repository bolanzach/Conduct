require(
  [
    'core/engine',
    'core/injection/provider/serviceProvider',
    'core/injection/provider/behaviorProvider',
    'core/behaviors/scene',
    'core/behaviors/transform',
    'core/util/utilsService'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
