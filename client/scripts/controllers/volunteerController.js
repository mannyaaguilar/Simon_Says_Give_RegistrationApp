myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteerCheckIn = UserService.volunteerCheckIn;


var volunteer = {
  email: '',
  first_name: '',
  last_name: '',
  under_18: true,
  dob: ''
};


}]);
