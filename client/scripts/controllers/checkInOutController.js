myApp.controller('checkInOutController', ['$scope', '$location', function($scope, $location) {
  $scope.checkIn = function(){
  console.log("Check in button clicked");
  // $location.path('/volunteer');
  };
  $scope.checkOut = function(){
  console.log("Check out button clicked");
  // route to confirmation view
  // $location.path('/ ');
  };
}]);
