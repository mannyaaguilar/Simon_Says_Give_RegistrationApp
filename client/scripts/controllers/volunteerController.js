myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', function($scope, $http, $location, UserService) {
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
//need
$scope.volunteerCheckIn = function(){
   console.log('volunteerCheckIn accessed');
 };

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

}]);
