Engine.$register.behavior('test2', function (param1) {
  return function $construct (test ) {
    console.log(test);
  };
});
