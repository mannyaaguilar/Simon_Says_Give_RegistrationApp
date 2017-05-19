myApp.controller('CheckoutController', ['$scope', '$location', '$http', function($scope, $location, $http) {

//object for input items to bind to
//NEED TO UPDATE, BRING IN VOLUNTEER OBJECT FROM FACTORY
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to assign search results to - has dummy info for now
$scope.volunteerList = [1,2,3,4,5];

//Connected to Search button - take inputs and check for records in database,
// append results to DOM
$scope.search = function(volunteer) {
  $scope.getVolunteers(volunteer);
  $scope.success = true;
};

$scope.getVolunteers = function(volunteer) {
  console.log('volunteerObject in http: ', $scope.volunteerObject);
  console.log('logging volunteer in htpp function', volunteer);
  $http.post('/checkout', volunteer).then(function(response){
    console.log(response);
    });
};

$scope.checkout = function() {
  //NEED TO ADD: PUT ROUTE to add checkout time to chosen volunteer hours record
  console.log('Logging checkout time on click: ', new Date());
  $scope.checkoutVolunteers();
  //changes view to confirmation page:
  $scope.changeView();
};

//PUT Route that updates the checkout time of chosen volunteer record(s)
$scope.checkoutVolunteers = function() {
  $http.put('/checkout').then(function(response){
    console.log(response);
    });
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmation');
};

}]);
