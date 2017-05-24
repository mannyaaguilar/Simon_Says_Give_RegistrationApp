myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', 'VolunteerService', 'UtilitesService', function($scope, $http, $location, UserService, VolunteerService, UtilitesService){
console.log("VolunteerController Loaded");

$scope.redirect = UserService.redirect;
$scope.volunteer = VolunteerService.volunteer;
$scope.preregisteredVolunteer = VolunteerService.preregisteredVolunteer;

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
  console.log("formatdob", $scope.volunteer.birthdate);
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

//sets date on datepicker to 8 years back for the convenience of user
$scope.minmaxDate = function() {
    this.myDate = new Date();
    this.maxDate = new Date(
    this.myDate.getFullYear() - 8,
    this.myDate.getMonth(),
    this.myDate.getDate()
  );
};

// $scope.volunteerData = function(){
// VolunteerService.volunteerToDB = angular.copy($scope.volunteer);
// console.log("INSIDE COPY volunteerToDB", VolunteerService.volunteerToDB );
// };

$scope.minmaxDate();
// $scope.volunteerData();
// VolunteerService.postNewVolunteer();
}]);//end VolunteerController
