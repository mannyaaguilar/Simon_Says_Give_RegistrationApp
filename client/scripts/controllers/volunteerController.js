myApp.controller('VolunteerController', ['$scope', '$http', '$location', 'UserService', 'VolunteerService', 'UtilitiesService', function($scope, $http, $location, UserService, VolunteerService, UtilitiesService){

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
    birtdateToDB = UtilitiesService.formatDate(angular.copy($scope.volunteer.birthdate));
  }
  else {
    $scope.volunteer.birthdate = '1900-01-01';
  }
};

$scope.cancel = function(){
  $location.path('/checkInOut');
};

}]);
