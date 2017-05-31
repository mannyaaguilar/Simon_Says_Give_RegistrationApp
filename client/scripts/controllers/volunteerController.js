myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', 'VolunteerService', 'UtilitesService', function($scope, $http, $location, UserService, VolunteerService, UtilitesService){

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
  if ( $scope.volunteer.birthdate) {
    birtdateToDB = UtilitesService.formatDate(angular.copy($scope.volunteer.birthdate));
  }
  else {
    $scope.volunteer.birthdate = '1900-01-01';
  }
};

$scope.cancel = function(){
  $location.path('/checkInOut');
};

$scope.minmaxDate = function() {
    this.myDate = new Date();
    this.maxDate = new Date(
    this.myDate.getFullYear(),
    this.myDate.getMonth(),
    this.myDate.getDate()
  );
};

$scope.minmaxDate();
}]);
