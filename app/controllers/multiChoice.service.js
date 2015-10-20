angular.module("dmsiNamerizer")
.factory("MultiChoiceService", ['$http', '$log', function($http, $log) {

  var mcs = {};

  mcs.peopleGiven = [];
  mcs.choicesGiven = [];

  /**
   * Gets data from the Item List service and returns
   * a promise.
  */
  mcs.getPerson = function() {
    // get a random person from the directory
    return $http({
      method: 'GET',
      url: '/getPerson'
    });

  };

  mcs.getChoices = function() {
    // get three random names from the directory.
    return $http({
      method: 'GET',
      url: '/getChoices'
    });
  };


  return mcs;
}]);