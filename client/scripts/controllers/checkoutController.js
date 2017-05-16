myApp.controller('CheckoutController', ['$scope', '$location', function($scope, $location) {

//object for input items to bind to
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to assign search results to - has dummy info for now
$scope.volunteerList = [1,2,3,4,5];

//Connected to Search button - take inputs and check for records in database,
// append results to DOM
$scope.search = function() {
  console.log('volunteerObject: ', $scope.volunteerObject);
  //NEED TO ADD: GET to collect matching records by email and/or name
  $scope.success = true;
};

$scope.checkout = function() {
  //NEED TO ADD: PUT ROUTE to add checkout time to chosen volunteer hours record
  console.log('Logging checkout time on click: ', new Date());
  //changes view to confirmation page:
  $scope.changeView();
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
