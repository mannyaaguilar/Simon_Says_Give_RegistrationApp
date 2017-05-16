myApp.controller('CheckoutController', ['$scope', '$location', function($scope, $location) {
  //inputs for name, email,
  //time stamp for clockout.... put to database

$scope.checkout = function() {
  // change view to checkInOut
  console.log('checkout function running');

  // put to database - update chosen volunteer(s) checkout time in database
  $scope.changeView();
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
