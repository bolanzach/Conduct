require(
  [
    'core/engine',
    'core/injection/provider/serviceProvider',
    'core/injection/provider/behaviorProvider'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
