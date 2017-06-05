myApp.controller('checkInOutController', ['$scope', '$location', '$http', 'VolunteerService', 'UserService',
                  function($scope, $location, $http, VolunteerService, UserService) {

  $scope.eventObject = UserService.eventObject;

  // when check in btn clicked, get for preregistered volunteers triggered and routes to volunteer view
  $scope.checkIn = function(){
    $location.path('/volunteer');
  };
  
  // when check out button is clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);
