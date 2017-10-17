require(
  [
    'core/engine',
    'core/services/serviceProvider',

    'core/services/utilsService'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
