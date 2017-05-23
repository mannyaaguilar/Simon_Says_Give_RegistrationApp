myApp.factory('VolunteerService', ['$http', '$location', function($http, $location){
console.log("Volunteer Service loaded");

// var volunteerToDB = {
//     email: '',
//     first_name: '',
//     last_name: '',
//     // address1: '',
//     // address2: '',
//     // city: '',
//     // state: '',
//     // zip: '',
//     under_18: true,
//     birthdate: '',
//     // birthdate: '3000-12-01',
//     has_signed_waiver: false,
//     has_allowed_photos: false,
//     parent_email: '',
//     // validation_required: false,
//     // school: '',
//     // employer: '',
//     // employer_match: false
//   };

  var preregisteredVolunteerObj = {
    email: '',
    first_name: '',
    last_name: '',
    // address1: '',
    // address2: '',
    // city: '',
    // state: '',
    // zip: '',
    under_18: '',
    birthdate: '',
    // birthdate: '3000-12-01',
    has_signed_waiver: '',
    has_allowed_photos: '',
    parent_email: '',
    // validation_required: false,
    // school: '',
    // employer: '',
    // employer_match: false
  };
  var newVolunteer = [];

  preregisteredVolunteer = function(volunteer){
      console.log("inside preregisteredVolunteer function", volunteer );
      $http.post('/volunteer/initial', volunteer)
      // $http.post('/volunteer')
      .then(function(response){
        console.log('RESPONSE: ', response.data[0]);
        console.log('RESPONSE: ', response.data[0].id);

        // volunteerToDB = angular.copy(response.data)
        // console.log('VOLUNTEERTODB', volunteerToDB);
        preregisteredVolunteerObj.email = response.data[0].email;
        preregisteredVolunteerObj.first_name = response.data[0].first_name;
        preregisteredVolunteerObj.last_name = response.data[0].last_name;
        preregisteredVolunteerObj.under_18 = response.data[0].under_18;
        preregisteredVolunteerObj.birthdate = response.data[0].birthdate;
        preregisteredVolunteerObj.has_signed_waiver = response.data[0].has_signed_waiver;
        preregisteredVolunteerObj.has_allowed_photos = response.data[0].has_allowed_photos;
        preregisteredVolunteerObj.parent_email = response.data[0].parent_email;

        if(response.data[0]){
          console.log("found");
          if(preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-youth');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_signed_waiver === false){
            $location.path('/waiver-adult');
          } else if
            (preregisteredVolunteerObj.under_18 === true && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else if
            (preregisteredVolunteerObj.under_18 === false && preregisteredVolunteerObj.has_allowed_photos === false){
            $location.path('/waiver-photo');
          } else {
            $location.path('/confirmation');
          }
        }
        console.log('PREREGISTERED VOLUNTEER: ', preregisteredVolunteerObj);
      });
      // return preregisteredVolunteerObj;
    };

  postNewVolunteer = function(newVolunteer){

  };

  clearVolunteerObject = function(){
    volunteer = {};
  };

 return {
   clearVolunteerObject: clearVolunteerObject,
   preregisteredVolunteer: preregisteredVolunteer,
   preregisteredVolunteerObj: preregisteredVolunteerObj,
   postNewVolunteer: postNewVolunteer
 };

}]); //end of VolunteerService
