myApp.factory('VolunteerService', ['$http', '$location', function($http, $location){
console.log("Volunteer Service loaded");

var volunteerToDB = {
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
    has_signed_waiver: false,
    has_allowed_photos: false,
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };

  volunteerCheckIn = function(volunteer){
  console.log("volunteerCheckIn function accessed", volunteer);
  $http.get('/volunteer')
  .then(function(response){
    if (response.data.first_name = volunteer.first_name && response.data.last_name = volunteer.last_name && response.data.email = volunteer.email)
    console.log("DATABASE MATCH");
    console.log("Response from Volunteer get", response );
  })
    .then(function(){
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
