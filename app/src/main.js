require(
  [
    'kore/engine',
    'kore/componentManager',
    'components/component',
    'components/transform',
    'components/worldComponent'
  ],
  function (idk) {
    console.log('main.js done');
    require(['game']);
  }
);
