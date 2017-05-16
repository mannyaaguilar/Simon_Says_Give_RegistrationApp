myApp.controller('checkInOutController', ['$scope', '$location', function($scope, $location) {
  // when check in btn clicked, route to volunteer view
  $scope.checkIn = function(){
    $location.path('/volunteer');
  };
  // when check out btn clicked, route to confirmation view
  $scope.checkOut = function(){
    $location.path('/checkout');
  };
}]);
