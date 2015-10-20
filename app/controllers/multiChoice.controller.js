angular.module('dmsiNamerizer')
.controller('MultiChoiceController', ['$scope', '$state', '$timeout', 'MultiChoiceService', function($scope, $state, $timeout, MultiChoiceService) {

  $scope.multiChoice = {};
  var mc = $scope.multiChoice;

  mc.answerChosen = false;
  mc.answerStatus = '';
  mc.choices = [];
  mc.person = {};
  mc.waiting = false;

  mc.checkAnswer = function(answer) {
    if (answer.name === mc.person.name) {
      mc.answerChosen = true;
      mc.answerStatus = 'correct';
    } else {
      mc.answerChosen = true;
      mc.answerStatus = 'incorrect';
    }

    $timeout(function() {
      $state.go($state.current, {}, {reload: true});
    }, 1000);
  };

  mc.getChoices = function() {
    MultiChoiceService.getChoices()
      .then(
        function getChoicesSuccess(response) {
          mc.choices = response.data;
          mc.choices.push(mc.person);
          mc.choices = mc.shuffle(mc.choices);
        },
        function getChoicesError(response) {
          console.log(String(response));
        }
      );
  };

  mc.getPerson = function() {
    mc.waiting = true;
    MultiChoiceService.getPerson()
      .then(
        function successCallback(response) {
          // if they haven't been shown yet this session, then go ahead
          mc.person = response.data;
          mc.waiting = false;
          // if they have, get another try again

          // now go get the choices
          mc.getChoices();
        },
        function errorCallback(response) {
          // called asynchronously if an error occurs
          // or server returns response with an error status.
          console.log(String(response));
        }
      );
  };

  mc.shuffle = function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex ;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  mc.init = function() {
    mc.getPerson();
  };
  mc.init();

}]);