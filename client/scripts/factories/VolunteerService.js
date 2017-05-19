myApp.factory('VolunteerService', ['$http', '$location', function($http, $location){
console.log("Volunteer Service loaded");

var volunteerToDB = {
    email: angular.copy(volunteer.email),
    first_name: angular.copy(volunteer.first_name),
    last_name: angular.copy(volunteer.last_name),
    // address1: angular.copy(volunteer.address1),
    // address2: 'angular.copy(volunteer.address2)',
    // city: 'angular.copy(volunteer.city)',
    // state: 'angular.copy(volunteer.state)',
    // zip: 'angular.copy(volunteer.zip)',
    under_18: angular.copy(volunteer.under_18),
    birthdate: angular.copy(volunteer.birtdateToDB),
    has_signed_waiver: false,
    has_allowed_photos: false,
    parent_email: '',
    // validation_required: angular.copy(volunteer.validation_required),
    // school: angular.copy(volunteer.school),
    // employer: angular.copy(volunteer.employer),
    // employer_match: angular.copy(volunteer.employer_match)
  };

  volunteerCheckIn = function(volunteer){
  console.log("volunteerCheckIn function accessed", volunteer);
  $http.post('/volunteer', volunteer).then(function(){
    if(volunteer.under_18 === true){
      console.log("General Waiver Needed- youth", volunteer.birthdate);
      $location.path('/waiver-youth');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === true) {
      console.log("Adult General Waiver & Photo Waiver on record");
      $location.path('/confirmation');
    } else if (volunteer.has_signed_waiver === true && volunteer.has_allowed_photos === false) {
      console.log("General Waiver on record, just need Photo Waiver");
      $location.path('/waiver-photo');
    } else if (volunteer.has_signed_waiver === false && volunteer.has_allowed_photos === true) {
      console.log("Photo Waiver on record, just need General Waiver");
      $location.path('/waiver-adult');
    } else {
      $location.path('/waiver-adult');
    }
  });
};//end volunteerCheckIn

clearVolunteerObject = function(){
  volunteer = {};
};

 return {
   volunteerToDB: volunteerToDB,
   volunteerCheckIn: volunteerCheckIn,
   clearVolunteerObject: clearVolunteerObject
 };

}]); //end of VolunteerService
