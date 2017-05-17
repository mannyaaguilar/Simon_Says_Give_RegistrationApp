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

// $scope.birthDate = new Date();
//
//   // this.minDate = new Date(
//   //   this.birthDate.getFullYear(),
//   //   this.birthDate.getMonth() - 2,
//   //   this.birthDate.getDate()
//   // );
//   //
//   this.maxDate = new Date(
//     this.birthDate.getFullYear() - 8,
//     this.birthDate.getMonth() ,
//     this.birthDate.getDate()
//   );

//if under_18 = true, redirect to childWaiver, if false, redirect to adultWaiver
//
// $scope.volunteerCheckIn = function(volunteer){
//   console.log("volunteerCheckIn function accessed");
//   if(volunteer.under_18 === true){
//     console.log(volunteer.first_name);
//     $location.path('/waiver-youth');
//   } else if (volunteer.has_signed_waiver === true) {
//     $location.path('/waiver-photo');
//   } else {
//     $location.path('/waiver-adult');
//   }
// };
}]);
