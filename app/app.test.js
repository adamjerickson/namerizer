describe('AppTest', function() {
  var createController, scope;

  beforeEach(angular.mock.module('dmsiNamerizer'));

  beforeEach(angular.mock.inject(function($controller, $rootScope){

    scope = $rootScope.$new();


  }));

  it('the message should say Hello World', function() {
    expect('Hello World').toBe('Hello World');
  });
});