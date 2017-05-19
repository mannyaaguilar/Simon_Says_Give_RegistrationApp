myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', 'VolunteerService', 'UtilitesService', function($scope, $http, $location, UserService, VolunteerService, UtilitesService){
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteerCheckIn = VolunteerService.volunteerCheckIn;
$scope.volunteer = VolunteerService.volunteer;

var birtdateToDB;

$scope.volunteer = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: true,
    birthdate: '',
    // birthdate: '3000-12-01',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

$scope.formatdob = function() {
  console.log("1 formatdob", $scope.volunteer.birthdate);
  if ( $scope.volunteer.birthdate) {
    birtdateToDB = UtilitesService.formatDate(angular.copy($scope.volunteer.birthdate));
    console.log('birthdate', birtdateToDB);
  }
  else {
    $scope.volunteer.birthdate = '1900-01-01';
    console.log("default birthdate", birtdateToDB);
  }
};


$scope.cancel = function(){
  $location.path('/checkInOut');
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
  birthdate: '3000-12-01'
};
$scope.minmaxDate = function() {
  this.myDate = new Date();
  // console.log(this.myDate);

  this.maxDate = new Date(
    this.myDate.getFullYear() - 8,
    this.myDate.getMonth(),
    this.myDate.getDate()
  );
  // console.log(this.maxDate);
};

$scope.volunteerData = function(){
VolunteerService.volunteerToDB.email = angular.copy($scope.volunteer.email);
VolunteerService.volunteerToDB.first_name = angular.copy($scope.volunteer.first_name);
VolunteerService.volunteerToDB.last_name = angular.copy($scope.volunteer.last_name);
VolunteerService.volunteerToDB.under_18 = angular.copy($scope.volunteer.under_18);
VolunteerService.volunteerToDB.birtdateToDB = angular.copy($scope.volunteer.birthdate);
};

$scope.minmaxDate();
$scope.volunteerData();
}]);//end VolunteerController
