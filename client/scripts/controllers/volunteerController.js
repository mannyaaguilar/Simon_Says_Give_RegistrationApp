myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteerCheckIn = UserService.volunteerCheckIn;

//***
$scope.formatdob = function() {
  var volDOB = $scope.volunteer.birthdate;
  var numMonth = volDOB.getMonth();
  var monthString = numMonth.toString();
  if ( monthString.length === 1 ) {
    monthString = "0" + monthString;
  }
  var dateString = volDOB.toString();
  var dayString = dateString.slice(8, 10);
  var yearString = dateString.slice(11, 15);

  var superDate = yearString + " " + monthString + " " + dayString;
  $scope.volunteer.birthdate = superDate;
};
//***

// $scope.initial = {
//   dob: new Date()
// };
// var stringDate = toString()
// $scope.formatdob = function(initial){
// console.log(typeof(inital));
// console.log("Initial DOB: ", initial);
// var formattedDOB = $scope.initial.slice(0, 10);
// console.log(formattedDOB);
// };
$scope.volunteer = {
  email: '',
  first_name: '',
  last_name: '',
  under_18: true,
  birthdate: ''
};


}]);
