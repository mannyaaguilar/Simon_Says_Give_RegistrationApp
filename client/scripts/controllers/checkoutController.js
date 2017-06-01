myApp.controller('CheckoutController', ['$scope', '$location', '$http',
                'UtilitiesService', 'UserService',
                function($scope, $location, $http, UtilitiesService, UserService) {

$scope.formatTime = UtilitiesService.formatTime;
$scope.eventObject = UserService.eventObject;

//object for input volunteers to bind to
$scope.volunteerObject = {};

//variable to inform the ng-show on the search results div
$scope.success = false;

//Array to store search results. Array of objects
$scope.volunteerList = [];

//Array to store checkoutList volunteers by ID to checkout.
$scope.checkoutList = [];

//Functionality for checkboxes:
$scope.items = [];

$scope.toggle = function (item, list) {
  var idx = list.indexOf(item);
  if (idx > -1) {
    list.splice(idx, 1);
  }
  else {
    list.push(item);
  }
};

$scope.exists = function (item, list) {
  return list.indexOf(item) > -1;
};

$scope.isChecked = function() {
  return $scope.checkoutList.length === $scope.items.length;
};
//ends functionality for checkboxes

//Function run on click of Search button - take inputs and check for records
//in database, appends results to DOM
$scope.search = function(volunteer) {
  $scope.getVolunteers(volunteer);
  $scope.success = true;
};

//http post to server - takes response and sets it equal to volunteerList
$scope.getVolunteers = function(volunteer) {
  volunteer.eventID = $scope.eventObject.eventCode;
  $http.post('/checkout/', volunteer).then(function(response){
    $scope.volunteerList = response.data;
    });
};

//Checkout selected volunteers
$scope.checkout = function(checkoutList) {
  $scope.checkoutVolunteers(checkoutList);
  $scope.changeView();
};

//PUT Route that updates the checkout time of chosen volunteer record(s)
$scope.checkoutVolunteers = function(volunteers) {
  var timeToFormat = new Date();
  var checkoutTime = $scope.formatTime(timeToFormat);
  $http.put('/checkout/' + volunteers + '/' + checkoutTime).then(function(response){
    });
};

//changes view to confirmation page
$scope.changeView = function() {
  $location.path('/confirmed');
};

//changes view to checkInOut page
$scope.back = function() {
  $location.path('/checkInOut');
};

}]);
