(function() {
	'use strict';

	// Declare app level module which depends on views, and components
	angular.module('dmsiNamerizer', [
	  'ngAnimate',
    'ui.router'

	]);

  angular.module('dmsiNamerizer')
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('nz', {
          url: '/nz',
          views: {
            'header': {
              templateUrl: 'partials/header.html',
            },
            'content': {
              templateUrl: 'views/default.html',
            },
            'footer': {
              templateUrl: 'partials/footer.html'
            }
          }
        })
        .state('nz.multiChoice', {
          url: '/mc',
          views: {
            'content@': {
              templateUrl: 'views/multiChoice.view.html',
              controller: 'MultiChoiceController'
            }
          }
        });

        //$urlRouterProvider.otherwise('/nz');


}]); // end config

}()); // end scope closure